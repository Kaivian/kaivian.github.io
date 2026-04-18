/**
 * @file useInfiniteSlider.ts
 * @description Hook managing continuous infinite scrolling using physical velocity and periodic background normalization.
 */

import { useState, useCallback, useRef } from 'react';
import { animate, MotionValue, AnimationPlaybackControls, wrap } from 'framer-motion';

export interface UseInfiniteSliderParams {
  dragX: MotionValue<number>;
  chunkWidth: number;
  slideOffset: number;
}

export function useInfiniteSlider({ dragX, chunkWidth, slideOffset }: UseInfiniteSliderParams) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    currentX: 0,
    isDown: false,
    hasDragged: false,
    controls: null as AnimationPlaybackControls | null,
    history: [] as { x: number; time: number }[],
  });

  /**
   * Silently resets the physical dragX back to the safe middle chunk
   * only when the system is at rest to prevent floating point drift over time.
   */
  const normalizeDrag = useCallback(() => {
    if (chunkWidth === 0) return;
    const current = dragX.get();
    // Wrap to safe Center Chunk among 5 batches ([-3cw, -2cw])
    const wrapped = wrap(-3 * chunkWidth, -2 * chunkWidth, current);
    if (current !== wrapped) {
      dragX.set(wrapped);
    }
  }, [dragX, chunkWidth]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    
    if (dragRef.current.controls) {
      dragRef.current.controls.stop();
    }
    
    // Normalize safely before a new interaction begins
    normalizeDrag();

    dragRef.current.isDown = true;
    dragRef.current.hasDragged = false;
    dragRef.current.startX = e.clientX;
    dragRef.current.currentX = dragX.get();
    dragRef.current.history = [{ x: e.clientX, time: performance.now() }];
  }, [dragX, normalizeDrag]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current.isDown) return;
    const deltaX = e.clientX - dragRef.current.startX;

    if (!dragRef.current.hasDragged && Math.abs(deltaX) > 5) {
      dragRef.current.hasDragged = true;
      setIsDragging(true);
    }

    dragX.set(dragRef.current.currentX + deltaX);

    const now = performance.now();
    dragRef.current.history.push({ x: e.clientX, time: now });
    if (dragRef.current.history.length > 5) {
      dragRef.current.history.shift();
    }
  }, [dragX]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current.isDown) return;
    dragRef.current.isDown = false;
    
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if element lost capture naturally
    }

    if (dragRef.current.hasDragged) {
      setTimeout(() => setIsDragging(false), 50);
    }

    let velocity = 0;
    const hist = dragRef.current.history;
    if (hist.length >= 2) {
      const first = hist[0];
      const last = hist[hist.length - 1];
      const dt = last.time - first.time;
      if (dt > 0) {
        velocity = (last.x - first.x) / (dt / 1000);
      }
    }

    if (Math.abs(velocity) > 50) {
      const startX = dragX.get();
      dragRef.current.controls = animate(dragX, startX + velocity * 0.3, {
        type: 'spring',
        velocity: velocity,
        damping: 30,
        stiffness: 100,
        restDelta: 0.1,
        onComplete: normalizeDrag, // Normalize once inertia ends
      });
    } else {
      normalizeDrag(); // Normalize immediately if released statically
    }
  }, [dragX, normalizeDrag]);

  const slideNext = useCallback(() => {
    if (dragRef.current.controls) dragRef.current.controls.stop();
    // Do NOT normalizeDrag() before animation — the visual wrapping via
    // useTransform(wrap()) already keeps the rendered position seamless.
    // Normalizing here caused an instant positional snap (the "jump" bug).
    const startX = dragX.get();
    
    dragRef.current.controls = animate(dragX, startX - slideOffset, { 
      type: "spring", 
      stiffness: 200, 
      damping: 30,
      onComplete: normalizeDrag, // Only normalize once animation settles
    });
  }, [dragX, slideOffset, normalizeDrag]);

  const slidePrev = useCallback(() => {
    if (dragRef.current.controls) dragRef.current.controls.stop();
    const startX = dragX.get();
    
    dragRef.current.controls = animate(dragX, startX + slideOffset, { 
      type: "spring", 
      stiffness: 200, 
      damping: 30,
      onComplete: normalizeDrag,
    });
  }, [dragX, slideOffset, normalizeDrag]);

  return {
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
    slideNext,
    slidePrev,
  };
}