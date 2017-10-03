import React from 'react';
import { connect } from 'dva';
import { Alert, Table, Popconfirm, Button } from 'antd';
import styles from './styles.css';
import TagFormModal from './modal/TagFormModal';

function Tags({ dispatch, tags: dataSource, hasLogin }) {
  function editHandler(tag) {
    dispatch({
      type: 'tags/update',
      payload: tag,
    });
  }

  function deleteHandler(id) {
    dispatch({
      type: 'tags/remove',
      payload: id,
    });
  }

  function reloadHandler() {
    dispatch({
      type: 'tags/fetch',
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
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <TagFormModal record={record} onOk={editHandler}>
            <a>编辑</a>
          </TagFormModal>
          <Popconfirm title="确认删除标签?" onConfirm={deleteHandler.bind(null, record.id)}>
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
        <TagFormModal record={{}} onOk={editHandler}>
          <Button type="primary" disabled={!hasLogin}>新标签</Button>
        </TagFormModal>
        <Button type="primary" onClick={reloadHandler} className={styles.reload} disabled={!hasLogin}>重新载入</Button>
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false} />
    </div>
  );
}

function mapStateToProps(state) {
  const tags = state.tags.list;
  const hasLogin = state.login.hasLogin;
  return { tags, hasLogin };
}

export default connect(mapStateToProps)(Tags);
