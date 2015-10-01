/* eslint-env node */
/* eslint no-unused-expressions:0 */
/* global describe, it */
/* jshint -W030 */

var expect = require('chai').expect;
var parseMediaQuery = require('../');

describe('parseQuery()', function () {
    it('should parse media queries without expressions', function () {
        expect(parseMediaQuery('screen')).to.eql([
            {
                inverse: false,
                preTypeHack: '',
                type: 'screen',
                postTypeHack: '',
                expressions: []
            }
        ]);

        expect(parseMediaQuery('not screen')).to.eql([
            {
                inverse: true,
                preTypeHack: '',
                type: 'screen',
                postTypeHack: '',
                expressions: []
            }
        ]);
    });

    it('should parse common retina media query list', function () {
        var parsed = parseMediaQuery(
            'only screen and (-webkit-min-device-pixel-ratio: 2),\n' +
            'only screen and (   min--moz-device-pixel-ratio: 2),\n' +
            'only screen and (     -o-min-device-pixel-ratio: 2/1),\n' +
            'only screen and (        min-device-pixel-ratio: 2),\n' +
            'only screen and (                min-resolution: 192dpi),\n' +
            'only screen and (                min-resolution: 2dppx)'
        );

        expect(parsed).to.be.an.array;
        expect(parsed).to.have.length(6);
        expect(parsed[0].expressions[0].feature).to.equal('-webkit-min-device-pixel-ratio');
        expect(parsed[1].expressions[0].modifier).to.equal('min');
    });

    it('should parse media queries that use browser hacks', function () {
        // http://browserhacks.com/#hack-36e9719b0244c5806423ca3c8ce02bdc
        expect(parseMediaQuery('all and (min-resolution: 3e1dpcm)')).to.eql([
            {
                inverse: false,
                preTypeHack: '',
                type: 'all',
                postTypeHack: '',
                expressions: [{
                    modifier: 'min',
                    feature: 'resolution',
                    value: '3e1dpcm'
                }]
            }
        ]);

        // http://browserhacks.com/#hack-a60b03e301a67f76a5a22221c739dc64
        expect(parseMediaQuery('screen and (min-width:0\\0)')).to.eql([
            {
                inverse: false,
                preTypeHack: '',
                type: 'screen',
                postTypeHack: '',
                expressions: [{
                    modifier: 'min',
                    feature: 'width',
                    value: '0\\0'
                }]
            }
        ]);

        // http://browserhacks.com/#hack-411240e387db3ac5b87da57714e25d22
        expect(parseMediaQuery('\\0 all')).to.eql([
            {
                inverse: false,
                preTypeHack: '\\0 ',
                type: 'all',
                postTypeHack: '',
                expressions: []
            }
        ]);

        // http://browserhacks.com/#hack-c9242a5ec3f073257e275102be15d95f
        expect(parseMediaQuery('\\0screen')).to.eql([
            {
                inverse: false,
                preTypeHack: '\\0',
                type: 'screen',
                postTypeHack: '',
                expressions: []
            }
        ]);

        // http://browserhacks.com/#hack-a13653e3599eb6e6c11ba7f1a859193e
        expect(parseMediaQuery('\\\\0 screen')).to.eql([
            {
                inverse: false,
                preTypeHack: '\\\\0 ',
                type: 'screen',
                postTypeHack: '',
                expressions: []
            }
        ]);

        // http://browserhacks.com/#hack-6615a4a5434dc55fc1c01736edb32cb7
        expect(parseMediaQuery('screen\\9')).to.eql([
            {
                inverse: false,
                preTypeHack: '',
                type: 'screen',
                postTypeHack: '\\9',
                expressions: []
            }
        ]);

        // http://browserhacks.com/#hack-7e41bb4d3e33ad5da4d7d737b7bf3981
        expect(parseMediaQuery('\\0screen\\,screen\\9')).to.eql([
            {
                inverse: false,
                preTypeHack: '\\0',
                type: 'screen',
                postTypeHack: '\\',
                expressions: []
            },
            {
                inverse: false,
                preTypeHack: '',
                type: 'screen',
                postTypeHack: '\\9',
                expressions: []
            }
        ]);
    });

    it('should throw a SyntaxError when a media query is completely invalid', function () {
        function parse(query) {
            return function () {
                parseMediaQuery(query);
            };
        }

        expect(parse('some crap')).to.throw(SyntaxError);
        expect(parse('48em')).to.throw(SyntaxError);
        expect(parse('screen and crap')).to.throw(SyntaxError);
        expect(parse('screen and (48em)')).to.throw(SyntaxError);
        expect(parse('screen and (foo:)')).to.throw(SyntaxError);
        expect(parse('()')).to.throw(SyntaxError);
        expect(parse('(foo) (bar)')).to.throw(SyntaxError);
        expect(parse('(foo:) and (bar)')).to.throw(SyntaxError);
    });
});
