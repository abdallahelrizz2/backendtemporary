import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const serverSource = readFileSync(new URL('./server.js', import.meta.url), 'utf8');

describe('customer route permissions', () => {
  it('allows managers to create customers', () => {
    assert.match(
      serverSource,
      /app\.post\('\/api\/customers',\s*authMiddleware,\s*(?:requireMinRole\('manager'\)|requireRole\([^)]*'manager'[^)]*\))/s,
      'POST /api/customers must allow manager or higher so managers can add customers from customer and transaction flows'
    );
  });
});
