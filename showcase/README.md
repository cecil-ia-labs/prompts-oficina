# Prompts Oficina — Teaching Prompt Studio

This static SPA presents the ten Portuguese educational prompts **verbatim**. It does not execute them, rewrite their instructions, upload attachments, authenticate users, or call AI providers.

## Source preservation

The authoritative text lives in `prompts/01-*.md` through `prompts/10-*.md`. Each has exactly one ```text``` fenced section headed **Prompt para copiar**. `showcase/prompt-utils.mjs` extracts that block and preserves it exactly (including its original whitespace). The list metadata in `showcase/manifest.mjs` is a derived editorial index; it must never replace the source.

The optional customization form adds a separate block of user context. It **does not fill bracketed placeholders** in the original or alter its instructions. Visitors should still inspect and fill the original fields as needed.

## Build and test

Serve the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/showcase/`. The site loads the original Markdown files through a **same-origin static request**, not a model or external API. Opening `index.html` through `file://` may prevent loading those files because of browser origin policies.

```sh
node --check showcase/studio.mjs
node --check showcase/manifest.mjs
node --check showcase/prompt-utils.mjs
node --test showcase/tests/*.test.mjs
```

## Manual Pages publishing

`.github/workflows/publish-showcase.yml` packages the SPA plus the ten unchanged Markdown source files and `PROMPTS_COMPLETOS.txt` in `_site/prompts/`. It runs only by explicit `workflow_dispatch` and uses SHA-pinned official GitHub Actions. It never publishes npm packages or uploads any private demo content.

Target URL: `https://cecil-ia-labs.github.io/prompts-oficina/`. This is a planned public URL until the maintainer executes Pages publication and verifies it.

## Editorial boundaries

- Do not imply that Docs, Slides, browsing, miniapps, files or other integrations are present in every chat; the prompts include alternatives.
- Do not ask for private materials or student identifiers in this public page.
- Search across public prompt content using only local browser processing; do not transmit search queries or context form values.
- Preserve the original educational prompts, workshop history and Portuguese language; translated README summaries are not translations of the actual instructions.
- The repository currently lacks a root `LICENSE` file. License terms must come from the maintainer and must never be invented by site authors.
