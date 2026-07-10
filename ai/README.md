# AI Services

One assistant brain serving the website chatbot, WhatsApp and Telegram.

## Architecture

- **Router**: cheap classifier decides deterministic-flow vs. RAG-answer vs. human.
- **RAG**: retrieval over `knowledge-base/` (chunked, embedded, reranked) with
  citations back to source pages.
- **Models**: Anthropic Claude (primary), OpenAI / Gemini (fallback routing);
  provider-agnostic adapter so models are config, not code.
- **Guardrails**: answers restricted to retrieved context; refuses medical
  claims beyond approved copy; PII redaction before logging; multilingual
  (auto-detect, reply in user's language).

## Knowledge base structure (`knowledge-base/`)

| File | Contents |
|---|---|
| `products.md` | Every product family, sizes, packs, MOQs, price-list pointers |
| `ordering.md` | Channels, delivery zones, payment methods, refunds |
| `custom-bottles.md` | Occasions, MOQs, artwork specs, proof & production timelines |
| `distributors.md` | Requirements, margins policy, application steps |
| `water-supply.md` | AQUOR Flow connections, smart meters, tokens, tariffs, leak alerts |
| `quality.md` | Purification stages, lab testing, certifications, batch traceability |
| `sustainability.md` | Recycling, buyback, stewardship, Foundation programs & stats |
| `company.md` | History, facilities, markets, leadership, careers |
| `policies.md` | Privacy (NDPR/GDPR), terms, complaint SLAs |

Keep entries **atomic** (one fact per bullet) and **dated** — the retriever
prefers recent chunks on conflict.

## Product recommendation

Given occasion + budget + quantity, the assistant maps to SKUs:
wedding → custom 500ml + premium glass head-table; office → dispenser
subscription + 500ml cartons; marathon → sports bottles + electrolyte line.

## Voice assistant

Same brain behind a speech layer (Web Speech API on site; WhatsApp voice-note
transcription inbound). Answers kept under 3 sentences for speakability.

## Evaluation

Golden-question suite (200 Q/A pairs) run on every knowledge-base change;
regression threshold: ≥ 95% pass. Human review queue samples 2% of production
conversations.
