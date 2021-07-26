import React, {Component} from 'react';

import logo from './Logo_ML@2x.png.png.png';

import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,  Container, FormControl, Image} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faSearch);

const url = "http://localhost:8888/api/items";

class App extends Component{

    constructor (props) {
        super(props)
        this.state = {
            data:{items:[], categories: []},
            qSearch: ''
        }
        this.searchChange = this.searchChange.bind(this);
    }


  headers(){
        return {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
  }

  getSearch(qSearch) {
    axios.get(url+"?q="+qSearch, {headers: this.headers()}).then(response =>{
        this.setState({data: response.data});
        console.log("....",this.state.data.categories);
    }).catch(error=>{
        console.log(error);
    })
  }



  searchChange(e){
      this.getSearch(e.target.value);
  }

  componentDidMount(){
  }


  render(){
      return (
          <div className="main">

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
              <div className="main">

                  <Container>
                      <br/>
                      <p className="breadcrumb">{
                          this.state.data.categories.map( category => {
                              return(<span key={category}>{category} > </span>)
                          })
                      }</p>

                      <div className="card">
                          <ul className="list-group list-group-flush">
                              {
                                  this.state.data.items.map( item => {
                                    return(
                                        <li key={item.id} className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <Image  src={item.picture} className="picture-item"/>
                                                </div>
                                                <div className="col-md-7">
                                                    <h6>$ { Intl.NumberFormat('es-ES').format(item.price.amount) }</h6>
                                                    <h8>{item.title}</h8>
                                                </div>
                                                <div className="col-md-3">
                                                    <span>{item.price.currency}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                  })
                              }
                          </ul>
                      </div>
                  </Container>
              </div>
          </div>
      );
  }
}

export default App;
