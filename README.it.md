# Prompts Oficina — biblioteca di prompt educativi

**Lingue:** [English](README.md) · [Português (Brasil)](README.pt-BR.md) · **Italiano**

**[Esplora il Teaching Prompt Studio](https://cecil-ia-labs.github.io/prompts-oficina/)** · [Prompt originali in portoghese](prompts/README.md) · [Repository](https://github.com/cecil-ia-labs/prompts-oficina)

Prompts Oficina è una raccolta pubblica di **dieci prompt indipendenti in portoghese brasiliano**, progettati per docenti universitari, studenti e ricercatori agli inizi. La biblioteca nasce dalla formazione del **28 ottobre 2026** e non richiede file privati né l'accesso alla demo originale.

Lo showroom permette di cercare per tema o testo, filtrare per pubblico, leggere il **testo originale integrale**, copiarlo e scaricarlo. È possibile premettere un contesto didattico personale in un blocco separato, senza modificare il prompt pubblicato.

**Il sito non esegue modelli di IA, non invia allegati e non richiede chiavi API.** Si copia il prompt nell'interfaccia di IA scelta e si forniscono lì i materiali necessari.

## I dieci prompt

| N. | Prompt originale | Utilità didattica |
| --- | --- | --- |
| 01 | [Piano di lezione, presentazione ed esercizi](prompts/01-plano-de-aula-apresentacao-e-exercicios.md) | Slide, attività e soluzioni separate |
| 02 | [Revisione grammaticale, sintattica e logica](prompts/02-revisao-gramatical-sintatica-e-logica.md) | Miglioramento del testo senza cancellare la voce autoriale |
| 03 | [Pubblicare un articolo su Zenodo senza GitHub](prompts/03-publicar-artigo-no-zenodo-sem-github.md) | Deposito guidato nel browser e metadati |
| 04 | [Miniapp per esplorare un concetto](prompts/04-miniapp-interativo-conceitual.md) | Esperienza interattiva e HTML esportabile |
| 05 | [Tutor socratico](prompts/05-tutor-socratico.md) | Domande progressive e feedback |
| 06 | [Lettura critica di un articolo](prompts/06-leitura-critica-de-artigo.md) | Scheda di lettura con attenzione alle prove |
| 07 | [Piano di studio e richiamo attivo](prompts/07-plano-de-estudos-e-recuperacao-ativa.md) | Programmazione sostenibile e revisione |
| 08 | [Rubrica e feedback formativo](prompts/08-rubrica-e-feedback-formativo.md) | Valutazione con criteri osservabili |
| 09 | [Ricerca bibliografica verificabile](prompts/09-busca-bibliografica-verificavel.md) | Strategia riproducibile senza fonti inventate |
| 10 | [Adattamento dei materiali per l'accessibilità](prompts/10-adaptar-material-para-acessibilidade.md) | Chiarezza e accesso senza perdere rigore |

Questi titoli sono tradotti a scopo orientativo. **I dieci prompt rimangono in portoghese**; le pagine Markdown collegate sono le fonti autorevoli.

## Come utilizzarli

Scegliere un prompt, copiare il blocco *Prompt para copiar*, completare i campi tra parentesi quadre e allegare o incollare il materiale **nella stessa conversazione**. Valutare criticamente il risultato, verificare le fonti e adeguare il prodotto al contesto didattico.

Il documento [Como usar](prompts/COMO_USAR.md) spiega l'uso dei materiali, i limiti delle integrazioni e le alternative a Docs, Slides o applicazioni interattive non disponibili.

[Scarica tutti i prompt in testo semplice](prompts/PROMPTS_COMPLETOS.txt) · [Personalizzazione di ChatGPT](personalizacao/README.md)

## Sviluppo e pubblicazione

Lo showroom statico si trova in `showcase/` e carica soltanto i file Markdown pubblici dalla stessa origine. Non richiede servizi remoti, API o archiviazione degli allegati degli utenti.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
# Aprire http://127.0.0.1:8000/showcase/
node --test showcase/tests/*.test.mjs
```

La pubblicazione su GitHub Pages avviene soltanto tramite il workflow manuale in `.github/workflows/publish-showcase.yml`. Per le istruzioni di sviluppo consultare [AGENTS.md](AGENTS.md).

## Limiti

Questi prompt sono istruzioni testuali e non automazioni eseguite. Il risultato dipende dalle capacità del modello, dagli allegati realmente disponibili e dalle integrazioni abilitate. L'utente verifica fonti, correttezza, privacy e attribuzione prima dell'utilizzo accademico.

Al momento non esiste un file `LICENSE` nella radice del repository: la visibilità pubblica non equivale automaticamente a una licenza d'uso open source. Il titolare deve indicare i termini di riutilizzo.
