import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("posts/**/img/*");

  eleventyConfig.addFilter("dateString", function (date) {
    function frontPad(input, char = "0", len = 2) {
      let str = String(input);
      while (str.length < len) {
        str = char + str;
      }
      return str;
    }

    return `${date.getUTCFullYear()}-${frontPad(date.getUTCMonth() + 1)}-${frontPad(date.getUTCDate())}`;
  });
}
