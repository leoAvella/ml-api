import React, {Component} from 'react';

import logo from './Logo_ML@2x.png.png.png';

import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Modal,ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Navbar,  Container, NavDropdown, Button, Form, FormControl, Image} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faSearch);

const url = "https://api.mercadolibre.com/sites/MLA/search?q=";

class App extends Component{

  state = {
      data:[],
      qSearch: ''
  }

  getSearch(qSearch) {
    axios.get(url+qSearch).then(response =>{
      console.log(response.data);
    })
  }


  searchChange(e){
      const qSearch = e.target.value;
      //this.getSearch(qSearch);
      axios.get(url+qSearch).then(response =>{
          console.log(response.data);
      })
      //if ( qSearch.trim() != ''){   this.getSearch(qSearch);
  }

  componentDidMount(){

  }


  render(){
      return (
          <div className="App">

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
                                      <FontAwesomeIcon icon={["fas", "search"]} />
                                  </span>
                              </div>
                          </div>

                      </Navbar.Collapse>

                  </Container>
              </Navbar>

          </div>
      );
  }
}

export default App;
