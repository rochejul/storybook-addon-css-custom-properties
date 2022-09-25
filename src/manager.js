import React from 'react';

import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

const ADDON_ID = 'cssVars';
const PANEL_ID = `${ADDON_ID}/panel`;

// give a unique name for the panel
const MyPanel = () => {
  const value = useParameter(ADDON_ID, null);
  const item = value ? value.data : 'No story parameter defined';
  return <div>{item}</div>;
};

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'CSS vars',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <MyPanel />
      </AddonPanel>
    ),
  });
});
