import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Link} from 'react-router-dom';
import $ from 'jquery';

const tooltips = {
    1 : "Cryptocurrency names",
    2 : "Cryptocurrency symbol",
    3 : "Today's price of the Cryptocurrency(updates daily)",
    4 : "currency volume traded in last 24 hours(USD)",
    5 : "Rank based on Market Capitalization of the Currency within 24 hours",
    6 : "Rank based on Volume Change in last 24h"
}
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state= {
            data:  [{"id":2456,"name":"OFCOIN","symbol":"OF","slug":"ofcoin","circulating_supply":null,"total_supply":51200000000,"max_supply":null,"date_added":"2018-01-24T00:00:00.000Z","num_market_pairs":3,"cmc_rank":1717,"last_updated":"2018-10-17T05:45:46.000Z","usd_price":0.000665905191956,"usd_volume_24h":850399.468918922,"usd_percent_change_1h":0.0118437,"usd_percent_change_24h":4.43424,"usd_percent_change_7d":68.7209,"usd_market_cap":0,"usd_last_updated":"2018-10-17T05:45:46.000Z","rank_mcap":1988,"rank_change":62,"rank_ratio":32.064516129032256}],
        }
    }
    componentDidMount(){
        Object.keys(tooltips).map(function(element, iid){
            $(`div.rt-thead.-header div:nth-child(1) div:nth-child(${element}) div:nth-child(1)`).append(`
            <div class="ttp tooltip is-tooltip-bottom is-tooltip-multiline" data-tooltip="${tooltips[element]}">
                <img src="/static/infos.png" class="info-btn" />
            </div>
            `);
        })
        
        axios
            .get("http://185.141.195.97:5100/pvt/api/home")
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
        <div className="homepage_title tooltip is-tooltip-bottom is-tooltip-multiline" data-tooltip="A Cryptocurrency Ranking tool that helps you sort coin ranks by Market Cap. and Change in the Coin price daily !">
            <div>
            Cryptocurrency Rankings
            </div>
        </div>
      <ReactTable
      data={this.state.data}
      noDataText="Oh No!"
      columns={[
        {
            Header: "Click header to sort",
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
              Header: "Volume(24h)",
              accessor: "usd_volume_24h",
              Cell: e =>{
                return typeof(e.value) === "number" ? e.value.toFixed(4) : "not available"
                }
            }]},
            {
            Header: "MarketCap & Volume Rankings",
              columns: [
                        {
                        Header: "MarketCap Rank",
                        accessor: "rank_mcap"
                        },
                        {
                        Header: "Volume Rank",
                        accessor: "rank_change"
                        },
                        // {
                        //     Header: "ratio",
                        //     accessor: "rank_ratio",
                        //     Cell: e =>{
                        //         return typeof(e.value) === "number" ? e.value.toFixed(4) : "not available"
                        //         }
                        // }
                    ]
            }
       ]}
      defaultPageSize={100}
      className="-striped -highlight"
      style={{
        height: "85vh" 
      }}
    />
      </div>
    )
  }
};
