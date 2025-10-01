import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

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

  // date transform
  eleventyConfig.addFilter("dateString", function (date) {
    const year = date.getUTCFullYear();
    const month = frontPad(date.getUTCMonth() + 1);
    const day = frontPad(date.getUTCDate());

    return `${year}-${month}-${day}`;
  });

  // RSS feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Aimless Blog",
      subtitle: "Miscellaneous thoughts, news, and music picks.",
      base: "https://handeyeco.github.io/personal-blog/",
      author: {
        name: "Aimless Blog",
        email: "", // Optional
      },
    },
  });
}
