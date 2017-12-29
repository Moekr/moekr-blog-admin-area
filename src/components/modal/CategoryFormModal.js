import React from 'react';
import { Modal, Form, Input, Slider, Switch } from 'antd';
import FormModal from './FormModal';
import styles from '../styles.css';

const FormItem = Form.Item;

class CategoryFormModal extends FormModal {
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, name, level, visible } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal title="编辑分类" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler} wrapClassName={styles.modalWarp} width="auto">
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
            <FormItem {...formItemLayout} label="名称">
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{
                    required: true,
                    message: '请填写名称！',
                  }],
                })(<Input />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="级别">
              {
                getFieldDecorator('level', {
                  initialValue: level,
                })(<Slider />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="可见">
              {
                getFieldDecorator('visible', {
                  valuePropName: 'checked',
                  initialValue: visible,
                })(<Switch />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CategoryFormModal);
