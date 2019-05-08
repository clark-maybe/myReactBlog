import React from 'react'
import {Layout, Menu, Icon, Carousel, Skeleton, BackTop, Drawer, Spin} from 'antd'
import history from '../../history'
import Logo from '../../../src/img/logo.jpg'
import banner1 from '../../../src/img/banner1.jpg'
import banner2 from '../../../src/img/banner2.jpg'
import banner3 from '../../../src/img/banner3.jpg'

import AboutMe from "../AboutMe";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.showMe = this.showMe.bind(this);
        this.renderDrawer = this.renderDrawer.bind(this);
        this.hiddenMe = this.hiddenMe.bind(this);
        this.getInitData = this.getInitData.bind(this);
        this.simulationLoading = this.simulationLoading.bind(this);
        this.state = {
            loading: true,
            visible: true,
            placement: 'right'
        }
    }

    componentDidMount() {
        this.simulationLoading();
        this.getInitData();
        document.body.scrollTop = document.documentElement.scrollTop = 200
    }

    getInitData(){
        fetch('./jsonData/init.json')
            .then((res) => {
                return res.json();
            })
            .then((common) => {
                //TODO 数据固化
            })
            .catch(() => {
                history.push('/');
            });
    }

    showMe() {
        this.setState({
            visible: true
        })
    }

    simulationLoading(){
       setTimeout(()=>{
           this.setState({
               loading: false
           })
       },500)
    }

    hiddenMe() {
        this.setState({
            visible: false
        })
    }

    renderDrawer() {
        return (
            <Drawer
                title={<span style={{fontWeight: 'bold'}}>about Me</span>}
                placement={this.state.placement}
                closable={true}
                onClose={this.hiddenMe}
                visible={this.state.visible}
                width={350}
            >
                <AboutMe/>
            </Drawer>
        )
    }

    render() {
        return (
            <div className={'homeStyle'}>
                <Spin spinning={this.state.loading} tip="try find something...">
                <Layout>
                    <Header className="header">
                        <div className="logo"
                             style={{display: 'inline-block', boxShadow: '2px 2px 2px', marginRight: '20px'}}>
                            <a onClick={this.showMe}>
                                <img src={Logo} alt="logo" style={{width: '54px'}}/>
                            </a>
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['home']}
                            style={{lineHeight: '64px', display: 'inline-block'}}
                        >
                            <Menu.Item key="home">Home</Menu.Item>
                        </Menu>
                    </Header>
                    <div style={{width: '100%', height: '1080px', marginTop: '1px', marginBottom: '30px'}}>
                        <Carousel autoplay>
                            <div>
                                <img src={banner1} style={{width: '100%'}}
                                     alt="banner"/>
                            </div>
                            <div>
                                <img src={banner2} style={{width: '100%'}}
                                     alt="banner"/>
                            </div>
                            <div>
                                <img src={banner3} style={{width: '100%'}}
                                     alt="banner"/>
                            </div>
                        </Carousel>
                    </div>
                    <Content style={{padding: '0 50px'}}>
                        <Layout style={{padding: '24px 0', background: '#fff'}}>
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
                                <Skeleton active/>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <BackTop visibilityHeight={100}/>
                        Created by <span style={{fontWeight: 'bold', fontSize: '15px'}}>Clark</span> with React
                    </Footer>
                </Layout>
                {this.renderDrawer()}
                </Spin>
            </div>
        )
    }
}

export default Home;