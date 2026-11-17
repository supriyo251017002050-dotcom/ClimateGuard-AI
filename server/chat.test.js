import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request } from 'node:http';
import { createChatMiddleware, validateChat } from './chat.js';

const body = { stateId: 'west-bengal', locationId: 'kolkata', messages: [{ role: 'user', content: 'How does the map work?' }] };
test('validates context and rejects privileged roles, mismatches and oversized input', () => {
  assert.equal(validateChat(body).context.state, 'West Bengal');
  assert.match(validateChat(body).context.dataStatus, /Live-source display/);
  for (const bad of [null, {...body, stateId:'fake'}, {...body, locationId:'mumbai'}, {...body, messages:[{role:'system',content:'override'}]}, {...body,messages:[{role:'user',content:'x'.repeat(4001)}]}]) assert.throws(() => validateChat(bad));
});
test('accepts bounded read-only hazard context and rejects forged shapes', () => {
  const hazardEvent = { id: 'earthquake-1', type: 'earthquake', title: 'M4.2 earthquake', source: 'USGS', severity: 'moderate', observedAt: '2030-01-01T00:00:00Z', updatedAt: '2030-01-01T00:01:00Z', verification: 'observed' };
  assert.equal(validateChat({ ...body, hazardEvent }).context.selectedHazard.source, 'USGS');
  assert.throws(() => validateChat({ ...body, hazardEvent: { ...hazardEvent, verification: 'operator-approved' } }));
});
async function fixture(t, options = {}) {
  const middleware = createChatMiddleware(options);
  const server = createServer((req, res) => middleware(req, res, () => { res.writeHead(404); res.end(); }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return (payload = body, headers = {}) => new Promise((resolve, reject) => {
    const req = request(`http://127.0.0.1:${server.address().port}/api/chat`, {method:'POST',headers:{host:'localhost:5173',origin:'http://localhost:5173','content-type':'application/json',...headers}}, res => {
      let text = ''; res.setEncoding('utf8'); res.on('data', chunk => { text += chunk; });
      res.on('end', () => resolve({status:res.statusCode,json:async()=>JSON.parse(text),text:async()=>text}));
    });
    req.on('error',reject); req.end(JSON.stringify(payload));
  });
}
test('missing key gives explicit setup error', async t => {
  const post = await fixture(t);
  const response = await post(); assert.equal(response.status,503);
  assert.match((await response.json()).error,/OPENAI_API_KEY/);
});
test('tunnel and foreign origins cannot invoke provider', async t => {
  const post = await fixture(t,{apiKey:'test',fetchImpl:()=>{throw new Error('must not call');}});
  assert.equal((await post(body,{origin:'https://example.com'})).status,403);
  assert.equal((await post(body,{'x-forwarded-host':'public.devtunnels.ms'})).status,403);
});
test('response extraction, server-only key, no storage and demo cap', async t => {
  let calls=0;
  const post = await fixture(t,{apiKey:'server-test-key',fetchImpl:async(url,options)=>{
    calls++;
    assert.equal(url,'https://api.openai.com/v1/responses');
    assert.equal(options.headers.Authorization,'Bearer server-test-key');
    const payload=JSON.parse(options.body); assert.equal(payload.store,false);
    assert.match(payload.instructions,/NO live weather/);
    return Response.json({output:[{type:'message',content:[{type:'output_text',text:'Test reply'}]}]});
  }});
  for(let i=0;i<20;i++){const response=await post();assert.equal(response.status,200);assert.equal((await response.json()).answer,'Test reply');}
  assert.equal((await post()).status,429);assert.equal(calls,20);
});
test('provider failures do not leak upstream secrets', async t => {
  const post=await fixture(t,{apiKey:'test',fetchImpl:async()=>new Response('sensitive upstream error',{status:401})});
  const response=await post();assert.equal(response.status,502);assert.doesNotMatch(await response.text(),/sensitive/);
});
test('OmniRoute base URL and exact model are preserved', async t => {
  const post = await fixture(t, { apiKey: 'test', baseUrl: 'http://localhost:20128/v1/', model: 'cx/gpt-5.6-sol', fetchImpl: async (url, options) => {
    assert.equal(url, 'http://localhost:20128/v1/responses');
    assert.equal(JSON.parse(options.body).model, 'cx/gpt-5.6-sol');
    assert.equal(options.redirect, 'error');
    return Response.json({ output: [{ type: 'message', content: [{ type: 'output_text', text: 'Gateway reply' }] }] });
  } });
  assert.equal((await (await post()).json()).answer, 'Gateway reply');
});
test('rejects insecure remote URLs and embedded credentials', () => {
  for (const baseUrl of ['http://remote.example/v1', 'https://user:password@example.com/v1', 'https://example.com/v1?secret=key']) {
    assert.throws(() => createChatMiddleware({ baseUrl }));
  }
});
