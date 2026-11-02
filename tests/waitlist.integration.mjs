import assert from 'node:assert/strict';

const origin = process.env.NURRIE_TEST_ORIGIN || 'http://127.0.0.1:5173';
const email = `nurrie-qa-${Date.now()}@example.invalid`;
const tokens = new Set();
async function request(method, body, requestOrigin = origin) {
  const response = await fetch(`${origin}/api/waitlist`, { method, headers: { 'Content-Type': 'application/json', Origin: requestOrigin }, body: JSON.stringify(body) });
  const text = await response.text();
  let parsed;
  try { parsed = JSON.parse(text); } catch { parsed = { error: text }; }
  return { status: response.status, body: parsed };
}
try {
  for (const path of ['/', '/privacy', '/fonts/gambarino.woff2', '/fonts/general-sans.woff2', '/fonts/optimer-regular.json', '/images/product-duo.png']) {
    assert.equal((await fetch(`${origin}${path}`)).status, 200, `Serves ${path}`);
  }
  assert.equal((await request('POST', { email, consent: false })).status, 400);
  assert.equal((await request('POST', { email, consent: true }, 'https://foreign.example')).status, 403);
  const first = await request('POST', { email, consent: true, website: '' });
  assert.equal(first.status, 200, first.status === 200 ? undefined : JSON.stringify(first.body)); assert.match(first.body.removalToken, /^[a-f0-9]{64}$/);
  const token = first.body.removalToken; tokens.add(token);
  const duplicate = await request('POST', { email, consent: true });
  assert.equal(duplicate.status, 200); assert.equal(duplicate.body.removalToken, null);
  const owned = await request('POST', { email, consent: true, removalToken: token });
  assert.equal(owned.body.removalToken, token);
  assert.equal((await request('DELETE', { token: 'invalid' })).status, 400);
  assert.equal((await request('DELETE', { token })).status, 200);
  assert.equal((await request('DELETE', { token })).status, 200);
  tokens.delete(token);
  const again = await request('POST', { email, consent: true });
  assert.equal(again.status, 200); assert.notEqual(again.body.removalToken, token); tokens.add(again.body.removalToken);
  console.log('PASS: pages/assets, consent, origin rejection, durable signup, deduplication, token ownership, deletion, repeat deletion, and re-registration.');
} finally {
  for (const token of tokens) await request('DELETE', { token });
  console.log('Synthetic local registrations removed.');
}

