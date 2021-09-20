# dbounce

Basic de-bounce helper

> **Please Note:** Due to the very limited scope of this module, I do not anticipate needing to make very many changes to it.  Expect long stretches of zero updates—that does not mean that the module is outdated.

## Motivation

There are multitudes of ways to handle de-bouncing in most frameworks. This
library is my way of trying to make de-bouncing calls in my projects consistent,
regardless of the rest of the software stack used.

## Installation

Use your favorite package manager to install it from [npmjs](https://npmjs.com).
I'll be using `npm` in the examples in this readme.

```bash
npm install --save dbounce
```

## Usage

```javascript

// Use the import syntax
import { dbounce } from 'dbounce';

// Or use commonjs import
const { dbounce } = require('dbounce');

// Debounced function
async function callHandler(arg) {
  if (!await dbounce(`callHandler|${arg}`)) return;
  console.log('TRIGGERED');
}

// Call it a bunch of times
// Results in a single "TRIGGERED"
for(let i=0; i<10; i++) {
  callHandler('Same-argument');
}

// Calling with different arguments will trigger all of them
for(let i=0; i<10; i++) {
  callHandler(i);
}

// You can also choose a custom debounce ttl
// Will only trigger after 2 seconds in this case
async function slowHandler() {
  if (!await dbounce('slowHandler', 2000)) return;
  // Your debounced code here
}

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
