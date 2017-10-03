import React from 'react';
import { connect } from 'dva';
import { Alert, Table, Popconfirm, Button } from 'antd';
import ArticleFormModal from './modal/ArticleFormModal';
import styles from './styles.css';

function Articles({ dispatch, articles: dataSource, categories, tags, hasLogin }) {
  function createHandler(article) {
    dispatch({
      type: 'articles/create',
      payload: article,
    });
  }

  function editHandler(id, article) {
    dispatch({
      type: 'articles/update',
      payload: { id, article },
    });
  }

  function deleteHandler(id) {
    dispatch({
      type: 'articles/remove',
      payload: id,
    });
  }

  function reloadHandler() {
    dispatch({
      type: 'articles/fetch',
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
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发表时间',
      dataIndex: 'createdAt',
      render: createdAt =>
        <span>{createdAt.year}年{createdAt.monthValue}月{createdAt.dayOfMonth}日</span>,
    },
    {
      title: '修改时间',
      dataIndex: 'modifiedAt',
      render: modifiedAt =>
        <span>{modifiedAt.year}年{modifiedAt.monthValue}月{modifiedAt.dayOfMonth}日</span>,
    },
    {
      title: '浏览量',
      dataIndex: 'views',
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: category => <span>{category.name}</span>,
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ArticleFormModal record={record} categories={categories} tags={tags} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </ArticleFormModal>
          <Popconfirm title="确认删除文章?" onConfirm={deleteHandler.bind(null, record.id)}>
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
        <ArticleFormModal record={{}} categories={categories} tags={tags} onOk={createHandler}>
          <Button type="primary" disabled={!hasLogin}>新文章</Button>
        </ArticleFormModal>
        <Button type="primary" onClick={reloadHandler} className={styles.reload} disabled={!hasLogin}>重新载入</Button>
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false} />
    </div>
  );
}

function mapStateToProps(state) {
  const articles = state.articles.list;
  const categories = state.categories.list;
  const tags = state.tags.list;
  const hasLogin = state.login.hasLogin;
  return { articles, categories, tags, hasLogin };
}

export default connect(mapStateToProps)(Articles);
