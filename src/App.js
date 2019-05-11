import React from 'react';
import './App.css';
import {ConfigProvider} from 'antd'
import {Route, Router} from 'react-router-dom'
import Home from './container/Home/Home'
import history from './history'

class App extends React.Component {
    render() {
        return (
            <ConfigProvider>
                <Router history={history}>
                    <div style={{height: '100%', width: '100%'}}>
                        <Route path="/" component={Home}/>
                    </div>
                </Router>
            </ConfigProvider>
        )
    }
}

export default App;
