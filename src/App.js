import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from "react-router-dom";

import NavbarComponent from './components/Navbar';
import Items from './components/Items';
import Item from './components/Item';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


class App extends Component{

    render(){
        return (
                <div className="">
                    <NavbarComponent/>
                    <div className="main">
                        <Container>
                            <br/>
                            <Router>
                                <Route path="/" exact>
                                    <div></div>
                                </Route>
                                <Route path="/items">
                                    <Items/>
                                </Route>
                                <Route path="/item/:id" component={withRouter(Item)}/>
                            </Router>
                        </Container>
                    </div>
                </div>
        );
    }
}

export default App;
