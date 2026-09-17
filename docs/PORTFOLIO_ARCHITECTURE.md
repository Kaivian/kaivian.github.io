# Kaivian Portfolio Architecture & Performance Guide

This guide outlines the Next.js 15 App Router architecture, responsive design tokens, and SEO optimization practices powering kaivian.github.io.

---

## 1. Architectural Stack

- **Framework**: Next.js 15 with React 19 (Server Components + Client Island architecture).
- **Styling**: Tailwind CSS with custom responsive breakpoints and fluid typography.
- **Image Optimization**: Next/Image with AVIF/WebP auto-selection and dynamic blurred placeholders.

---

## 2. Core Web Vitals (CWV) Targets

| Metric | Target | Optimization Strategy |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | < 1.2s | Critical hero fonts preloaded via 
ext/font/google |
| **INP** (Interaction to Next Paint) | < 50ms | Lightweight client components; deferred script execution |
| **CLS** (Cumulative Layout Shift) | 0.00 | Strict aspect-ratio containers on all media |

---

## 3. Deployment Pipeline

Automated GitHub Actions workflow compiling static exports (
ext export) directly deployed to GitHub Pages with cache-control headers.
