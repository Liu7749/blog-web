import { IdAttributePlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import { DateTime } from "luxon";

export default async function (eleventyConfig) {
  // Copy public assets to output
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  // Copy RSS feed XSL
  eleventyConfig.addPassthroughCopy("content/feed/pretty-atom-feed.xsl");

  // Watch targets for live reload
  eleventyConfig.setServerOptions({
    watch: ["public/css/**/*.css"],
  });

  // Official plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(IdAttributePlugin);

  // Apply the path prefix to all URLs in the HTML output.
  // Register this explicitly (and before feedPlugin) so the RSS plugin's
  // internal HtmlBasePlugin adds are deduplicated to a single transform.
  eleventyConfig.addPlugin(HtmlBasePlugin, {
    baseHref: "/blog-web/",
  });

  // RSS Feed plugin
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    stylesheet: "feed/pretty-atom-feed.xsl",
    collection: {
      name: "posts",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Blog Title",
      subtitle: "A beautiful minimal blog.",
      base: "https://example.com/",
      author: {
        name: "Your Name",
      },
    },
  });

  // Image optimization
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "jpeg"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  // CSS & JS bundles
  eleventyConfig.addPlugin(pluginBundle, {
    toFileDirectory: "dist",
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj, format = "LLLL d, yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("readableDateShort", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLL d, yyyy");
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "posts", "nav"].indexOf(tag) === -1
    );
  });

  eleventyConfig.addFilter("getAllTags", (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet).filter(
      (tag) => ["all", "posts", "nav"].indexOf(tag) === -1
    );
  });

  // Shortcodes
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  return {
    templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
}
