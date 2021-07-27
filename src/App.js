import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


import Results from './components/Results';

import logo from './Logo_ML@2x.png.png.png';
import iconSerach from './images/ic_Search.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,  Container, FormControl, Image} from 'react-bootstrap';


class App extends Component{

    constructor (props) {
        super(props)
        this.state = {
            qSearch: ''
        }
        this.searchChange = this.searchChange.bind(this);
    }



    searchChange(e){
        this.setState({qSearch: e.target.value })
    }

    render(){
        return (
                <div className="">
                    <Navbar className="nav-header">
                        <Container>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <div className="m-2">
                                    <Image src={logo} className="nav-logo"/>
                                </div>
                                <div className="input-group">
                                    <FormControl
                                        type="search"
                                        placeholder="Nunca dejes de buscar "
                                        className=""
                                        aria-label="Search"
                                        onChange={this.searchChange}
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text" id="basic-addon2">.
                                          <Image src={iconSerach}/>
                                      </span>
                                    </div>
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div className="main">
                        <Container>
                            <br/>
                            <Router>
                                <Switch>
                                    <Route path="/" exact>
                                        <Results qSearch={this.state.qSearch}/>
                                    </Route>
                                    <Route path="/contacto">
                                        <h1>Contacto</h1>
                                    </Route>
                                </Switch>
                            </Router>
                        </Container>
                    </div>
                </div>

        );
    }
}

export default App;
