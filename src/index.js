const state = {};

export function dbounce(name, ttl = 100) {

  // Close previous caller
  if (state[name]) {
    clearTimeout(state[name].timer);
    state[name].resolve(false);
  }

  // Externally-resolvable promise
  const ref = state[name] = {};
  ref.promise = new Promise(resolve => {
    ref.resolve = arg => {
      resolve(arg);
    };
  });

  // Add a timer to it
  ref.timer = setTimeout(() => {
    if (state[name] !== ref) return; // Something else closed this ref
    delete state[name];              // Close, prevent others from accessing this ref
    ref.resolve(true);               // Indicate this ref triggered
  }, ttl);

  // Return the promise as black-box
  return ref.promise;
}
