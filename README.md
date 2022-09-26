# storybook-addon-css-custom-properties

Storybook's addon to pilot CSS custom properties (a.k.a CSS variables)

## Example of usage

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
