import React, { useMemo } from "react";
import MaterialHorizontalTabs from "../MaterialTab";
import RenderIf from "../RenderIf";

export type TabType = {
  label: string;
  id: string;
  tabPanel: JSX.Element;
};

export type PropType = {
  requiredTabs: Array<TabType>;
  selectedTab: TabType;
  setSelectedTab: (value: TabType) => void;
  tabPerView: number;
};

const TabPanelSwitcher: React.FC<PropType> = (props) => {
  const {
    requiredTabs = [] as any,
    selectedTab = {} as TabType,
    setSelectedTab,
    tabPerView = 1,
  } = props;

  const renderSelectedPanel: JSX.Element = useMemo(() => {
    const selectedComponent: TabType = requiredTabs.find(
      (tab: TabType) => tab.id === selectedTab.id
    );

    return selectedComponent.tabPanel;
  }, [selectedTab.id]);

  return (
    <div>
      <div>
        <MaterialHorizontalTabs
          requiredTabs={requiredTabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabPerView={tabPerView}
        />
      </div>
      <div>{renderSelectedPanel}</div>
    </div>
  );
};

export default TabPanelSwitcher;
