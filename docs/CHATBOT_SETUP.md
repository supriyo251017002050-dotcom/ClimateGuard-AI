# ClimateGuard chatbot (local development)

The floating Ask ClimateGuard panel follows the selected state/city. It sends the question, up to ten previous messages and location names to the configured AI provider/gateway and its upstream provider (OpenAI by default). History is in browser memory only and clears on reload or New chat. The provider request uses `store: false`; this is not a promise of zero provider or gateway retention.

## OmniRoute

For a locally running OmniRoute using its documented default port, use these server-only settings in `.env.local` (preserve Cesium settings):

```dotenv
OPENAI_API_KEY=your-replacement-omniroute-key
OPENAI_MODEL=cx/gpt-5.6-sol
OPENAI_BASE_URL=http://localhost:20128/v1
```

Use the actual API base URL shown by your OmniRoute instance if different. Keep OmniRoute running and restart `npm run dev`. This integration calls `/v1/responses`, which OmniRoute documents as supported; model availability and routing must be configured in your instance. A hosted gateway must use HTTPS. The previously shared key should be revoked, not reused. Do not put private keys in `VITE_` variables. The app does not install or configure OmniRoute itself.

[OmniRoute inference documentation](https://github.com/diegosouzapw/OmniRoute/blob/release/v3.8.50/skills/omni-inference/SKILL.md)

## Activate

1. Create an OpenAI API key in your own account and configure API billing/budget controls. API usage may cost money.
2. Open the existing `.env.local` in this project. Keep the Cesium settings unchanged. Append these lines, replacing the example value locally:

   ```dotenv
   OPENAI_API_KEY=your-api-key
   OPENAI_MODEL=gpt-4.1-mini
   ```

   Never prefix the private key with `VITE_`, place it in `src`, commit it, or paste it into chat. `.env.local` is ignored by Git.
3. Restart `npm run dev`. Open `http://localhost:5173`, click Ask ClimateGuard and send a question.
4. Select another state and check that the panel context changes. Use New chat to clear earlier discussion.

The server returns a clear setup error without a key, not fabricated AI output. Model access depends on your API account. No new package installation is needed.

## Scope and safeguards

- General preparedness and app explanations only. No live alert feed, verified risk scoring, shelter search, emergency dispatch, or map-control tools are connected.
- Plain text output, no HTML execution. Requests have size limits, a 30-second provider timeout, one concurrent request and a shared 20-request/hour development limit (resets on restart).
- Stop cancels the client request and attempts to abort upstream work; it does not guarantee no charge for work already performed.
- The backend is a Vite development middleware, not part of the static build. `vite preview` and static hosting do not serve this API.
- Chat rejects non-local browser origins, non-local hosts and forwarded hosts. This is a local-demo restriction, not production authentication. Public deployment needs an authenticated backend, per-user quotas, durable spending limits, privacy review and safety evaluation before enabling chat on a tunnel.
- Follow official local guidance in emergencies. The chatbot may be wrong; prompt instructions alone are not a safety guarantee.

## Verification

Run `node --test server/chat.test.js src/data/locationSelection.test.js` and `npm run build`. Server tests mock the provider and incur no API charges. A real response needs your configured key and manual end-to-end verification.

References: [Responses API](https://developers.openai.com/api/reference/typescript/resources/responses/methods/create), [model](https://developers.openai.com/api/docs/models/gpt-4.1-mini), [Vite plugin middleware](https://vite.dev/guide/api-plugin.html#configureserver).
