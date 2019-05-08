import React from 'react';
import './App.css';
import {Route, Router} from 'react-router-dom'
import history from './history'
import Home from './container/Home/Home'

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div style={{height:'100%', width:'100%'}}>
                    <Route exact path="/" component={Home}/>
                </div>
            </Router>
        )
    }
}

export default App;
