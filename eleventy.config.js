
import lightningCSS from "@11tyrocks/eleventy-plugin-lightningcss";

export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("public");
  eleventyConfig.addPassthroughCopy("img");
  //eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPlugin(lightningCSS);

  return {
    htmlTemplateEngine: "njk"
  };

};