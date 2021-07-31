import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import {Image} from 'react-bootstrap';
import { Link} from "react-router-dom";

const url = "http://localhost:8888/api/items";

function Items () {

    const [data, setData] = useState({"autor":{}, "items":[]});

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

    return (
        <div className="card">
            <ul className="list-group list-group-flush">

                    {
                        data.items.map( item => {
                            return(
                                <li key={item.id}  className="list-group-item">
                                    <Link to={"/item/"+item.id} >
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

            </ul>
        </div>
    );

}

export default Items