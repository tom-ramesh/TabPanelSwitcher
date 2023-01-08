import React, { useState } from "react";
import RedBox from "./components/utils/RedBox";
import TabPanelSwitcher, { TabType } from "./components/TabPanelSwitcher";
import "./index.scss";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>({
    label: "Test 1",
    id: "test_1",
    tabPanel: <div>t1</div>,
  });

  const tabs = [
    { label: "Test 1", id: "test_1", tabPanel: <div>t1</div> },
    { label: "Test 2", id: "test_2", tabPanel: <RedBox /> },
    { label: "Test 3", id: "test_3", tabPanel: <div>t3</div> },
    { label: "Test 4", id: "test_4", tabPanel: <div>t4</div> },
    { label: "Test 5", id: "test_5", tabPanel: <div>t5</div> },
  ];

  return (
    <div>
      <TabPanelSwitcher
        requiredTabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabPerView={3}
      />
    </div>
  );
};

export default App;
