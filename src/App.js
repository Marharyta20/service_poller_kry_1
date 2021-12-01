import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ServicesList from './ServicesList';
import ServiceEdit from './ServiceEdit';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/services' exact={true} component={ServicesList}/>
                    <Route path='/services/:id' component={ServiceEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;