import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './header.css';
import Properties from '../utils/Properties';

function Header({ location }) {
  return (
    <div className={styles.header}>
      <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark" className={styles['header-menu']}>
        <Menu.Item key={`${Properties.path}/`}>
          <Link to={`${Properties.path}/`}><Icon type="user" />认证</Link>
        </Menu.Item>
        <Menu.Item key={`${Properties.path}/articles`}>
          <Link to={`${Properties.path}/articles`}><Icon type="file-text" />文章</Link>
        </Menu.Item>
        <Menu.Item key={`${Properties.path}/categories`}>
          <Link to={`${Properties.path}/categories`}><Icon type="bars" />分类</Link>
        </Menu.Item>
        <Menu.Item key={`${Properties.path}/tags`}>
          <Link to={`${Properties.path}/tags`}><Icon type="tag" />标签</Link>
        </Menu.Item>
        <Menu.Item key={`${Properties.path}/settings`}>
          <Link to={`${Properties.path}/settings`}><Icon type="setting" />设置</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Header;
