const { promisify } = require('util');

const fs = require('fs');

const readFileAsync = promisify(fs.readFile);


// This will not produce an error in the console because the code never
// enters the catch in this case but still its wrong because we are not
// handling the error but just throwing it

async function noError() {
  try {
    const text = await readFileAsync('./text.txt', { encoding: 'utf8' });
    console.log('CONTENT:', text);
  } catch (err) {
    throw new Error('err', err);
  }
}

// This function will produce an error in node js which will look like this:
// (node:8231) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: err
// (node:8231) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated.
// In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

async function cantReadFile() {
  try {
    const text = await readFileAsync('./fileNotTher.txt', { encoding: 'utf8' });
    console.log('CONTENT:', text);
  } catch (err) {
    // In the future node js will exit with a error her the hole process
    // because we are throwing an error in a promise which is not handled
    throw new Error('err', err);
  }
}

noError();
cantReadFile();
