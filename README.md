# CV Maker

A live, installable **PWA** for building a polished CV/résumé — entirely in the browser. No backend, no accounts; your data stays in `localStorage`.

**Live:** https://jezisvedtojemojzis.github.io/cv-maker/

## Features

- **Live split-screen editor** with instant A4 preview
- **7 templates** — Modern, Classic, Compact, Elegant, Banner, Timeline, Minimal
- **Colors** — basic presets + full custom color picker
- **Fonts** — Inter, Poppins, Lora, Merriweather, JetBrains Mono
- **Sections** — photo, experience, education, skills, projects, certifications, volunteering, publications, languages, awards, interests
- **Download PDF** via the browser's print-to-PDF (vector, selectable text)
- **Export / Import** your data as JSON
- **Installable & offline** — works as a PWA after first load

## Develop

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # static output in dist/
```

Icons are generated from `scripts/gen-icons.mjs` (`node scripts/gen-icons.mjs`).

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages. The Vite `base` is `/cv-maker/` for the production build.
