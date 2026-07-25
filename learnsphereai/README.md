# LearnSphere AI

A modern, fully static study-platform website: web search hub, 15 study-tool
search shortcuts, offline quiz with a built-in question bank, student
dashboard, dark/light theme, and 12-language UI with RTL support.

**No API keys, no backend, no build step required.** Every feature runs
entirely in the browser:

- **Web Search** — pick an engine (Google, Bing, DuckDuckGo, YouTube,
  Wikipedia, Google Scholar), type a question, and results open in a new tab.
  Recent searches are remembered locally.
- **Study Tools** — 15 one-click shortcuts (Homework Solver, Notes Generator,
  Math Solver, Translator, …) that open a ready-made web search for the task.
- **Quiz** — multiple-choice quizzes served from a built-in question bank
  covering 8 subjects, with an optional per-question timer, score ring, and
  answer review.
- **Dashboard** — study streak, weekly performance chart, learning goals, and
  saved notes (stored in `localStorage`).
- **Theme & language** — dark/light toggle plus 12 UI languages including
  right-to-left layout for Urdu and Arabic.

## Project structure

```
index.html         Entire site — markup, compiled Tailwind CSS, and app JS
styles.css         Output of `npm run build:css` (optional — index.html already ships with
                    compiled CSS inlined in a <style> tag, so this file isn't loaded by
                    the page). Regenerate it only if you add new Tailwind classes.
tailwind-input.css Tailwind entry file used by the build:css script
tailwind.config.js Tailwind theme (brand colors, fonts, animations)
lucide.min.js      Icon library — unused at runtime (the same bundle is inlined directly
                    in index.html); kept only as a reference copy
robots.txt / sitemap.xml   SEO files — update the domain before going live
```

## Deploying

The site is 100% static, so any static host works:

- **Vercel / Netlify** — import the repo; if this project lives in a subfolder
  (e.g. `learnsphereai/`), set the **Root Directory** to that folder. No build
  command, no environment variables.
- **GitHub Pages** — Settings → Pages → serve from the branch/folder.
- **Anything else** — copy `index.html` to the server.

## Local development

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

To re-compile the Tailwind CSS after editing classes:

```bash
npm install
npm run build:css
```
