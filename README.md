# V8 Anatomy — Step 1

Educational English-language V8 engine reference built with Vite + React + JavaScript/JSX.

## Stack decisions

- **Vite + React 18 + JSX only.** There are no `.ts`/`.tsx` files and no `tsconfig`.
- **ESLint** with React and React Hooks rules.
- **React Router 6.30.x** for route definitions.
- **MDX** through `@mdx-js/rollup`. MDX's Vite documentation recommends the Rollup integration and, when combined with the React Vite plugin, running MDX in the `pre` phase.
- **Tailwind CSS** for utility availability, with the technical visual system expressed in `src/styles.css`.
- **GSAP + ScrollTrigger + `@gsap/react`** is the only animation/scroll engine. `useGSAP()` scopes GSAP work and cleanup is performed through its context.
- **Head metadata:** `react-helmet-async` is the single head/meta solution.
- **Static prerendering:** `vite-react-ssg` is used with React Router 6. Its current documentation explicitly says it supports React Router v6 and recommends React Router v7's native SSG instead. Therefore this project intentionally pins Router 6 for the chosen SSG adapter. React 18 is used because the current vite-react-ssg package lists React 19 support as future/roadmap.
- **Cloudflare Pages:** deploy the generated `dist/` directory as a static site. No server, API key, backend, or runtime data source is required for Step 1.

## Folder structure

```text
v8-anatomy/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ BankAlternation.jsx
│  │  ├─ Badge.jsx
│  │  ├─ Button.jsx
│  │  ├─ Callout.jsx
│  │  ├─ Card.jsx
│  │  ├─ Quiz.jsx
│  │  ├─ Quote.jsx
│  │  ├─ SectionHeading.jsx
│  │  ├─ Seo.jsx
│  │  ├─ SourceList.jsx
│  │  ├─ SpecTable.jsx
│  │  └─ ThemeToggle.jsx
│  ├─ content/
│  │  ├─ registry.js
│  │  └─ cross-plane-vs-flat-plane.mdx
│  ├─ data/quizzes/
│  │  └─ cross-plane-vs-flat-plane.json
│  ├─ layouts/
│  │  ├─ BaseLayout.jsx
│  │  ├─ ComparisonLayout.jsx
│  │  └─ TopicLayout.jsx
│  ├─ pages/
│  │  ├─ CrossPlaneVsFlatPlane.jsx
│  │  ├─ Glossary.jsx
│  │  └─ NotFound.jsx
│  ├─ main.jsx
│  ├─ routes.js
│  └─ styles.css
├─ eslint.config.js
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## Install and run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run lint
npm run build
npm run preview
```

The SSG build writes route HTML under `dist/`. The `/cross-plane-vs-flat-plane` route is prerendered so its HTML contains the actual topic content rather than only an empty React root.

## How to add a topic page

1. Add `src/content/<slug>.mdx`.
2. Keep the MDX content source focused on educational content and sources.
3. For a normal topic, use `TopicLayout` and add a route in `src/routes.js`.
4. For a comparison requiring a specialized interactive layout, create a small page component and lazy-load heavy interactive components.
5. The content registry uses `import.meta.glob('./**/*.mdx', { eager: true })`, so the content folder does not require a manually maintained import list.

## How to add a quiz

Add a JSON file under `src/data/quizzes/`:

```json
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": 0,
    "explanation": "Why A is correct."
  }
]
```

Import it into the page and render `<Quiz questions={quizData} />`.

## Prerendering and Cloudflare Pages

`vite-react-ssg build` renders the declared React Router routes to static HTML at build time. This is important for SEO and link previews because crawlers and social preview fetchers receive meaningful HTML, title and description metadata without waiting for client-side rendering.

Cloudflare Pages can deploy the static output directly:

- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are required for Step 1.

## Theme / reduced motion

The theme is selected by an inline script in `index.html` before React loads to avoid a dark/light flash. The preference is stored in `localStorage`. The CSS also respects `prefers-reduced-motion: reduce`; the GSAP diagram returns to a static state in that mode.

## Technical content rules implemented

- Cross-plane crank pins: 90°.
- Flat-plane crank pins: 180°.
- Both: one firing event every 90° over a 720° four-stroke cycle.
- Cross-plane bank alternation is computed from the supplied firing order and bank map.
- Chevrolet Gen I small-block example: `1-8-4-3-6-5-7-2`, with Chevrolet numbering explicitly stated.
- Ferrari F136 firing order is not invented; the page keeps a visible source-needed marker and uses an explicitly labelled placeholder alternating dataset.
- Sound discussion includes exhaust manifold geometry as an independent factor.
- Flat-plane vibration is described as a second-order vibration consideration, without claiming a universal balancing solution.
- The quiz's high-rev answer is lighter crankshaft / lower rotational inertia, not firing regularity.

## Open [SOURCE NEEDED] / [VERIFY] markers

1. `[SOURCE NEEDED: F136 firing order + cylinder numbering]`
2. `[Heywood, Internal Combustion Engine Fundamentals: add edition/page]`
3. `[Chevrolet Small-Block service documentation: add exact document/year/page]`
4. `[Ferrari F136 technical source: add exact document/page for crank and firing-order data]`
5. `[Vizard, How to Build Max-Performance Chevy Small-Blocks: add edition/page]`
6. `[SOURCE NEEDED: replace this registry stub with the final MDX-driven topic body when the broader topic system is enabled.]`
7. `[VERIFY] Any model-specific claim should be checked against an engine-specific technical source.`
8. `[add source]` markers in Further Reading.
