const M    = require('../');
const test = require('tape');

const running = {};

async function worker(name) {
  running[name] = running[name] || 0;
  await M.lock(name);
  running[name]++;
  await new Promise(r => setTimeout(r,1000));
  M.unlock(name);
}

test('Method exports', t => {
  t.plan(1);

  t.equal(typeof M.dbounce, 'function', '\'dbounce\' must be a function');
});

test('Quick burst of calls returns single true', async t => {
  t.plan(1);
  let timesCalled = 0;

  // Debounced function
  async function callHandler() {
    if (!await M.dbounce(`callHandler`, 50)) return;
    timesCalled++;
  }

  // Call a bunch of times
  for(let i=0; i<10; i++) {
    callHandler();
  }

  // Wait for it to finish
  await new Promise(r => setTimeout(r,1000));

  // callHandler should've only been called once
  t.equal(timesCalled, 1, 'dbounce returns true a single time for quick consecutive calls');
});
