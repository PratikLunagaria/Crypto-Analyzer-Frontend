import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state= {
            data:  [{"id":2456,"name":"OFCOIN","symbol":"OF","slug":"ofcoin","circulating_supply":null,"total_supply":51200000000,"max_supply":null,"date_added":"2018-01-24T00:00:00.000Z","num_market_pairs":3,"cmc_rank":1717,"last_updated":"2018-10-17T05:45:46.000Z","usd_price":0.000665905191956,"usd_volume_24h":850399.468918922,"usd_percent_change_1h":0.0118437,"usd_percent_change_24h":4.43424,"usd_percent_change_7d":68.7209,"usd_market_cap":0,"usd_last_updated":"2018-10-17T05:45:46.000Z","rank_mcap":1988,"rank_change":62,"rank_ratio":32.064516129032256}],
        }
    }
    componentDidMount(){
        axios
            .get("http://192.168.0.103.xip.io:5100/pvt/api/home")
            .then(response =>{
                this.setState({
                    data: response.data['home_table'],
            });    
        }
            )
            .catch(err=>console.log(err));
    }
    render() {
    return (
      <div>
      <ReactTable
      data={this.state.data}
      noDataText="Oh No!"
      columns={[
        {
            Header: "Info",
              columns: [
            {
              Header: "Coin",
              accessor: "name",
              Cell: e =>{
                  return (
                      <Link to={"coins/"+e.original.slug}><img src={"https://s2.coinmarketcap.com/static/img/coins/16x16/"+e.original.id+".png" }  alt={e.value}/> {e.value} </Link>
                      )
                }
            },
            {
                Header: "Symbol",
                accessor: "symbol",
            },
            {
              Header: "Price",
              accessor: "usd_price",
              Cell: e =>{
              return typeof(e.value) === "number" ? e.value.toFixed(4) : "not available"
              }
            },
            {
              Header: "Volume",
              accessor: "usd_volume_24h",
              Cell: e =>{
                return typeof(e.value) === "number" ? e.value.toFixed(4) : "not available"
                }
            }]},
            {
            Header: "Ranks",
              columns: [
                                    {
                                    Header: "mcap",
                                    accessor: "rank_mcap"
                                    },
                                    {
                                    Header: "change",
                                    accessor: "rank_change"
                                    },
                                    {
                                        Header: "ratio",
                                        accessor: "rank_ratio",
                                        Cell: e =>{
                                            return typeof(e.value) === "number" ? e.value.toFixed(4) : "not available"
                                            }
                                    }
                                ]
            }
       ]}
      defaultPageSize={100}
      className="-striped -highlight"
      style={{
        height: "100vh" 
      }}
    />
      </div>
    )
  }
};
