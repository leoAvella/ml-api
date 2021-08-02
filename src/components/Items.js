import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import {Image} from 'react-bootstrap';
import { Link} from "react-router-dom";

import logo from '../images/ic_shipping.png';

const url = "http://localhost:8888/api/items";

function Items () {

    const [data, setData] = useState({"autor":{}, "items":[], "categories":[]});

    const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
    }

    useEffect(() => getSearch(getQuery()), []);

    const getQuery = () => {
        const searchParams =  new URLSearchParams(document.location.search.substring(1));
        return (searchParams.get("q")== null) ? '' : searchParams.get("q");
    }

    const getSearch = (qSearch) => {
        axios.get(url+"?q="+qSearch, {headers: headers}).then(response =>{
            setData( response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const isShipping = (free_shipping) => {
        return (free_shipping)? <Image className="free_shipping" src={logo}/> : "";
    }

    return (
        <div>
            <div className="breadcrumb">
                {
                    data.categories.map( category => {
                        return(<span> {category} >  </span>);
                    })
                }
            </div>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {
                        data.items.map( item => {
                            return(
                                <li key={item.id}  className="list-group-item item-list">
                                    <Link to={"/item/"+item.id} >
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Image  src={item.picture} className="picture-item"/>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="row info-item">
                                                    <div className="col-md-9 col-sm-1">
                                                        <h6>
                                                            $ { Intl.NumberFormat('de-DE').format(item.price.amount) }
                                                            <span>  {isShipping(item.free_shipping)}</span>
                                                        </h6>
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="col-md-3 col-sm-1">
                                                        <span className="breadcrumb">{item.state_name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>



    );

}

export default Items