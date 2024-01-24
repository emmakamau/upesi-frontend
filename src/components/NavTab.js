import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function NavTab ({ tabsData }) {
  // Ensure there's a default tab selected if none is specified
  const defaultTab = tabsData.length > 0 ? tabsData[0].value : '';

  return (
    <Tabs value={defaultTab}>
      <TabsHeader>
        {tabsData.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tabsData.map(({ value, content }) => (
          <TabPanel key={value} value={value}>
            {content || 'Tab content goes here'}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
