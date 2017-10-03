import React, { Component } from 'react';
import { Form, Icon, Input, Button, Alert, Card } from 'antd';
import styles from './login.css';

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  submitHandler = () => {
    const { onLogin } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onLogin(values);
      }
    });
  };

  alertHandler = (alertVisible) => {
    if (alertVisible) {
      const { onCloseAlert } = this.props;
      return (
        <Alert message="登录失败" description="错误的用户名或密码" type="error" closable onClose={onCloseAlert} />
      );
    }
  };

  render() {
    const { alertVisible } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles['login-form']}>
        <div className={styles.alert}>
          {this.alertHandler(alertVisible)}
        </div>
        <Card className={styles.card}>
          <Form className={styles['login-inline-form']}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input addonBefore={<Icon type="user" />} placeholder="用户名" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />,
              )}
            </FormItem>
            <FormItem style={{ marginBottom: 0 }}>
              <Button type="primary" className={styles['login-form-button']} onClick={this.submitHandler}>登 录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
