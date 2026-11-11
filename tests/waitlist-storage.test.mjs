import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import * as validation from '../lib/waitlist.ts';

// Exercise the real route with only the unavailable storage boundary substituted.
function unavailableRoute() {
  const route = {};
  const source = readFileSync(new URL('../app/api/waitlist/route.ts', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const modules = {
    'drizzle-orm': { and() {}, eq() {} },
    '@/db': { getDb() { throw new Error('Storage unavailable'); } },
    '@/db/schema': { waitlist: {} },
    '@/lib/waitlist': validation,
  };
  const messages = [];
  new Function('require', 'exports', 'console', outputText)(
    (name) => {
      assert.ok(name in modules, `Unexpected dependency: ${name}`);
      return modules[name];
    },
    route,
    { error: (...args) => messages.push(args.join(' ')), log: (...args) => messages.push(args.join(' ')) },
  );
  return { route, messages };
}

function request(method, body) {
  return new Request('https://nurrie.example/api/waitlist', {
    method,
    headers: { 'content-type': 'application/json', origin: 'https://nurrie.example' },
    body: JSON.stringify(body),
  });
}

test('unavailable storage cannot acknowledge a registration or log the submitted address', async () => {
  const { route, messages } = unavailableRoute();
  const email = 'storage-check@example.invalid';
  const response = await route.POST(request('POST', { email, consent: true, website: '' }));
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.equal('removalToken' in body, false);
  assert.ok(messages.length > 0);
  assert.ok(messages.every(message => !message.includes(email)));
});

test('unavailable storage cannot acknowledge deletion of a registration', async () => {
  const { route } = unavailableRoute();
  const response = await route.DELETE(request('DELETE', { token: validation.createRemovalToken() }));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});
