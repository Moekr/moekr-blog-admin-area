import React from 'react';
import { connect } from 'dva';
import { Alert, Table, Popconfirm, Button } from 'antd';
import RedirectionFormModal from './modal/RedirectionFormModal';
import styles from './styles.css';

function Redirections({ dispatch, redirections: dataSource, hasLogin }) {
  function editHandler(redirection) {
    dispatch({
      type: 'redirections/createOrUpdate',
      payload: redirection,
    });
  }

  function deleteHandler(id) {
    dispatch({
      type: 'redirections/remove',
      payload: id,
    });
  }

  function reloadHandler() {
    dispatch({
      type: 'redirections/fetch',
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
      title: '访问量',
      dataIndex: 'views',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <RedirectionFormModal record={record} onOk={editHandler}>
            <a>编辑</a>
          </RedirectionFormModal>
          <Popconfirm title="确认删除短网址?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const expandedRowRender = record => <p>{record.location}</p>;

  return (
    <div className={styles.main}>
      {alertHandler(!hasLogin)}
      <div className={styles.create}>
        <RedirectionFormModal record={{}} onOk={editHandler}>
          <Button type="primary" disabled={!hasLogin}>新短网址</Button>
        </RedirectionFormModal>
        <Button type="primary" onClick={reloadHandler} className={styles.reload} disabled={!hasLogin}>重新载入</Button>
      </div>
      <Table expandedRowRender={expandedRowRender} columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false} />
    </div>
  );
}

function mapStateToProps(state) {
  const redirections = state.redirections.list;
  const hasLogin = state.login.hasLogin;
  return { redirections, hasLogin };
}

export default connect(mapStateToProps)(Redirections);
