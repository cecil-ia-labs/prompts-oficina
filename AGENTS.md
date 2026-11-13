# AGENTS.md — Prompts Oficina

## Mission and source authority

This repository publishes ten independent, Portuguese-language educational prompts from the 28 October 2026 workshop. It is not the private AI Teaching Studio application and has no dependency on previous conversations, private files, Google Drive access or a particular AI model.

**Authoritative content:** `prompts/01-*.md` through `prompts/10-*.md`, the index `prompts/README.md`, and the usage guide `prompts/COMO_USAR.md`. These define prompt behavior, caveats and required materials. `prompts/PROMPTS_COMPLETOS.txt` is a distribution copy; do not let it silently diverge from the source files.

## Agent skills

- [Original prompt integrity](.agents/skills/prompt-source-integrity/SKILL.md): maintain sources, verbatim fenced-block extraction, educational safety and the complete-text bundle.
- [Teaching Prompt Studio](.agents/skills/teaching-showroom/SKILL.md): maintain the public interactive catalogue, optional context, accessibility, static assets and manual Pages workflow.

Use the smallest relevant skill before modifying the source material or website.

## Key invariants

1. Preserve all ten prompts' Portuguese content and source provenance. An English or Italian README is only an overview, not a translation of the actual instructions.
2. The website extracts exactly the ```text``` block under **Prompt para copiar**. Never rewrite the original automatically or silently alter bracketed fields.
3. Optional personalization is a separate preface supplied by the visitor. It does not replace the original content and must not be stored or sent to a provider.
4. No model calls, uploads, credentials, user tracking or server-side processing. The website fetches only *its own public static Markdown assets*.
5. Explicitly state when Docs, Slides, browser research or in-chat miniapps require tools not present in a user's chat. Do not claim that the original prompts have been run or produced results.
6. Do not include private teaching-studio materials or participant information. Uploaded assignments and personal data belong in the user's chosen chat and must be reviewed for privacy.
7. Maintain page semantics, labels, keyboard navigation, contrast, download safeguards and all ten source paths.

## Repository workflow

Work in task-scoped branches and preserve the original Markdown and personalization guides unless a targeted content change is required. For the website:

```sh
node --check showcase/studio.mjs
node --check showcase/manifest.mjs
node --check showcase/prompt-utils.mjs
node --test showcase/tests/*.test.mjs
```

Test fetching the actual ten Markdown assets using a local HTTP server; `file://` opening can block same-origin requests.

GitHub Pages is published **manually only**, through SHA-pinned official Actions in `.github/workflows/publish-showcase.yml`. Do not initiate Actions, merge, or publish automatically. This public repository has no root `LICENSE` file as of the showroom addition; ask the maintainer to choose licensing terms rather than inventing them.
