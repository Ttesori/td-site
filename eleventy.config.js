import lightningCSS from "@11tyrocks/eleventy-plugin-lightningcss";
import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("public");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPlugin(lightningCSS);
  eleventyConfig.addWatchTarget("src/js");

  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByTag("post");
  });
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });
  eleventyConfig.addFilter("truncate", function (content, length, useEllipsis = false) {
    if (content.length <= length) {
      return content;
    }
    return content.slice(0, length) + (useEllipsis ? "…" : "");
  });

  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
  eleventyConfig.setLibrary('md', markdownLib);

  return {
    htmlTemplateEngine: "njk"
  };

};