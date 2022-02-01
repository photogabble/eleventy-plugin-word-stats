const test = require('ava');
const measureTimePluginFn = require('../index.js');
const eleventyMockFactory = () => {
  return {
    wasCalled: false,
    filters: {},
    addFilter: function (filterName, fn) {
      this.wasCalled = true;
      this.filters[filterName] = fn;
    }};
};

test('calls addFilter', t => {
  const eleventyMock = eleventyMockFactory();

  t.false(eleventyMock.wasCalled);
  measureTimePluginFn(eleventyMock);
  t.true(eleventyMock.wasCalled);
});

test('options.output only accepts fn', t => {
  const eleventyMock = eleventyMockFactory();
  t.throws(() => {
    measureTimePluginFn(eleventyMock, {output: null})
  });
  t.notThrows(() => {
    measureTimePluginFn(eleventyMock, {output: () => 'hello world'});
  });
});

test('options.wordsPerMinute only accepts number greater than zero', t => {
  const eleventyMock = eleventyMockFactory();
  t.throws(() => {
    measureTimePluginFn(eleventyMock, {wordsPerMinute: -1})
  });
  t.throws(() => {
    measureTimePluginFn(eleventyMock, {wordsPerMinute: 'abc'})
  });
  t.notThrows(() => {
    measureTimePluginFn(eleventyMock, {wordsPerMinute: 123});
  });
});

test('content must be string', t => {
  const eleventyMock = eleventyMockFactory();
  measureTimePluginFn(eleventyMock);

  t.throws(() => {
    eleventyMock.filters.wordStats(123);
  });
  t.notThrows(() => {
    eleventyMock.filters.wordStats('hello world');
  });
});

test('parses reading time', t => {
  const eleventyMock = eleventyMockFactory();
  measureTimePluginFn(eleventyMock);
  t.is('2 words, 1 min read', eleventyMock.filters.wordStats('hello world'));
  t.is('4 words, 1 min read', eleventyMock.filters.wordStats({templateContent: 'hello world, goodbye world.'}));
});
