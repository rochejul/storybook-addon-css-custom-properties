import React from 'react';

import { addons, types } from '@storybook/addons';
import { useParameter, useStorybookState, useArgs, useGlobals } from '@storybook/api';
import { AddonPanel, ArgsTable } from '@storybook/components';

const ADDON_ID = 'cssVars';
const PANEL_ID = `${ADDON_ID}/panel`;

const getIframeRoot = () => {
  const iframe = document.querySelector('iframe#storybook-preview-iframe');
  const root = iframe.contentWindow.document.querySelector('#root');
  return root;
}

const getElementToApplyCssVars = ({ query }) => {
  const rootElement = getIframeRoot();
  let element = rootElement;

  if (query) {
    element = rootElement.querySelector(query);
  }

  return element || rootElement;
}

const AddonCssVarTable = () => {
  const { path } = useStorybookState();
  const [ args ] = useArgs();
  const [ globals ] = useGlobals();

  const config = useParameter(ADDON_ID, null);
  const rows = Object.keys(config.vars).map((cssVarName) => {
    const cssVarValue = config.vars[cssVarName];

    return {
      name: cssVarName,
      description: `CSS var (${cssVarName})`,
      category: "",
      key: cssVarName,
      control: {
        type: 'color',
        value: cssVarValue,
        //presetColors,
      },
      table: {
        type: "CSS Custom Property",
        defaultValue: {
          summary: cssVarValue,
        },
      },
    };
  });

  let cssVariablesStates = { };

  const applyCssVariables = () => {
    const rootElement = getElementToApplyCssVars({ query: config.elementQuery });

    for (const [cssVariableName, cssVariableValue] of Object.entries(cssVariablesStates)) {
      rootElement.style.setProperty(cssVariableName, cssVariableValue);
    }
  };

  const resetCssVariables = () => {
    const rootElement = getElementToApplyCssVars({ query: config.elementQuery });

    for (const [cssVariableName, cssVariableValue] of Object.entries(cssVariablesStates)) {
      rootElement.style.removeProperty(cssVariableName);
    }
  }

  const resetArgs = () => {
    resetCssVariables();
    cssVariablesStates = { };
  };

  const updateArgs= (arg) => {
    const [cssVariableName] = Object.keys(arg);
    const cssVariableValue = arg[cssVariableName];

    // Do something when we change values
    cssVariablesStates[cssVariableName] = cssVariableValue;
    applyCssVariables();
  };

  return <ArgsTable
    {...{
      key: path, // resets state when switching stories
      compact: true,
      rows,
      args,
      globals,
      updateArgs,
      resetArgs,
      inAddonPanel: true,
    }}
  />;
};

const AddonCssVarPanel = () => {
  const config = useParameter(ADDON_ID, null);

  if (!config || Object.keys(config.vars).length === 0) {
    return <div>No story parameter defined</div>;
  }

  return <AddonCssVarTable />;
};

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS vars',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <AddonCssVarPanel />
      </AddonPanel>
    ),
  });
});
