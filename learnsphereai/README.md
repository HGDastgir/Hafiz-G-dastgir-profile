# LearnSphere AI

An AI-powered study platform: an AI tutor, 15 study tools (summarizer, quiz generator, essay helper, etc.), an AI-generated quiz, a progress dashboard, and a live-chat assistant. The frontend is a single static `index.html` (Tailwind pre-compiled inline, no build step required) plus one serverless function that proxies requests to the Anthropic API.

## Project structure

```
index.html        Entire site — markup, compiled Tailwind CSS, and app JS
api/chat.js        Serverless function — the only place the Anthropic API key is used
styles.css         Output of `npm run build:css` (optional — index.html already ships with
                    compiled CSS inlined in a <style> tag, so this file isn't loaded by
                    the page). Regenerate it only if you add new Tailwind classes to
                    index.html and want a standalone stylesheet.
tailwind-input.css Tailwind entry file used by the build:css script
tailwind.config.js Tailwind theme (brand colors, fonts, animations)
lucide.min.js      Icon library — unused at runtime (the same bundle is inlined directly
                    in index.html); kept only as a reference copy
robots.txt / sitemap.xml   SEO files — update the domain before going live
```

## Deploying (Vercel)

The AI features (tutor, study tools, quiz generation, live chat) call `/api/chat`, which is a Vercel serverless function. Without deploying it, those features show a friendly "couldn't reach the AI" message — everything else on the page works fine as static HTML.

1. Import the GitHub repo in [Vercel](https://vercel.com/new) (or run `vercel` from this directory with the Vercel CLI). No build command is needed — Vercel serves `index.html` as-is and auto-detects `api/chat.js` as a serverless function. **If this project lives in a subfolder of the repo** (e.g. `learnsphereai/`), set **Root Directory** to that folder in the Vercel import screen.
2. In the Vercel project, go to **Settings → Environment Variables** and add:
   - `ANTHROPIC_API_KEY` — your key from the [Anthropic Console](https://console.anthropic.com/settings/keys)
3. Redeploy. The AI tutor, study tools, quiz generator, and live chat will now work end to end.
4. (Optional) To let the tutor use live web search, enable **Web search** for your organization in the Anthropic Console under Settings. If it isn't enabled, `api/chat.js` automatically retries without the search tool, so the site keeps working either way.

### Local development

There's no bundler, so any static file server works for the frontend:

```
npx serve .
```

The AI endpoints won't respond locally unless you also run the function — use the Vercel CLI for a full local stack:

```
npm i -g vercel
vercel dev
```

Set `ANTHROPIC_API_KEY` in a local `.env` file (or `vercel env pull`) before running `vercel dev`.

## Editing styles

All Tailwind utility classes actually used by the page are already compiled into the `<style id="tw-compiled">` block in `index.html`'s `<head>` — that's what the browser reads, so no build step runs at deploy time. If you add a new Tailwind class to the markup that isn't in that block yet, regenerate it:

```
npm install
npm run build:css
```

Then copy the contents of the generated `styles.css` into the `<style id="tw-compiled">` block in `index.html` (or switch the page to `<link rel="stylesheet" href="styles.css">` instead of inlining, if you'd rather serve it as a separate file).

## Notes

- `robots.txt` and `sitemap.xml` reference `www.learnsphere.ai` — update these to your real domain before launch.
- User accounts, notes, and theme/language preference are stored in `localStorage` only — there's no backend database. Wire up real auth/storage if you need accounts to persist across devices.
