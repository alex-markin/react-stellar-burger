import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabsStyles.module.css';
import PropTypes from 'prop-types';


function Tabs({ tabData }) {
  const [current, setCurrent] = useState(tabData[0]?.value);
  return (
    <div className={styles.tabsContainer}>
      {tabData.map((tab) => (
        <Tab key={tab.value} value={tab.value} active={current === tab.value} onClick={setCurrent}>
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
