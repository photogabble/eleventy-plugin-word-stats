const readingTime = require('reading-time');

const defaultOptions = {
    output: function (stats) {
      return `${stats.words} words, ${stats.text}`;
    },
    wordsPerMinute: 200,
    wordBound: null,
};

const measureTime = (content, options) => {
    const html = content.templateContent || content;
    if (typeof html !== 'string') {
        throw new Error('Word-Stats input must be a string.');
    }

    let readingTimeOptions = {};
    if (options.wordsPerMinute) {
        readingTimeOptions.wordsPerMinute = options.wordsPerMinute;
    }
    if (options.wordBound) {
        readingTimeOptions.wordBound = options.wordBound;
    }

    return options.output(readingTime(html, readingTimeOptions));
};

const validateOptions = (options) => {
    let validated = {};

    for (let [key, value] of Object.entries(options)) {
        key = key.toLowerCase();

        if (key === 'output' && typeof value !== 'function') {
            throw new Error(`Word-Stats output option must be a function. Received ${typeof value}: ${JSON.stringify(options)}`);
        }

        if (key === 'wordsperminute') {
            if (typeof value !== 'number') {
                throw new Error(`Word-Stats wordsPerMinute option must be a number. Received ${typeof value}: ${JSON.stringify(options)}`);
            }

            if (value <= 0) {
                throw new Error(`Word-Stats wordsPerMinute option must be greater than zero. Received ${value}: ${JSON.stringify(options)}`);
            }
        }

        if (key === 'wordbound' && typeof value !== 'function') {
            throw new Error(`Word-Stats wordBound option must be a function. Received ${typeof value}: ${JSON.stringify(options)}`);
        }

        validated[key] = value;
    }
    return validated;
};

module.exports = function (eleventyConfig, customOptions = {}) {
    const globalOptions = Object.assign({}, defaultOptions, validateOptions(customOptions));
    eleventyConfig.addFilter(
        'wordStats',
        (input, ...instanceOptions) => measureTime(
            input,
            Object.assign({}, globalOptions, instanceOptions)
        )
    );
};
