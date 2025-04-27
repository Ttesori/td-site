
import eleventyPluginFilesMinifier from "@codestitchofficial/eleventy-plugin-minify";

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("public");
  eleventyConfig.addPassthroughCopy("src/img");
  //eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
  eleventyConfig.addWatchTarget("src/js");

  return {
    htmlTemplateEngine: "njk"
  };

};