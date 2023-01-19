import React, { useState } from "react";

import { addons, types } from "@storybook/addons";
import {
  useParameter,
  useStorybookState,
  useArgs,
  useGlobals,
} from "@storybook/api";
import { AddonPanel, ArgsTable } from "@storybook/components";

const ADDON_ID = "cssVars";
const PANEL_ID = `${ADDON_ID}/panel`;

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const getIframeRoot = () => {
  const iframe = document.querySelector("iframe#storybook-preview-iframe");
  const root = iframe.contentWindow.document.querySelector("#root");
  return root;
};

const getElementToApplyCssVars = ({ query }) => {
  const rootElement = getIframeRoot();
  let element = rootElement;

  if (query) {
    element = rootElement.querySelector(query);
  }

  return element || rootElement;
};

const AddonCssVarTable = () => {
  const { path } = useStorybookState();
  const [args] = useArgs();
  const [globals] = useGlobals();

  const config = useParameter(ADDON_ID, null);
  const rows = Object.keys(config.vars).map((cssVarName) => {
    const cssConfig = config.vars[cssVarName];
    const {
      value: cssVarValue,
      description: cssVarDescription = `CSS var (${cssVarName})`,
      category: cssVarCategory,
      subcategory: cssVarSubcategory,
      control: cssVarControl = {
        type: 'color',
        value: cssVarValue
      }
    } = cssConfig;

    return {
      name: cssVarName,
      description: cssVarDescription,
      category: "",
      type: { name: 'string', required: false },
      defaultValue: cssVarValue,
      key: cssVarName,
      control: cssVarControl,
      table: {
        type: "CSS Custom Property",
        category: cssVarCategory,
        subcategory: cssVarSubcategory,
        defaultValue: {
          summary: cssVarValue,
        },
      },
    };
  });

  const [getRows, setRows] = useState([]);

  const applyCssVariables = (cssVariableName, cssVariableValue) => {
    const rootElement = getElementToApplyCssVars({
      query: config.elementQuery,
    });

    rootElement.style.setProperty(cssVariableName, cssVariableValue);
  };

  const resetCssVariables = () => {
    const rootElement = getElementToApplyCssVars({
      query: config.elementQuery,
    });

    for (const row of rows) {
      rootElement.style.removeProperty(row.name);
    }

    setRows([]);
    setTimeout(() => setRows(clone(rows)));
  };

  const resetArgs = () => {
    resetCssVariables();
  };

  const updateArgs = (arg) => {
    const [cssVariableName] = Object.keys(arg);
    const cssVariableValue = arg[cssVariableName];

    applyCssVariables(cssVariableName, cssVariableValue);
  };

  setTimeout(() => setRows(clone(rows)), 250);

  return (
    <ArgsTable
      key={path}
      compact={false}
      inAddonPanel={true}
      rows={getRows}
      args={args}
      globals={globals}
      updateArgs={updateArgs}
      resetArgs={resetArgs}
    />
  );
};

const AddonCssVarPanel = () => {
  const config = useParameter(ADDON_ID, null);

  if (!config || Object.keys(config.vars).length === 0) {
    const divStyle = {
      paddingTop: '1rem',
      textAlign: 'center',
    };

    return (
      <div style={divStyle}>
        No story parameter defined: we can't display the related CSS custom
        properties (a.k.a. CSS vars)
      </div>
    );
  }

  return <AddonCssVarTable />;
};

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title() {
      const config = useParameter(ADDON_ID, null);
      const count = (config && Object.keys(config.vars).length) || 0;
      const suffix = count === 0 ? "" : ` (${count})`;
      return `CSS vars${suffix}`;
    },
    render: ({ active, key }) => {
      if (!active || !api.getCurrentStoryData()) {
        return null;
      }

      return (
        <AddonPanel key={key} active={active}>
          <AddonCssVarPanel />
        </AddonPanel>
      );
    },
  });
});
