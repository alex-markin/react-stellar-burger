// импорт стилей
import styles from './tabs.module.css';

// импорт компонентов
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// импорт хуков
import { useSelector } from "react-redux";

// импорт функций useSelector
import { getTabsNavigation } from "../../services/store-selectors";

type TabDataProps = {
  tabData: {
    label: string;
    value: string;
  }[];
  onTabClick: (value: string) => void;
}

function Tabs({ tabData, onTabClick }: TabDataProps) {
  const { activeTab } = useSelector(getTabsNavigation); // активный таб

  return (
    <div className={styles.tabsContainer}>
      {tabData.map((tab) => (
        <Tab key={tab.value} value={tab.value} active={activeTab === tab.value} onClick={() => onTabClick(tab.value)}>
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}

export default Tabs;
