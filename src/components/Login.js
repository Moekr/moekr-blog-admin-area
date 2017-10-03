import React from 'react';
import { connect } from 'dva';
import { Alert, Card, Button } from 'antd';
import styles from './login.css';
import LoginForm from './LoginForm';

function Login({ dispatch, hasLogin, alertVisible }) {
  function loginHandler(login) {
    dispatch({
      type: 'login/login',
      payload: login,
    });
  }

  function logoutHandler() {
    dispatch({
      type: 'login/logout',
    });
  }

  function closeAlertHandler() {
    dispatch({
      type: 'login/closeAlert',
    });
  }

  if (hasLogin) {
    return (
      <div className={styles.main}>
        <Card>
          <Alert type="success" showIcon message="已登陆！" description={`登陆时间：${new Date().toLocaleString()}`} />
          <Button type="danger" onClick={logoutHandler} icon="logout" className={styles['logout-button']}>登 出</Button>
        </Card>
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <LoginForm onLogin={loginHandler} onCloseAlert={closeAlertHandler} alertVisible={alertVisible} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const hasLogin = state.login.hasLogin;
  const alertVisible = state.login.alertVisible;
  return { hasLogin, alertVisible };
}

export default connect(mapStateToProps)(Login);
