import React, { Component } from "react";
import Chart from 'react-apexcharts';
import axios from 'axios';

class coinHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoin : props.match.params.id,
      parentData:[],
      options: {
        chart: {
          id: 'apexchart-example',
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            },
            autoSelected: 'zoom' // accepts -> zoom, pan, selection
          }
        },
        xaxis: {
          type:"datetime"
        }
      },
      series: [{
        name: 'RANK- MCap',
        data: [[1, 30],[2, 35],[3, 40],[4, 45],[5, 50],[6, 55],[7, 60],[8, 30]]
      },
      {
        name: 'RANK-Change',
        data: [[1, 33],[2, 38],[3, 43],[4, 48],[5, 53],[6, 58],[7, 63],[8, 33]]
      },
      {
        name: 'Rank-Ratio',
        data: [[1, 30],[2, 35],[3, 40],[4, 45],[5, 50],[6, 55],[7, 60],[8, 30]]
      }
    ]
    }
  }


  componentDidMount(){
    axios
        .get(`http://192.168.0.103.xip.io:5100/pvt/api/coins/${this.state.currentCoin}`)
        .then(async(response) =>{
           await this.setState({
                parentData: response.data,
        });
        var rmcap = [];
        var rchg =[];
        var rratio =[];
        await response.data.map(value=>{
          rmcap.push([Date.parse(value.dateis), value.rank_mcap]);
          rchg.push([Date.parse(value.dateis), value.rank_change]);
          rratio.push([Date.parse(value.dateis), value.rank_ratio.toFixed(4)]);
        })
          this.setState({
            series: [{
              name: 'RANK- MCap',
              data: rmcap
            },
            {
              name: 'RANK-Change',
              data: rchg
            },
            {
              name: 'Rank-Ratio',
              data: rratio
            }
          ]
          })
        console.log(this.state.series);
    })
        .catch(err=>console.log(err));
}

  render() {
    return (
      <div >
        <Chart options={this.state.options} series={this.state.series} type="scatter" />
      </div>
    )
  }
}

export default coinHome;




