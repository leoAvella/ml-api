import React,{Component} from 'react';
import axios from 'axios';
import {Image} from 'react-bootstrap';


const url = "http://localhost:8888/api/items";

class Results extends Component{

    constructor (props) {
        super(props)
        this.state = {
            data:{items:[], categories: []},
            qSearch: ''
        }
    }

    componentDidUpdate() {
        this.getSearch(this.props.qSearch);
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
        }).catch(error=>{
            console.log(error);
        })
    }


    render(){
        return (
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
                                            <p>{item.title}</p>
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
        );
    }
}


export default Results