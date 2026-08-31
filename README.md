# Interview Study Guide

A static study guide for Technical Lead & AI Engineer interviews, covering 267 topics. No build step, no dependencies — just serve the folder.

Each topic is broken down into:
- 🧠 Technical answer
- 💡 In layman's terms
- 🛠 Practical use cases
- 🎯 Follow-up interview checks
- ⚠ Red flags
- 📌 One-line memory aid

## Difficulty and colour

Every topic carries a `difficulty` of **Low** (recall/definition), **Medium**
(mechanics or comparison), **High** (production design and judgement) or
**Complex** (multi-system trade-offs under ambiguity). Filter by level from
the toolbar, or click a level on the dashboard to drill straight into it.
Each badge shows its label as text, so the level never depends on colour
alone; all eight badge colours clear WCAG AA contrast in both themes.

The 43 categories are coloured by **domain family** (Cloud & Infrastructure,
Architecture & Platform, AI & LLM, Agents & MCP, Security & Governance,
Leadership & Business, Reliability & Ops, Data, RAG & Retrieval) rather than
one hue each — 41 hues are not visually distinguishable, 9 are, and the
colour then carries meaning. Tiles remain sorted alphabetically.

## Files

```
index.html        Page shell — topbar, dashboard, and browse-view markup
assets/styles.css Styling (light/dark theme, aurora backdrop, tiles, print)
assets/app.js     Dashboard + browse views, rendering, search/filter, quiz
                  mode, flashcard drills, command palette (Cmd/Ctrl+K),
                  progress rings + streak tracking
data/topics.json  The 267 topics as plain JSON (incl. per-topic difficulty)
```

Data, styling, and behavior are split into separate files so each can be
edited and diffed independently — e.g. adding a topic only touches
`data/topics.json`.

## View locally

The page fetches `data/topics.json`, which browsers block over `file://`,
so serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. (On GitHub Pages it just works.)

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — the site will be published at `https://<username>.github.io/<repo>/`.
