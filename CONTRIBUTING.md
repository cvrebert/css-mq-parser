# Contributing

### Code style
The project's coding style is laid out in the JSHint, ESLint, and JSCS configurations.

### Chai unit tests
The included [Chai-based](https://github.com/chaijs/chai) unit tests can be run via `npm run unit`.

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

1. Fork and clone the repo.
2. Run `npm install` to install all build dependencies.
3. Run `npm test` to lint & test this project.

Assuming that you don't see any red, you're ready to go. Just be sure to run `npm test` after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
2. Add failing tests for the change you want to make. Run `npm test` to see the tests fail.
3. Fix stuff.
4. Run `npm test` to see if the tests pass. Repeat steps 2-4 until done.
5. Update the documentation to reflect any changes.
6. Push to your fork and submit a pull request.

## Licensing
By contributing, you agree to license your contribution under [the New/Revised BSD License](https://github.com/cvrebert/css-mq-parser/blob/master/LICENSE.txt).
