---
name: teaching-showroom
description: Maintain Prompts Oficina public catalogue, local search, exact Markdown preview, non-destructive personalization, downloads and manual GitHub Pages deployment.
---
# Teaching Prompt Studio

Use for `showcase/`, README presentations, UI design, SEO, accessibility and the Pages workflow.

1. Keep `prompts/01-*.md` through `prompts/10-*.md` as the source of truth. `showcase/manifest.mjs` supplies metadata only. Fetch the ten unchanged Markdown files as same-origin static assets and extract the exact ```text``` source block.
2. Search and category/audience filters operate within the visitor's browser. Do not collect searches, custom context, attachments or model credentials; do not invoke LLMs in the public site.
3. The personalization form adds labeled context **before** the original block without modifying it. Never imply the form automatically fills every bracketed placeholder.
4. Copy and download operations must preserve the correct original prompt, remain usable without a selected text mode, and fail transparently if a source file cannot load.
5. Validate link paths, Markdown staging, keyboard operation, mobile layout, semantic markup and clipboard fallbacks. Serve through HTTP, not `file://`, for real browser tests.
6. The Pages workflow is manual-only and stages ten numbered original `.md` files plus `PROMPTS_COMPLETOS.txt`. Official Actions must be pinned to full commit SHAs. Never start deployment, release or merge without approval.
7. The repository has no documented root license; do not invent reuse rights or a published software package.
