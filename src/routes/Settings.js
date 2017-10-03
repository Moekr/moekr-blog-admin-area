import React from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import styles from './settings.css';

function IndexPage() {
  return (
    <div className={styles.main}>
      <Alert type="error" showIcon message="建设中" description="页面建设中" className={styles.alert} />
    </div>
  );
}

export default connect()(IndexPage);
