import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import React from "react";
import Router from '../Router';

/**
 * 
 * Render Route inside the Sidebar, now every page will share the same sidebar
 * 
 * Might still need some change on conditional render, since we don't want 
 * 
 * page like 404 having the sidebar...
 * 
 */

const { Header, Content, Footer, Sider } = Layout;

 export default class SidebarV2 extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Router></Router>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>BC advisor</Footer>
        </Layout>
      </Layout>
    );
  }
}


