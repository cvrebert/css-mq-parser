/*
Copyright (c) 2015, Christopher Rebert.
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
/* eslint-env node */

var RE_MEDIA_QUERY = /^(?:(only|not)?\s*(\\?\\0(?:\s*))?([_a-z][_a-z0-9-]*)(\\9?)?|(\([^\)]+\)))(?:\s*and\s*(.*))?$/i;
var RE_MQ_EXPRESSION = /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?:\:\s*([^\)]+))?\s*\)$/;
var RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;

module.exports = function parseQuery(mediaQuery) {
    return mediaQuery.split(',').map(function (query) {
        query = query.trim();

        var captures = query.match(RE_MEDIA_QUERY);

        // Media Query must be valid.
        if (!captures) {
            throw new SyntaxError('Invalid CSS media query: "' + query + '"');
        }

        var modifier = captures[1];
        var type = captures[3];
        var expressions = ((captures[5] || '') + (captures[6] || '')).trim();
        var parsed = {
            inverse: !!modifier && modifier.toLowerCase() === 'not',
            preTypeHack: captures[2] || '',
            postTypeHack: captures[4] || '',
            type: type ? type.toLowerCase() : 'all'
        };

        // Check for media query expressions.
        if (!expressions) {
            parsed.expressions = [];
            return parsed;
        }

        // Split expressions into a list.
        expressions = expressions.match(/\([^\)]+\)/g);

        // Media Query must be valid.
        if (!expressions) {
            throw new SyntaxError('Invalid CSS media query: "' + query + '"');
        }

        parsed.expressions = expressions.map(function (expression) {
            var exprCaptures = expression.match(RE_MQ_EXPRESSION);

            // Media Query must be valid.
            if (!exprCaptures) {
                throw new SyntaxError('Invalid CSS media query: "' + query + '"');
            }

            var feature = exprCaptures[1].toLowerCase().match(RE_MQ_FEATURE);

            return {
                modifier: feature[1],
                feature: feature[2],
                value: exprCaptures[2]
            };
        });

        return parsed;
    });
};
