import React from 'react'
import {Layout, Menu, Icon, BackTop, Drawer, Spin, Modal} from 'antd'
import {Switch, Route, Link} from 'react-router-dom'
import Loadable from 'react-loadable';
import history from '../../history'
import Logo from '../../../src/img/logo.jpg'
import AboutMe from "../AboutMe";
import NoMatch from '../NoMatch'
import HomeBanner from '../HomeBanner'
import {getData} from '../../until/commonFun'

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


const WorkExperience = Loadable({
    loader: () => import('../WorkExperience'),
    loading: MyLoadingComponent,
    timeout: 1000
});

const FlowChart = Loadable({
    loader: () => import('../analysis/FlowChart'),
    loading: MyLoadingComponent,
    timeout: 1000
});

function MyLoadingComponent(props) {
    if (props.error) {
        Modal.info({
            title: '系统升级提醒',
            content: '系统已经升级，需要重新加载系统',
            onOk() {
                window.location.replace(window.location.href);
            },
        });
        return <div
            style={{height: 200, textAlign: "center", lineHeight: "200px", color: "red"}}>系统已升级，请刷新页面或重新打开</div>;
    } else if (props.pastDelay) {
        return <div style={{top: '50%', left: '50%', width: '100%', height: '100%', position: 'absolute'}}>
            <Icon type="loading" size='lg'/>
        </div>;
    } else {
        return null;
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.showMe = this.showMe.bind(this);
        this.renderDrawer = this.renderDrawer.bind(this);
        this.hiddenMe = this.hiddenMe.bind(this);
        this.simulationLoading = this.simulationLoading.bind(this);
        this.state = {
            loading: true,
            visible: true,
            placement: 'right',
            siderFlag: 'block'
        }
    }

    componentDidMount() {
        this.simulationLoading();
        // getData('./jsonData/init.json', () => {
        //     Modal.error({
        //         title: 'no data'
        //     })
        // });
        history.push('/myReactBlog');
        document.body.scrollTop = document.documentElement.scrollTop = 200;
    }

    showMe() {
        this.setState({
            visible: true
        })
    }

    simulationLoading() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 500);
        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 5000)
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
                                <Menu.Item key="home">
                                    <Link to={'/myReactBlog'}>
                                        Home
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="WorkExperience">
                                    <Link to={'/myReactBlog/workExperience'}>
                                        workExperience
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <HomeBanner
                            siderFlag={this.state.siderFlag}
                        />
                        <Content style={{padding: '0 50px', minHeight: '785px', marginTop: '15px'}}>
                            <Layout style={{padding: '24px 0', background: '#fff'}}>
                                <Sider width={200} style={{background: '#3da8ff', display: this.state.siderFlag}}>
                                    <Menu
                                        mode="inline"
                                        // defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        style={{height: '100%'}}
                                    >
                                        <SubMenu key="sub1" title={<span><Icon type="notification"/>数据统计</span>}>
                                            <Menu.Item key="first">
                                                <Link to={'/myReactBlog/analysis/flowChart'}>
                                                    流程图
                                                </Link>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                </Sider>
                                <Content style={{padding: '0 24px', minHeight: 280}}>
                                    <Switch>
                                        <Route path="/myReactBlog/workExperience" render={(props) => (<WorkExperience {...props}/>)}/>
                                        <Route path="/myReactBlog/analysis/flowChart" render={(props) => (<FlowChart {...props}/>)}/>
                                        <Route component={NoMatch}/>
                                    </Switch>
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