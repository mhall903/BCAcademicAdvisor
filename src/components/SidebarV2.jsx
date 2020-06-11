import { Layout, Menu } from 'antd';
import {
  ContactsOutlined,
  BuildOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import React from "react";
import Router from '../Router';
import Degree from "./DegreePage"
import Login from "./LoginPage"
import Pdf from "./Pdf"

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
    toDashboard: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleMenuClick = event => {
    console.log(event.key)

    this.setState({toDashboard:event.key});
    
  }





  render() {
    let tt = <Login></Login>;
    console.log(this.state.toDashboard)
    if(this.state.toDashboard === "1"){
      console.log(this.state.toDashboard);
      tt = <Degree></Degree>   
    }
    else if(this.state.toDashboard ==="2"){
               console.log(this.state.toDashboard);

      tt = <Login></Login>
    }
    else if(this.state.toDashboard === "3"){
        console.log(this.state.toDashboard);
      tt = <Pdf></Pdf>
    }
    
      
    
    

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          
          <div className="logo" />
          
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" onClick={this.handleMenuClick}>>
            <Menu.Item key="2" icon={<ContactsOutlined />}>
              Login
            </Menu.Item>
            <Menu.Item key="1" icon={<BuildOutlined />}>
              Degree
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
              Transcript
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {tt}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>BC advisor</Footer>
        </Layout>
      </Layout>
    );
  }
  
}

 

