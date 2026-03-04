/** @type {import("prettier").Config} */

export default {
  semi: false,
  singleQuote: false,
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  singleAttributePerLine: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  vueIndentScriptAndStyle: false,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "**/*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
