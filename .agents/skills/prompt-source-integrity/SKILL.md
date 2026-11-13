---
name: prompt-source-integrity
description: Preserve the ten original Portuguese educational prompts verbatim while maintaining indices, text bundles and independent usage instructions.
---
# Original prompt integrity

Use this skill when editing `prompts/`, `personalizacao/`, the derived catalogue metadata, or export logic.

1. Begin with `prompts/README.md`, `prompts/COMO_USAR.md` and the ten numbered Markdown sources. Keep the official copy block in each source under **Prompt para copiar**, fenced with ```text```.
2. The authoritative user-copying content is the complete original fenced block; don't turn explanatory page text into instructions or modify text while copying.
3. Keep the `prompts/PROMPTS_COMPLETOS.txt` distribution file in sync when a prompt genuinely changes, including clear start/end markers.
4. A website copy with optional user context may *prepend* a separately labeled context block, but the original instruction block must remain unchanged.
5. Keep prompts independent from private demos, other chats, hidden artifacts and specific connectors. Preserve warnings about missing files, unknown sources, fabricated citations, sensitive student data and optional tooling.
6. Update metadata/translated guide summaries without implying the actual Portuguese prompt content was translated.
7. Run `node --test showcase/tests/*.test.mjs` and inspect all ten extraction blocks. If source semantics change, document precisely which prompt, why and what was changed.
