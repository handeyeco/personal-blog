import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

function frontPad(input, char = "0", len = 2) {
  let str = String(input);
  while (str.length < len) {
    str = char + str;
  }
  return str;
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("posts/**/img/*");

  eleventyConfig.addFilter("dateString", function (date) {
    const year = date.getUTCFullYear();
    const month = frontPad(date.getUTCMonth() + 1);
    const day = frontPad(date.getUTCDate());

    return `${year}-${month}-${day}`;
  });
}
