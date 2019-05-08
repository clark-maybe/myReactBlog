import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import Logo from '../../../src/img/logo.jpg'

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class Home extends React.Component {
    render() {
        return (
            <div className={'homeStyle'}>
                <Layout>
                    <Header className="header">
                        <div className="logo"
                             style={{display: 'inline-block', boxShadow: '2px 2px 2px', marginRight: '20px'}}>
                            <img src={Logo} alt="logo" style={{width: '54px'}}/>
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['home']}
                            style={{lineHeight: '64px', display: 'inline-block'}}
                        >
                            <Menu.Item key="home">Home</Menu.Item>
                            <Menu.Item key="aboutMe">About me</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px', minHeight: '800px'}}>
                        <Layout style={{padding: '24px 0', background: '#fff', marginTop: '30px'}}>
                            <Sider width={200} style={{background: '#3da8ff'}}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{height: '100%'}}
                                >
                                    <SubMenu key="sub1" title={<span><Icon type="user"/>技术分享</span>}>
                                        <Menu.Item key="1">option1</Menu.Item>
                                        <Menu.Item key="2">option2</Menu.Item>
                                        <Menu.Item key="3">option3</Menu.Item>
                                        <Menu.Item key="4">option4</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="laptop"/>图书推荐</span>}>
                                        <Menu.Item key="5">option5</Menu.Item>
                                        <Menu.Item key="6">option6</Menu.Item>
                                        <Menu.Item key="7">option7</Menu.Item>
                                        <Menu.Item key="8">option8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="notification"/>个人感悟</span>}>
                                        <Menu.Item key="9">option9</Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                        <Menu.Item key="11">option11</Menu.Item>
                                        <Menu.Item key="12">option12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{padding: '0 24px', minHeight: 280}}>
                                Content
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Created by <span style={{fontWeight: 'bold', fontSize: '15px'}}>Clark</span> with React
                    </Footer>
                </Layout>
            </div>
        )
    }
}

export default Home;