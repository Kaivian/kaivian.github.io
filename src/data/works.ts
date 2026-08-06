import { WorkItem } from "@/types/work";

export const works: WorkItem[] = [
  {
    exhibit: "EXHIBIT A",
    category: "AI TALENT INTELLIGENCE PLATFORM",
    title: "CVerify",
    headline: "Proof over promises.",
    subtitle:
      "AI-native talent intelligence that verifies engineers through real engineering evidence.",
    url: "https://cverify.io.vn",
    displayUrl: "CVERIFY.IO",
    description:
      "Instead of relying on resumes and keyword matching, CVerify analyzes repositories, contributions, technical artifacts, and development history to build trustworthy engineering profiles powered by AI.",
    articleText1:
      "For decades, hiring software engineers has depended on resumes, interviews, and self-reported experience.\n\nCVerify introduces a different approach: evidence-first verification. Every profile is built from actual engineering activity—including repositories, commits, pull requests, technical documents, and AI-assisted analysis—creating a transparent picture of engineering capability.",
    articleText2:
      "Organizations gain access to structured technical insights instead of keyword-heavy resumes.\n\nThe platform automatically evaluates programming expertise, project complexity, architecture decisions, collaboration patterns, and engineering maturity, allowing recruiters to identify qualified candidates with greater confidence while reducing manual screening effort.",
    quote:
      "“Real engineering leaves evidence. CVerify transforms that evidence into trusted hiring intelligence.”",
    figCaption: "Fig. 1 — Candidate intelligence dashboard generated from verified engineering evidence.",
    tags: ["Next.js", "Python", "ASP.NET Core", "PostgreSQL", "FastAPI"],
    timeline: "2026 — PRESENT",
    role: "BY THE CVERIFY RESEARCH DESK",
    isFlagship: true,
    previewType: "cverify",
    sidebarTitle: "HOW IT WORKS",
    sidebarItems: [
      { label: "PLATFORM", value: "AI Talent Intelligence" },
      { label: "ANALYSIS", value: "Repositories • Commits • CV • Projects" },
      { label: "AI ENGINE", value: "Evidence Extraction + LLM Analysis" },
      { label: "SEARCH", value: "Semantic Candidate Discovery" },
      { label: "OUTPUT", value: "Trust Score • Skill Graph • AI Insights" },
      { label: "STATUS", value: "Production" },
    ],
    customRelatedExhibits: [
      { code: "EXHIBIT B", label: "AI Candidate Discovery" },
      { code: "EXHIBIT C", label: "Repository Intelligence" },
      { code: "EXHIBIT D", label: "Trust Score Engine" },
    ],
    ctaLeftText: "← BACK TO THE ARCHIVE",
    ctaRightText: "EXPLORE CVERIFY →",
    techDetails: {
      frontend: "Next.js · Tailwind",
      data: "PostgreSQL · FastAPI",
      hosting: "Vercel",
      role: "Lead Architect & Engineer",
      entered: "2026 — PRESENT",
      status: "In production",
    },
    relatedExhibits: ["EXHIBIT B", "EXHIBIT C"],
  },
  {
    exhibit: "EXHIBIT B",
    category: "MINECRAFT PLUGIN · GUI",
    title: "KWardrobe",
    headline: "High-concurrency armor orchestration in block space",
    subtitle:
      "A custom Spigot server plugin providing real-time GUI wardrobe management for high-load Minecraft multiplayer servers.",
    url: "https://github.com/Kaivian/KWardrobe",
    displayUrl: "github.com/Kaivian/KWardrobe",
    description:
      "High-concurrency Minecraft server plugin providing players with a graphical user interface (GUI) to store, organize, and seamlessly switch armor sets in real-time.",
    articleText1:
      "Field agents reported persistent latency issues in player armor switching across high-load game servers. Traditional inventory commands required tedious manual swaps, causing packet delays during competitive gameplay.",
    articleText2:
      "KWardrobe resolved the case by implementing an asynchronous NMS data layer, allowing instantaneous cosmetic and tactical gear swaps with zero server tick drops.",
    quote:
      "“Thousands of inventory transactions per minute without dropping a single server tick. The evidence speaks for itself.”",
    figCaption: "Fig. 2 — GUI inventory state machine running under stress test load.",
    tags: ["Java", "Spigot API", "NMS", "Bukkit"],
    timeline: "Jul 2025",
    role: "Core Developer",
    previewType: "kwardrobe",
    techDetails: {
      frontend: "Java · Spigot GUI API",
      data: "NMS & Bukkit Serialization",
      hosting: "Paper Spigot Server",
      role: "Core Developer",
      entered: "Jul 2025",
      status: "Released",
    },
    relatedExhibits: ["EXHIBIT C", "EXHIBIT D"],
  },
  {
    exhibit: "EXHIBIT C",
    category: "MINECRAFT UTILITIES",
    title: "KLibrary",
    headline: "Thread-safe event utility & foundation framework",
    subtitle:
      "A lightweight, thread-safe core utility library designed to simplify event registration, custom config parsing, and concurrency handling.",
    url: "https://github.com/Kaivian/KLibrary",
    displayUrl: "github.com/Kaivian/KLibrary",
    description:
      "A lightweight, thread-safe core utility library designed to simplify event registration, custom config parsing, and concurrency handling across Minecraft server plugins.",
    articleText1:
      "Architectural redundancy was discovered across multiple plugin deployments. Every new exhibit required duplicating boilerplate handlers, config parsing routines, and thread synchronization primitives.",
    articleText2:
      "KLibrary consolidated these core utilities into a unified, thread-safe framework package. Plugin developers can now register events and manage concurrency with minimal overhead.",
    quote:
      "“Eliminating boilerplate allowed us to focus entirely on domain logic and server responsiveness.”",
    figCaption: "Fig. 3 — Event bus dispatch system inspected under concurrent load.",
    tags: ["Java", "Gradle", "Spigot", "Concurrency"],
    timeline: "May 2026",
    role: "Author",
    previewType: "klibrary",
    techDetails: {
      frontend: "Java 17 · Gradle",
      data: "Concurrent Collections",
      hosting: "GitHub Packages",
      role: "Author",
      entered: "May 2026",
      status: "Stable Release",
    },
    relatedExhibits: ["EXHIBIT B", "EXHIBIT F"],
  },
  {
    exhibit: "EXHIBIT D",
    category: "SPATIAL DISCOVERY",
    title: "ExploreWorld",
    headline: "Spatial discovery & contextual map intelligence",
    subtitle:
      "An interactive web application connecting spatial geographic coordinates with rich contextual metadata.",
    url: "https://github.com/Kaivian/ExploreWorld",
    displayUrl: "github.com/Kaivian/ExploreWorld",
    description:
      "Interactive web application centered on geographic discovery and spatial data visualization, connecting geographic coordinates with rich contextual metadata.",
    articleText1:
      "Geographic coordinate data remains inert without contextual storytelling. Desk analysts requested a visual tool capable of rendering complex spatial nodes into intuitive geographical maps.",
    articleText2:
      "ExploreWorld links raw latitude/longitude points to dynamic contextual cards, delivering responsive map interactions and geospatial queries.",
    quote:
      "“Transforming raw geographic coordinates into immersive spatial discovery maps.”",
    figCaption: "Fig. 4 — Coordinate plotting grid with live contextual telemetry.",
    tags: ["JavaScript", "React", "Node.js", "Express"],
    timeline: "Jul 2025",
    role: "Fullstack Developer",
    previewType: "exploreworld",
    techDetails: {
      frontend: "React · JavaScript",
      data: "Express.js · GeoJSON",
      hosting: "Node.js Server",
      role: "Fullstack Developer",
      entered: "Jul 2025",
      status: "Deployed",
    },
    relatedExhibits: ["EXHIBIT E", "EXHIBIT G"],
  },
  {
    exhibit: "EXHIBIT E",
    category: "FULLSTACK ARCHITECTURE",
    title: "MERN-Tutorial",
    headline: "Fullstack authentication & database architecture",
    subtitle:
      "An end-to-end full stack architecture demonstrating JWT authentication, state management, RESTful APIs, and MongoDB database integration.",
    url: "https://github.com/Kaivian/MERN-Tutorial",
    displayUrl: "github.com/Kaivian/MERN-Tutorial",
    description:
      "End-to-end full stack web architecture demonstrating JWT authentication, state management, RESTful APIs, and MongoDB database integration.",
    articleText1:
      "To establish standard operational security across web applications, this exhibit presents a complete fullstack blueprint covering state management and API design.",
    articleText2:
      "Featuring secure JWT token exchange, password hashing, and optimized MongoDB query patterns, MERN-Tutorial serves as an architectural baseline for modern web applications.",
    quote:
      "“Security and clean state management built into every API endpoint from day one.”",
    figCaption: "Fig. 5 — REST API telemetry log and JWT verification sequence.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    timeline: "Oct 2025",
    role: "Creator",
    previewType: "mern",
    techDetails: {
      frontend: "React · Tailwind",
      data: "MongoDB · Express.js",
      hosting: "Vercel / Render",
      role: "Creator",
      entered: "Oct 2025",
      status: "Reference Blueprint",
    },
    relatedExhibits: ["EXHIBIT F", "EXHIBIT D"],
  },
  {
    exhibit: "EXHIBIT F",
    category: "SYSTEM BOILERPLATE",
    title: "Kaivian-Template",
    headline: "Production-ready developer boilerplate engine",
    subtitle:
      "A high-performance full stack web starter template crafted for rapid application development with pre-configured UI tokens.",
    url: "https://github.com/Kaivian/Kaivian-Template",
    displayUrl: "github.com/Kaivian/Kaivian-Template",
    description:
      "Production-ready full stack web starter template crafted for high-performance application development, complete with pre-configured tooling and UI tokens.",
    articleText1:
      "Project setup phase can consume up to 30% of initial sprint time. To streamline future operations, this exhibit unifies best-in-class Next.js patterns into a single command starter.",
    articleText2:
      "Pre-loaded with Tailwind design tokens, standard linting rules, and strict TypeScript configurations, Kaivian-Template enables instant prototyping without compromising code quality.",
    quote:
      "“Zero-config startup with production-grade architectural defaults.”",
    figCaption: "Fig. 6 — Project directory tree and modular token hierarchy.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Fullstack"],
    timeline: "Sep 2025",
    role: "Author",
    previewType: "template",
    techDetails: {
      frontend: "Next.js · Tailwind CSS",
      data: "TypeScript Schemas",
      hosting: "Vercel Starter",
      role: "Author",
      entered: "Sep 2025",
      status: "Active Template",
    },
    relatedExhibits: ["EXHIBIT A", "EXHIBIT G"],
  },
  {
    exhibit: "EXHIBIT G",
    category: "DIGITAL ARCHIVE",
    title: "kaivian.github.io",
    headline: "The investigative editorial portfolio experience",
    subtitle:
      "A vintage newspaper portfolio inspired by investigative journalism, featuring server components, smooth animations, and custom layout systems.",
    url: "https://github.com/Kaivian/kaivian.github.io",
    displayUrl: "github.com/Kaivian/kaivian.github.io",
    description:
      "Vintage editorial newspaper portfolio inspired by investigative journalism, featuring server components, smooth animations, and custom aesthetic layout systems.",
    articleText1:
      "In an era of generic portfolio websites, this desk commissioned an investigative edition designed around the aesthetic of 20th-century print journalism.",
    articleText2:
      "Combining vintage typography, paper clip effects, and detailed exhibit case files, kaivian.github.io turns personal projects into an engaging forensic dossier.",
    quote:
      "“Crafting digital experiences that tell a story down to the finest detail.”",
    figCaption: "Fig. 7 — Front page masthead and exhibit card gallery.",
    tags: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript"],
    timeline: "Jul 2025 — Present",
    role: "Designer & Engineer",
    previewType: "portfolio",
    techDetails: {
      frontend: "Next.js 15 · Tailwind CSS",
      data: "Framer Motion",
      hosting: "GitHub Pages",
      role: "Designer & Engineer",
      entered: "Jul 2025 — ongoing",
      status: "In production",
    },
    relatedExhibits: ["EXHIBIT A", "EXHIBIT F"],
  },
];
