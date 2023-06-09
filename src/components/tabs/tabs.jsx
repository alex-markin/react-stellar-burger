// импорт библиотек
import PropTypes from 'prop-types';

// импорт стилей
import styles from './tabs.module.css';

// импорт компонентов
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// импорт хуков
import { useSelector } from "react-redux";

// импорт функций useSelector
import { getTabsNavigation } from "../../services/store-selectors.js";

function Tabs({ tabData, onTabClick }) {
  const { activeTab } = useSelector(getTabsNavigation); // активный таб

  return (
    <div className={styles.tabsContainer}>
      {tabData.map((tab) => (
        <Tab key={tab.value} value={tab.value} active={activeTab === tab.value}  onClick={() => onTabClick(tab.value)}>
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Tabs;
