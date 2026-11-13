# Prompts Oficina — educational prompt library

**Languages:** **English (default)** · [Português (Brasil)](README.pt-BR.md) · [Italiano](README.it.md)

**[Explore the Teaching Prompt Studio](https://cecil-ia-labs.github.io/prompts-oficina/)** · [Original Portuguese prompts](prompts/README.md) · [Source](https://github.com/cecil-ia-labs/prompts-oficina)

A public collection of **ten independent prompts in Brazilian Portuguese** for university teachers, students and early-career researchers. The library was prepared for the workshop of **28 October 2026**, and does not depend on the private demonstration environment or materials from earlier conversations.

The standalone showroom offers searching, filters by audience and subject, a verbatim preview of each original prompt, and copy/download controls. Optional user context can be prepended separately without rewriting any original instructions.

**No AI model is executed on the website.** Visitors transfer the chosen prompt to their own chat or local model, then supply the needed files and information there.

## The ten original prompts

| # | Prompt | Main purpose |
| --- | --- | --- |
| 01 | [Lesson plan → presentation and exercises](prompts/01-plano-de-aula-apresentacao-e-exercicios.md) | Slides, student exercises and separate teacher answer key |
| 02 | [Grammar, syntax and argument review](prompts/02-revisao-gramatical-sintatica-e-logica.md) | Improve text while respecting original authorship and meaning |
| 03 | [Publish a paper on Zenodo without GitHub](prompts/03-publicar-artigo-no-zenodo-sem-github.md) | Browser-only deposit guidance and metadata checklist |
| 04 | [Interactive concept miniapp](prompts/04-miniapp-interativo-conceitual.md) | Interactive educational experience and standalone HTML |
| 05 | [Socratic tutor](prompts/05-tutor-socratico.md) | Progressive questions, hints and feedback |
| 06 | [Critical reading of an article](prompts/06-leitura-critica-de-artigo.md) | Traceable reading notes and evidence appraisal |
| 07 | [Active-recall study plan](prompts/07-plano-de-estudos-e-recuperacao-ativa.md) | Realistic study schedule and retrieval practice |
| 08 | [Rubric and formative feedback](prompts/08-rubrica-e-feedback-formativo.md) | Observable assessment criteria and constructive feedback |
| 09 | [Verifiable literature search](prompts/09-busca-bibliografica-verificavel.md) | Reproducible search terms and selection criteria |
| 10 | [Accessible learning materials](prompts/10-adaptar-material-para-acessibilidade.md) | Improve clarity and access without losing rigor |

The links are to the **authoritative Portuguese Markdown documents**. Translated overviews are not translations of the ten prompts themselves.

## How to use

Choose an item in the [catalogue](prompts/README.md), copy its *Prompt para copiar* fenced text block, fill the original bracketed fields, and provide its requested materials **in the same chat** as the prompt. Review results, sources, privacy and attribution before using them in class or research.

The [complete usage guide](prompts/COMO_USAR.md) offers alternatives where Google Docs, Google Slides, browsing, file generation or live miniapps are unavailable.

[Download all prompts as plain text](prompts/PROMPTS_COMPLETOS.txt) · [Personalization instructions](personalizacao/README.md)

## Run the local showroom

The static SPA in `showcase/` loads only public Markdown assets from the same origin. It does not upload files, accept API keys, or invoke an AI provider.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
# Open http://127.0.0.1:8000/showcase/
node --test showcase/tests/*.test.mjs
```

Pages publication is available only by manual `workflow_dispatch` in `.github/workflows/publish-showcase.yml`; the site is not automatically deployed on push.

Development conventions: [AGENTS.md](AGENTS.md), [project skills](.agents/skills/), [showroom documentation](showcase/README.md).

## Scope and reuse

These are independent educational instructions, not installed automations. A model's output depends on the real attachments and tools available in the user's own environment. The publisher does not claim that the instructions were executed, that files were produced, or that a research article was deposited.

**Licensing note:** No root `LICENSE` file is currently present. Public visibility is not itself permission for open-source reuse; the maintainer should select and document appropriate license terms.
