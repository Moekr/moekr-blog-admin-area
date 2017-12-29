import React from 'react';
import { connect } from 'dva';
import { Alert, Table, Popconfirm, Button } from 'antd';
import CategoryFormModal from './modal/CategoryFormModal';
import styles from './styles.css';

function Articles({ dispatch, categories: dataSource, hasLogin }) {
  function editHandler(category) {
    dispatch({
      type: 'categories/update',
      payload: category,
    });
  }

  function deleteHandler(id) {
    dispatch({
      type: 'categories/remove',
      payload: id,
    });
  }

  function reloadHandler() {
    dispatch({
      type: 'categories/fetch',
    });
  }

  function alertHandler(visible) {
    if (visible) {
      return (
        <Alert type="error" showIcon message="需要认证" description="必须登录才能继续浏览和编辑内容！" className={styles.alert} />
      );
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '级别',
      dataIndex: 'level',
    },
    {
      title: '可见',
      dataIndex: 'visible',
      render: visible =>
        <span>{visible ? '是' : '否'}</span>,
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <CategoryFormModal record={record} onOk={editHandler}>
            <a>编辑</a>
          </CategoryFormModal>
          <Popconfirm title="分类下所有文章都将被删除，确认删除分类?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.main}>
      {alertHandler(!hasLogin)}
      <div className={styles.create}>
        <CategoryFormModal record={{ level: 50, visible: true }} onOk={editHandler}>
          <Button type="primary" disabled={!hasLogin}>新分类</Button>
        </CategoryFormModal>
        <Button type="primary" onClick={reloadHandler} className={styles.reload} disabled={!hasLogin}>重新载入</Button>
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false} />
    </div>
  );
}

function mapStateToProps(state) {
  const categories = state.categories.list;
  const hasLogin = state.login.hasLogin;
  return { categories, hasLogin };
}

export default connect(mapStateToProps)(Articles);
