import React from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import FormModal from './FormModal';
import styles from '../styles.css';

const FormItem = Form.Item;

class ArticleFormModal extends FormModal {
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { title, summary, content, alias, visible, category, tags } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };
    const categoryList = [];
    const tagList = [];
    this.props.categories.forEach((element) => {
      categoryList.push((
        <Select.Option value={element.id} key={element.id}>{element.name}</Select.Option>
      ));
    });
    this.props.tags.forEach((element) => {
      tagList.push((
        <Select.Option value={element.id} key={element.id}>{element.name}</Select.Option>
      ));
    });

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal title="文章编辑" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler} wrapClassName={styles.modalWarp} width="auto">
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="标题">
              {
                getFieldDecorator('title', {
                  initialValue: title,
                  rules: [{
                    required: true,
                    message: '请填写标题！',
                  }],
                })(<Input />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="摘要">
              {
                getFieldDecorator('summary', {
                  initialValue: summary,
                  rules: [{
                    required: true,
                    message: '请填写摘要！',
                  }],
                })(<Input.TextArea autosize />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="正文">
              {
                getFieldDecorator('content', {
                  initialValue: content,
                  rules: [{
                    required: true,
                    message: '请填写正文！',
                  }],
                })(<Input.TextArea autosize />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="别名">
              {
                getFieldDecorator('alias', {
                  initialValue: typeof alias === 'undefined' ? '' : alias,
                })(<Input />)
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
            <FormItem {...formItemLayout} label="分类">
              {
                getFieldDecorator('category', {
                  initialValue: typeof category === 'undefined' ? '' : category.id,
                  rules: [{
                    required: true,
                    message: '请选择分类！',
                  }],
                })(<Select>{categoryList}</Select>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="标签">
              {
                getFieldDecorator('tags', {
                  initialValue: typeof tags === 'undefined' ? [] : tags.map(tag => tag.id),
                  rules: [{
                    required: false,
                    type: 'array',
                  }],
                })(<Select mode="multiple">{tagList}</Select>)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ArticleFormModal);
