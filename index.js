/*
Copyright (c) 2015, Christopher Rebert.
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
/* eslint-env node */

'use strict';

const RE_MEDIA_QUERY = /^(?:(only|not)?\s*(\\?\\0(?:\s*))?([_a-z][_a-z0-9-]*)(\\9?)?|(\([^)]+\)))(?:\s*and\s*(.*))?$/i;
const RE_MQ_EXPRESSION = /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?::\s*([^)]+))?\s*\)$/;
const RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;

module.exports = function parseQuery(mediaQuery) {
    return mediaQuery.split(',').map(function (query) {
        query = query.trim();

        const captures = query.match(RE_MEDIA_QUERY);

        // Media Query must be valid.
        if (!captures) {
            throw new SyntaxError('Invalid CSS media query: "' + query + '"');
        }

        const modifier = captures[1];
        const type = captures[3];
        let expressions = ((captures[5] || '') + (captures[6] || '')).trim();
        const parsed = {
            inverse: !!modifier && modifier.toLowerCase() === 'not',
            preTypeHack: captures[2] || '',
            postTypeHack: captures[4] || '',
            type: type ? type.toLowerCase() : 'all',
        };

        // Check for media query expressions.
        if (!expressions) {
            parsed.expressions = [];
            return parsed;
        }

        // Split expressions into a list.
        expressions = expressions.match(/\([^)]+\)/g);

        // Media Query must be valid.
        if (!expressions) {
            throw new SyntaxError('Invalid CSS media query: "' + query + '"');
        }

        parsed.expressions = expressions.map(function (expression) {
            const exprCaptures = expression.match(RE_MQ_EXPRESSION);

            // Media Query must be valid.
            if (!exprCaptures) {
                throw new SyntaxError('Invalid CSS media query: "' + query + '"');
            }

            const feature = exprCaptures[1].toLowerCase().match(RE_MQ_FEATURE);

            return {
                modifier: feature[1],
                feature: feature[2],
                value: exprCaptures[2],
            };
        });

        return parsed;
    });
};
