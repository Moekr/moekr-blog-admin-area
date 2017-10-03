import React from 'react';
import { connect } from 'dva';
import styles from './layout.css';
import Header from '../components/Header';

function Layout({ children, location }) {
  return (
    <div className={styles.content}>
      <Header location={location} />
      {children}
    </div>
  );
}

export default connect()(Layout);
