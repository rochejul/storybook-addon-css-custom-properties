# storybook-addon-css-custom-properties

Storybook's addon to pilot CSS custom properties (a.k.a CSS variables)

## Context

There are some addons for CSS vars in Storybook. Mostly  [@ljcl/storybook-addon-cssprop](https://storybook.js.org/addons/@ljcl/storybook-addon-cssprops/).
But this plugins: doesn't work well with React or real web components (it injects the CSS vars on the body of the panel, not on the element).

Then this addon should:
 - work better with React components, LWC components, etc...
 - not persist the configuration

## Install it

### From git

````bash
npm install --save-dev --save-exact git+ssh://git@github.com:rochejul/storybook-addon-css-custom-properties.git#v1.2.0
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
