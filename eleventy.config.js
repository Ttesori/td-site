import lightningCSS from "@11tyrocks/eleventy-plugin-lightningcss";
import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import { JSDOM } from "jsdom";

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("public");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/resources");
  eleventyConfig.addPlugin(lightningCSS);
  eleventyConfig.addWatchTarget("src/js");

  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByTag("post");
  });
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });
  eleventyConfig.addFilter("truncate", function (content, length, useEllipsis = false) {
    if (!content) return "";

    if (content.length <= length) {
      return content;
    }
    let truncated = content.slice(0, length);
    // If it cuts off in the middle of a word, go back to the last space
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated + (useEllipsis ? "…" : "");
  });

  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.addTransform("externalLinks", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      const dom = new JSDOM(content);
      const links = dom.window.document.querySelectorAll("a[href^='http']:not([href*='" + process.env.URL + "'])");

      for (const link of links) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener");
      }

      return dom.serialize();
    }
    return content;
  });

  return {
    htmlTemplateEngine: "njk"
  };

};