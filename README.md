# Word Stats Plugin for Eleventy

A lightweight wrapper for making available [reading-time](https://www.npmjs.com/package/reading-time) to the [Eleventy](https://www.11ty.dev/) Static Site Generator.

## Install
```
npm i @photogabble/eleventy-plugin-word-stats
```

## Usage
In your Eleventy config file (defaults to .eleventy.js):

```js
const wordStats = require('@photogabble/eleventy-plugin-word-stats');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(wordStats);
};
```

Now the `wordStats` filter will be available to use in your templates. For example with Nunjuck it can be used as such:

```html
<p>{{ content | wordStats }}</p>
```
Which will by default output along the lines of:

```html
<p>1244 words, 6 min read</p>
```

## Configuration
```ts
interface Options {
  output?: (stats: object) => string;
  wordBound?: (char: string) => boolean;
  wordsPerMinute?: number;
}
```

### Output
Function that controls the output of the `wordStats` filter. It's stats argument is provided an object that matches the following interface:

```ts
interface ReadTimeResults {
  text: string;
  time: number;
  words: number;
  minutes: number;
}
```

## Not invented here
If all you need is the word count formatted, there are two very good alternatives to this plugin:

- [eleventy-plugin-time-to-read](https://www.npmjs.com/package/eleventy-plugin-time-to-read)
- [eleventy-plugin-reading-time](https://www.npmjs.com/package/eleventy-plugin-reading-time)

## License
This 11ty plugin is open-sourced software licensed under the [MIT License](LICENSE)
