import React from 'react';
import { connect } from 'dva';
import { Alert, Table, Button } from 'antd';
import PropertyFormModal from './modal/PropertyFormModal';
import styles from './styles.css';

function Properties({ dispatch, properties: dataSource, hasLogin }) {
  function editHandler(id, property) {
    dispatch({
      type: 'properties/update',
      payload: { id, property },
    });
  }

  function reloadHandler() {
    dispatch({
      type: 'properties/fetch',
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
          <PropertyFormModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </PropertyFormModal>
        </span>
      ),
    },
  ];

  const expandedRowRender = record => <p>{record.value}</p>;

  return (
    <div className={styles.main}>
      {alertHandler(!hasLogin)}
      <div className={styles.create}>
        <Button type="primary" disabled>不可用</Button>
        <Button type="primary" onClick={reloadHandler} className={styles.reload} disabled={!hasLogin}>重新载入</Button>
      </div>
      <Table expandedRowRender={expandedRowRender} columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false} />
    </div>
  );
}

function mapStateToProps(state) {
  const properties = state.properties.list;
  const hasLogin = state.login.hasLogin;
  return { properties, hasLogin };
}

export default connect(mapStateToProps)(Properties);
