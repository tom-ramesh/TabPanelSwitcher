import React, { useEffect, useRef, useState } from "react";
import { joinClass } from "../utils/utils";
import { PropType, TabType } from "../TabPanelSwitcher";
import "./index.scss";

const MaterialHorizontalTabs: React.FC<PropType> = (props) => {
  const {
    requiredTabs = [] as any,
    selectedTab = {} as TabType,
    setSelectedTab,
    tabPerView = 1,
  } = props;

  const noOfTabs = requiredTabs.length;

  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const endIndex = startIndex + tabPerView;

  const selectionRef = useRef({
    prevStartIndex: 0,
  });

  const tabsToView = requiredTabs.slice(startIndex, endIndex);

  useEffect(() => {
    const { prevStartIndex } = selectionRef.current;

    if (prevStartIndex > startIndex) {
      //selecting last tab while going to previous page
      setSelectedTab(tabsToView[tabPerView - 1]);
      setSelectedIndex(endIndex);
    } else if (prevStartIndex < startIndex) {
      //selecting first tab while going to next page
      setSelectedTab(tabsToView[0]);
      setSelectedIndex(startIndex + 1);
    }
  }, [startIndex]);

  const findNearestStartIndex = () => {
    const selectedTabIndex = requiredTabs.findIndex(
      (tab: TabType) => tab?.id === selectedTab.id
    );

    const quotient = Math.floor(selectedTabIndex / tabPerView);

    const nearestNumber = tabPerView * quotient;

    selectionRef.current = {
      prevStartIndex: nearestNumber,
    };

    if (nearestNumber >= 0) {
      setStartIndex(nearestNumber);
      setSelectedIndex(selectedTabIndex + 1);
    }
  };

  useEffect(() => {
    findNearestStartIndex();
  }, [requiredTabs]);

  const handleNext = () => {
    selectionRef.current = {
      prevStartIndex: startIndex,
    };

    if (selectedIndex % tabPerView === 0 && endIndex < noOfTabs) {
      //changing to next page if selection is last tab
      setStartIndex((prev) => prev + tabPerView);
    } else if (
      selectedIndex <= endIndex - 1 &&
      selectedIndex + 1 <= requiredTabs.length
    ) {
      //changing to latter tab
      const selectedTabIndex = tabsToView.findIndex(
        (tab: TabType) => tab?.id === selectedTab.id
      );

      setSelectedTab(tabsToView[selectedTabIndex + 1]);
    }
  };

  const handlePrevious = () => {
    selectionRef.current = {
      prevStartIndex: startIndex,
    };

    if (selectedIndex === startIndex + 1 && startIndex > 0) {
      //changing to previous page if selection is first tab
      setStartIndex((prev) => prev - tabPerView);
    } else if (
      selectedIndex <= endIndex &&
      startIndex >= 0 &&
      selectedIndex !== 1
    ) {
      //changing to former tab
      const selectedTabIndex = tabsToView.findIndex(
        (tab: TabType) => tab?.id === selectedTab.id
      );

      setSelectedTab(tabsToView[selectedTabIndex - 1]);
    }
  };

  return (
    <div>
      <div className="materialHorizontalTabs">
        <div
          className={`materialHorizontalTabs__icon-${
            selectedIndex === 1 ? "disabled" : "previous"
          }`}
          onClick={handlePrevious}
        >
          {"<"}
        </div>
        <div className={"materialHorizontalTabs__column-container"}>
          <div className={"materialHorizontalTabs__tabs-container"}>
            {tabsToView.map((tabData: TabType, index: number) => (
              <div
                key={tabData?.id}
                className={joinClass(
                  `materialHorizontalTabs__${
                    selectedTab?.id === tabData?.id ? "tab-selected" : "tab"
                  }`,
                  tabsToView.length < tabPerView
                    ? "materialHorizontalTabs__shortTab"
                    : ""
                )}
                onClick={() => {
                  setSelectedTab(tabData);
                  setSelectedIndex(startIndex + (index + 1));
                }}
              >
                <label>{tabData.label}</label>
              </div>
            ))}
          </div>
          <div className={"materialHorizontalTabs__indicator-bar"}>
            <div
              style={{
                width: `${(selectedIndex / noOfTabs) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div
          className={`materialHorizontalTabs__icon-${
            selectedIndex === noOfTabs ? "disabled" : "next"
          }`}
          onClick={handleNext}
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default MaterialHorizontalTabs;
