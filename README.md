# CSS Media Query Parser
[![npm version](https://img.shields.io/npm/v/css-mq-parser.svg)](https://www.npmjs.com/package/css-mq-parser)
[![Tests Status](https://img.shields.io/github/workflow/status/cvrebert/css-mq-parser/Tests/master?label=tests)](https://github.com/cvrebert/css-mq-parser/actions/workflows/tests.yml)
[![Coverage Status](https://img.shields.io/coveralls/cvrebert/css-mq-parser.svg?branch=master)](https://coveralls.io/r/cvrebert/css-mq-parser)
[![devDependency Status](https://img.shields.io/david/dev/cvrebert/css-mq-parser.svg)](https://david-dm.org/cvrebert/css-mq-parser#info=devDependencies)

Parses CSS media query expressions.

## Installation

Install via npm:

```shell
$ npm install css-mq-parser
```

## Usage

This package exports one function, which can parse CSS media query expressions and return an AST.
The parser tolerates several known CSS media query browser hacks, but will throw a `SyntaxError` if the media query expression is severely malformed.
Note that this module implements a lax/liberal/non-validating parser; even modulo browser hacks, the fact that it parses a given expression successfully does not guarantee that the expression is valid per the relevant CSS specifications.

```javascript
var parseMediaQuery = require('css-mq-parser');
var ast = parseMediaQuery('screen and (min-width: 48em)');
```

The `ast` variable will have the following payload:

```json
[
    {
        "inverse": false,
        "preTypeHack": "",
        "type": "screen",
        "postTypeHack": "",
        "expressions": [
            {
                "modifier": "min",
                "feature": "width",
                "value": "48em"
            }
        ]
    }
]
```


## License & Acknowledgements

This project is a fork of [css-mediaquery](https://www.npmjs.com/package/css-mediaquery).
This software is free to use under the New/Revised BSD License.
See the [LICENSE file](https://github.com/cvrebert/css-mq-parser/blob/master/LICENSE.txt) for license text and copyright information.
