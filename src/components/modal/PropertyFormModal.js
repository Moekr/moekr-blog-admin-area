import React from 'react';
import { Modal, Form, Input } from 'antd';
import FormModal from './FormModal';
import styles from '../styles.css';

const FormItem = Form.Item;

class PropertyFormModal extends FormModal {
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, name, value } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal title="编辑设置" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler} wrapClassName={styles.modalWarp} width="auto">
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="ID">
              {
                getFieldDecorator('id', {
                  initialValue: id,
                })(<Input disabled />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="名称">
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input disabled />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="内容">
              {
                getFieldDecorator('value', {
                  initialValue: value,
                  rules: [{
                    required: true,
                    message: '请填写内容！',
                  }],
                })(<Input.TextArea autosize />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(PropertyFormModal);
