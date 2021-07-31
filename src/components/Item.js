import React,{useState, useEffect} from 'react';
import axios from 'axios';

import {withRouter} from "react-router-dom";

import {Image} from 'react-bootstrap';
const url = "http://localhost:8888/api/item";

function Item (props){
    const headers  = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
    }
    const [data, setData] = useState({"autor":{}, "item":{"price":{}}});
    const id = props.match.params.id;

    const getItemById = (id) => {
        axios.get(url+"/"+id, {headers: headers}).then(response =>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => getItemById(id), []);
    return (

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <div><Image src={data.item.picture} className=""/></div>
                            <div>
                                <p>
                                    {data.item.description}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <p>
                                <span> {data.item.condition}</span>
                                <span> - vendidos {data.item.sold_quantity}</span>
                            </p>
                            <h5>{data.item.title}</h5>
                            <p>{data.item.price.amount}</p>
                            <button className="btn btn-primary btn-lg">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default withRouter(Item)