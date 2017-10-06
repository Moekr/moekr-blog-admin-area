import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './header.css';
import Const from '../utils/Const';

function Header({ location }) {
  return (
    <div className={styles.header}>
      <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark" className={styles['header-menu']}>
        <Menu.Item key={`${Const.path}/`}>
          <Link to={`${Const.path}/`}><Icon type="user" />认证</Link>
        </Menu.Item>
        <Menu.Item key={`${Const.path}/articles`}>
          <Link to={`${Const.path}/articles`}><Icon type="file-text" />文章</Link>
        </Menu.Item>
        <Menu.Item key={`${Const.path}/categories`}>
          <Link to={`${Const.path}/categories`}><Icon type="bars" />分类</Link>
        </Menu.Item>
        <Menu.Item key={`${Const.path}/tags`}>
          <Link to={`${Const.path}/tags`}><Icon type="tag" />标签</Link>
        </Menu.Item>
        <Menu.Item key={`${Const.path}/properties`}>
          <Link to={`${Const.path}/properties`}><Icon type="setting" />设置</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Header;
