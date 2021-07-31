import React,{Component} from 'react';
import axios from 'axios';
import {Image} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";

const url = "http://localhost:8888/api/items";

class Results extends Component{

    constructor (props) {
        super(props)
        this.state = {
            data:{items:[]},
            d: this.useQuery()
        }
    }

    componentDidMount() {
        this.getSearch(this.useQuery());
    }


    componentDidUpdate(prevProp) {
        console.log("UPDATE", this.props);
        console.log();
        if(this.props.q !== prevProp.q){
            this.getSearch(this.props.q);
        }
    }

    useQuery() {
        const searchParams =  new URLSearchParams(document.location.search.substring(1));
        return (searchParams.get("q")== null) ? '' : searchParams.get("q");
    }


    componentWillReceiveProps(nextProps) {
        console.log("NEX PROPS", nextProps);
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
                    <Router>
                    {
                        this.state.data.items.map( item => {
                            return(
                                <li key={item.id} className="list-group-item">

                                    <Link to={"/item/"+item.id}>
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
                                    </Link>
                                </li>
                            )
                        })
                    }
                    </Router>
                </ul>
            </div>
        );
    }
}

export default Results