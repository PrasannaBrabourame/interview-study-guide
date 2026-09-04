# Learning Guide

A static learning guide for Technical Lead & AI Engineer topics, covering 267 topics. No build step, no dependencies, no external requests — just serve the folder.

Each topic is broken down into:
- 🧠 Technical answer
- 💡 In layman's terms
- 🛠 Practical use cases
- 🎯 Follow-up checks
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
assets/fonts/     Self-hosted Inter and Newsreader subsets (woff2, 352 KB)
cloud.html        Cloud lab — request journey, OSI, landing zone (VPC tiers,
                  proxies, private link, CIDR, security groups and policy
                  evaluation), VPC design (how many, public vs private,
                  subnet sizing, component advice), network simulator, NGINX,
                  IAM, SAP-C02 cheatsheet, pillars, DR simulator, translator
agentcore.html    AgentCore lab — running agents in production: runtime,
                  identity, gateway, memory, evaluation, multi-agent patterns
agentbuild.html   Agents-building-agents lab — spec-driven development with a
                  coding agent, the ADK loop, and the Managed Agents API
adk.html          ADK lab — agents, tools and tool schemas, session state,
                  callbacks and plugins, orchestration and delegation,
                  grounding and MCP, the Agent Sandbox, skills, deployment
evals.html        Evaluation lab — why testing breaks on generative systems,
                  metrics and autoraters, rubrics, trajectories and golden
                  paths, offline vs online, the managed platform, ADK
                  build-time evals, hill climbing, unit economics, upgrades
gemini.html       Gemini Enterprise lab — architecture and provisioning, the
                  identity decision, Workforce Identity Federation, networking,
                  data stores and connectors, agents, Model Armor, search
                  quality and tuning, governance, change management
govern.html       Govern & secure lab — the agent gateway on both sides, the
                  policy chain, private egress, agent identity, delegated
                  access, the threat landscape, boundaries and controls,
                  perimeters, the registry, tracing and audit
gpu.html          GPU lab — the layer everything else sits on: why a GPU is
                  shaped differently from a CPU, threads/warps/SMs and warp
                  divergence, the five-rung memory ladder, the roofline model
                  and arithmetic intensity, coalescing, tiling, tensor cores
                  and number formats, operator fusion and FlashAttention,
                  and Triton vs torch.compile (with graph breaks)
llm.html          LLM internals lab — the generation loop, tokenisation and
                  BPE, embeddings and position, attention (Q/K/V, heads,
                  the attention sink), the transformer block and what breaks
                  without residuals, sampling, the KV cache and its
                  arithmetic, quantisation (GPTQ/AWQ/naive), continuous
                  batching and paged attention
serving.html      LLM serving lab — what an inference engine does that a model
                  does not: prefill vs decode, iteration-level scheduling and
                  preemption, prefix caching, speculative decoding, CUDA
                  graphs, multi-LoRA, prefill/decode disaggregation, and
                  TTFT/TPOT/tail-latency SLOs
fleet.html        Fleet lab — the orchestration layer above one engine:
                  discovery and readiness, KV-aware routing, moving KV state
                  versus recomputing it, sizing disaggregated prefill and
                  decode pools, planner control loops and why they oscillate,
                  what a worker dying does to an in-flight stream, and
                  capacity acceptance
peakweek.html     Peak Week lab — a sorter fails at a parcel hub on the
                  busiest night of the year, and one agent is carried through
                  the whole life of a system: groundwork, make it work (tools,
                  docstrings, route search), make it survive (sessions, Memory
                  Bank, sandbox, the smoke test that saves the deploy), make it
                  safe (Model Armor, least privilege), make it good (graded
                  eval, LLM-as-judge), make it theirs (publishing, and the
                  session-id bug that only shows up there)
design.html       Diagram lab — audiences, levels of zoom, anatomy, notation,
                  choosing services, what people leave out, the questions
                  behind the picture, surviving a review, diagram rot, the
                  do's and don'ts, and the whiteboard interview
assets/app.js     Dashboard + browse views, rendering, search/filter, quiz
                  mode, flashcard drills, command palette (Cmd/Ctrl+K),
                  progress rings + streak tracking, lab-to-topic mapping
data/topics.json  The 267 topics as plain JSON (incl. per-topic difficulty)
```

Every simulation in the labs carries a plain-English on-ramp above its
controls: an everyday analogy for the mechanism, one concrete first action,
and a short glossary of only the jargon that appears on that screen. The
glossary is per-simulation rather than per-page, because someone lost in
the middle of an interaction does not scroll away to look a word up.

That last part is a checkable rule, not an aspiration: **every acronym,
product name and piece of domain jargon that appears on a simulation's
screen — including the text the simulation renders as you operate it — is
defined in that simulation's own glossary.** The two exceptions are the
scenario drill and the cloud-differences quiz, which replay other
simulations' answers and are read by someone who has already passed those
screens; glossing the whole page's vocabulary there buries the entries
that matter.

## Labs and topics are linked

Each hands-on lab card carries a **related-topics** strip showing how many of
the 267 topics that lab actually covers — 50 for the Cloud lab, 35 for
Evaluation, 33 for the diagram lab. Clicking it opens the browse view filtered
to just those, rather than the whole pile. The map from lab to categories lives
in `assets/app.js` (`LABS`); the counts are computed from `data/topics.json` at
load, so adding a topic updates the right card by itself. Every lab page has a
matching **▤ related topics** chip that links back to its own reading, and the
view is shareable as `index.html#lab=<key>`.

Categories a lab only brushes against are deliberately left out — a link that
returns half the site is the problem it was meant to fix.

Data, styling, and behaviour are split into separate files so each can be
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
