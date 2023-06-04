import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";



function Tabs({ tabData, onTabClick }) {
  const activeTab = useSelector((store) => store.tabsNavigation.activeTab); // активный таб

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
    }),
  ).isRequired,
};

export default Tabs;
