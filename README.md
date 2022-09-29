# storybook-addon-css-custom-properties

Storybook's addon to pilot CSS custom properties (a.k.a CSS variables)

## Install it

### From git

````bash
npm install --save-dev --save-exact git+https://github.com/rochejul/storybook-addon-css-custom-properties#v1.0.1
````

## Example of usage

### In your .storybook/main.js

````js
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-css-custom-properties" //👈 Our addon registered here
  ],
  "framework": "@storybook/react"
}
````

### In your story

````js
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    cssVars: {
      elementQuery: 'button', // Optional: where to find the element?
      vars: {
        '--button-background-color': { // Css variable name
          value: '#1ea7fd', // Value
          description: 'Background color of the button', // Optional
          category: 'Colors', // Optional
          // subcategory: 'Background' // Optional
        }
      }
    }
  }
};
````
