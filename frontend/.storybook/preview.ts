import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      theme: themes.dark,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  // decorators: [
  //   withThemeByClassName({
  //     themes: {
  //       // nameOfTheme: 'classNameForTheme',
  //       light: "",
  //       dark: "dark",
  //     },
  //     defaultTheme: "light",
  //   }),
  // ],
};

export default preview;
