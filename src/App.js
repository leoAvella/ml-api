import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import ReactDOM from 'react-dom';
import Results from './components/Results';
import Item from './components/Item';
import Items from './components/Items';


import logo from './Logo_ML@2x.png.png.png';
import iconSerach from './images/ic_Search.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,  Container, FormControl, Image, Form} from 'react-bootstrap';


class App extends Component{

    constructor (props, context) {
        super(props, context)

        this.state = {
            qSearch: '',
            form:{
                q: ''
            }

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.setState({form:{ q: this.useQuery()} })
    }

    handleSubmit(e) {
       console.log("SUBMIT-->>>");
       this.setState({qSearch: this.state.form.qSearch})
       // e.preventDefault();
    }

    useQuery() {
        const searchParams =  new URLSearchParams(document.location.search.substring(1));
        return (searchParams.get("q")== null) ? '' : searchParams.get("q");
    }


    handleChange =  async (e) => {
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
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

                                <Form action="/items" className="form-search" onSubmit={this.handleSubmit}>
                                        <div className="input-group">
                                            <FormControl
                                                type="search"
                                                placeholder="Nunca dejes de buscar "
                                                className=""
                                                aria-label="Search"
                                                onChange={this.handleChange}
                                                value={this.state.form.q}
                                                name="q"
                                                id="q"
                                            />
                                            <div className="input-group-append">
                                          <span className="input-group-text" id="basic-addon2">.
                                              <Image src={iconSerach}/>
                                          </span>
                                            </div>
                                        </div>
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div className="main">
                        <Container>
                            <br/>
                            <Router>
                                <Route path="/"exact>
                                    <div></div>
                                </Route>
                                <Route path="/items">
                                    <Items q={this.state.qSearch}/>
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
