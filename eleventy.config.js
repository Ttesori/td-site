import lightningCSS from "@11tyrocks/eleventy-plugin-lightningcss";


export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("public");
  eleventyConfig.addPassthroughCopy("src/img");
  //eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPlugin(lightningCSS);
  eleventyConfig.addWatchTarget("src/js");

  return {
    htmlTemplateEngine: "njk"
  };

};