import React from 'react';
import { Modal, Form, Input } from 'antd';
import FormModal from './FormModal';
import styles from '../styles.css';

const FormItem = Form.Item;

class RedirectionFormModal extends FormModal {
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, location } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal title="编辑短网址" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler} wrapClassName={styles.modalWarp} width="auto">
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="ID">
              {
                getFieldDecorator('id', {
                  initialValue: id,
                  rules: [{
                    required: true,
                    message: '请填写ID！',
                  }],
                })(<Input />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="网址">
              {
                getFieldDecorator('location', {
                  initialValue: location,
                  rules: [{
                    required: true,
                    message: '请填写网址！',
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

export default Form.create()(RedirectionFormModal);
