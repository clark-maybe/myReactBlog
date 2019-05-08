import React from 'react';
import './App.css';
import {Route, Router} from 'react-router-dom'
import history from './history'
import Home from './container/Home/Home'

class App extends React.Component {
    render() {
        return (
        <Home/>
        )
    }
}

export default App;
