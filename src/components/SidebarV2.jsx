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
  constructor(props) {
    super(props);

    this.updateClasses = this.updateClasses.bind(this);
    this.state = {
      collapsed: true,
      toDashboard: false,
      classResult: null
    };
  }
  


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleMenuClick = event => {
    console.log(event.key)

    this.setState({toDashboard:event.key});
    
  }



  updateClasses(results) {
    this.setState({classResult: results});
  }

  render() {
    let tt = <Login></Login>;
    if(this.state.toDashboard === "1"){
      console.log(this.state.toDashboard);
      console.log("Class results? ");
      console.log(this.state.classResult);
      tt = <Degree classes={this.state.classResult}></Degree>   
    }
    else if(this.state.toDashboard ==="2"){
               console.log(this.state.toDashboard);

      tt = <Login></Login>
    }
    else if(this.state.toDashboard === "3"){
        console.log(this.state.toDashboard);
      tt = <Pdf classes={this.updateClasses}/>
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

 

