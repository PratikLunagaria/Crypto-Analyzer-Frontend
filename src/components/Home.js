import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
 

    constructor(props){
        super(props);
        this.state= {
            rankMcapDesc:  [{"id":1,"name":"Bitcoin","symbol":"BTC","slug":"bitcoin","circulating_supply":17306325,"total_supply":17306325,"max_supply":21000000,"date_added":"2013-04-28T00:00:00.000Z","num_market_pairs":6305,"cmc_rank":1,"last_updated":"2018-10-05T15:58:24.000Z","usd_price":6592.10406661,"usd_volume_24h":3685775215.00158,"usd_percent_change_1h":0.0308403,"usd_percent_change_24h":0.243439,"usd_percent_change_7d":-0.946998,"usd_market_cap":114085095410.57431,"usd_last_updated":"2018-10-05T15:58:24.000Z","vol_change_24h":-3.889602338868156}],
            rankMcapAsc:  [{"id":1,"name":"Bitcoin","symbol":"BTC","slug":"bitcoin","circulating_supply":17306325,"total_supply":17306325,"max_supply":21000000,"date_added":"2013-04-28T00:00:00.000Z","num_market_pairs":6305,"cmc_rank":1,"last_updated":"2018-10-05T15:58:24.000Z","usd_price":6592.10406661,"usd_volume_24h":3685775215.00158,"usd_percent_change_1h":0.0308403,"usd_percent_change_24h":0.243439,"usd_percent_change_7d":-0.946998,"usd_market_cap":114085095410.57431,"usd_last_updated":"2018-10-05T15:58:24.000Z","vol_change_24h":-3.889602338868156}],
            rankChgDesc:  [{"id":1,"name":"Bitcoin","symbol":"BTC","slug":"bitcoin","circulating_supply":17306325,"total_supply":17306325,"max_supply":21000000,"date_added":"2013-04-28T00:00:00.000Z","num_market_pairs":6305,"cmc_rank":1,"last_updated":"2018-10-05T15:58:24.000Z","usd_price":6592.10406661,"usd_volume_24h":3685775215.00158,"usd_percent_change_1h":0.0308403,"usd_percent_change_24h":0.243439,"usd_percent_change_7d":-0.946998,"usd_market_cap":114085095410.57431,"usd_last_updated":"2018-10-05T15:58:24.000Z","vol_change_24h":-3.889602338868156}],
            rankChgAsc:  [{"id":1,"name":"Bitcoin","symbol":"BTC","slug":"bitcoin","circulating_supply":17306325,"total_supply":17306325,"max_supply":21000000,"date_added":"2013-04-28T00:00:00.000Z","num_market_pairs":6305,"cmc_rank":1,"last_updated":"2018-10-05T15:58:24.000Z","usd_price":6592.10406661,"usd_volume_24h":3685775215.00158,"usd_percent_change_1h":0.0308403,"usd_percent_change_24h":0.243439,"usd_percent_change_7d":-0.946998,"usd_market_cap":114085095410.57431,"usd_last_updated":"2018-10-05T15:58:24.000Z","vol_change_24h":-3.889602338868156}],
            rankRatioDesc:  [{"id":1,"name":"Bitcoin","symbol":"BTC","slug":"bitcoin","circulating_supply":17306325,"total_supply":17306325,"max_supply":21000000,"date_added":"2013-04-28T00:00:00.000Z","num_market_pairs":6305,"cmc_rank":1,"last_updated":"2018-10-05T15:58:24.000Z","usd_price":6592.10406661,"usd_volume_24h":3685775215.00158,"usd_percent_change_1h":0.0308403,"usd_percent_change_24h":0.243439,"usd_percent_change_7d":-0.946998,"usd_market_cap":114085095410.57431,"usd_last_updated":"2018-10-05T15:58:24.000Z","vol_change_24h":-3.889602338868156}],
            rankRatioAsc:  [{"id":1,"name":"Bitcoin","symbol":"BTC","slug":"bitcoin","circulating_supply":17306325,"total_supply":17306325,"max_supply":21000000,"date_added":"2013-04-28T00:00:00.000Z","num_market_pairs":6305,"cmc_rank":1,"last_updated":"2018-10-05T15:58:24.000Z","usd_price":6592.10406661,"usd_volume_24h":3685775215.00158,"usd_percent_change_1h":0.0308403,"usd_percent_change_24h":0.243439,"usd_percent_change_7d":-0.946998,"usd_market_cap":114085095410.57431,"usd_last_updated":"2018-10-05T15:58:24.000Z","vol_change_24h":-3.889602338868156}]
        }
    }
    componentDidMount(){
        axios
            .get("http://localhost:5100/pvt/api/home")
            .then(response =>
                this.setState({
                    rankMcapDesc: response.data['rank_mcap_DESC'],
                    rankMcapAsc: response.data['rank_mcap_ASC'],
                    rankChgDesc: response.data['rank_Chg_DESC'],
                    rankChgAsc: response.data['rank_Chg_ASC'],
                    rankRatioDesc: response.data['rank_ratio_DESC'],
                    rankRatioAsc: response.data['rank_ratio_ASC']
            })
            )
            .catch(err=>console.log(err));
    }
    render() {
    return (
      <div>
      <table className="table is-fullwidth">
      <thead >
      <tr>
          <th id="coinIndex" scope="col" >#</th>
          <th id="coinlogo"></th>
          <th scope="col" >Coin</th>
          <th id="coinPrice" scope="col" >Price (USD)</th>
          <th id="coinVol" scope="col" >Volume (24h)</th>
          <th id="coinChg" scope="col" >Change</th>
          <th id="VChg" scope="col" >Jump</th>
      </tr>
      </thead>
      <tbody>
      {
          this.state.rankChgAsc.map((value,index)=>{
              let linkVal = `coins/${value.slug}`;
              let logoVal = `https://s2.coinmarketcap.com/static/img/coins/64x64/${value.id}.png`;
              return(
                  <tr>
                      <th id="coinIndex" scope="row">{index+1}</th>
                      <td id="coinlogo">
                          <Link to={linkVal}>
                              <img src={logoVal} alt={value.name}/>
                          </Link>
                      </td>
                      <td>
                          <Link to={linkVal}>
                              <strong className="coin-name">{value.name}</strong><br/><strong className="coin-id">{value.symbol}</strong>
                          </Link>
                      </td>
                      <td id="coinPrice">{parseFloat(value.usd_price).toFixed(4)}</td>
                      <td id="coinVol">{parseFloat(value.usd_volume_24h).toFixed(2)}</td>
                      <td id="coinChg">{parseFloat(value.usd_percent_change_24h).toFixed(2)}</td>
                      <td id="VChg">{parseFloat(value.vol_change_24h).toFixed(2)}</td>
                  </tr>
              )
          })
      }
      </tbody>
  </table>

      </div>
    )
  }
};
