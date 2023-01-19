import React from 'react';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    cssVars: {
      elementQuery: 'button',
      vars: {
        '--button-background-color': {
          value: '#1ea7fd',
          description: 'Background color of the button',
          category: 'Colors'
        },
        '--button-border-radius': {
          value: '3rem',
          description: 'Border radius of the button',
          category: 'Border',
          control: 'text'
        }
      }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
  primary: true,
  label: 'Button 2',
};
