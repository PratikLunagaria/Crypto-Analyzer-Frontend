import React, { Component } from "react";
import axios from 'axios';
import Tabs from './Tabs';
import Coinchart from "./Coinchart";

class Coinhome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      prevW: undefined,
      prevH: undefined,
      currentCoin : props.match.params.id,
      parentData:[],
      fullData: [{
		name: 'RANK- MCap',
		data: [[0,0]]
	  },
	  {
		name: 'RANK-Change',
		data: [[0,0]]
	  },
	  {
		name: 'Rank-Ratio',
		data: [[0,0]]
	  }
	]
    }
  }


  componentWillMount(){
    this.handleResize();
        window.addEventListener("resize", this.handleResize);
    axios
        .get(`http://localhost:5100/pvt/api/coins/${this.state.currentCoin}`)
        .then(async(response) =>{
           await this.setState({
                parentData: response.data,
        });
        var rmcap = [];
        var rchg =[];
        var rratio =[];
        await response.data.map(value=>{
          rmcap.push([Date.parse(value.dateis+"T00:00:00"), -value.rank_mcap]);
          rchg.push([Date.parse(value.dateis+"T00:00:00"), -value.rank_change]);
          rratio.push([Date.parse(value.dateis+"T00:00:00"), value.rank_ratio.toFixed(4)]);
        })
          this.setState({
            fullData: [{
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
    })
        .catch(err=>console.log(err));
        
}

componentWillUnmount() {
  window.removeEventListener("resize", this.handleResize);
}

handleResize = async() => {
  await this.setState({
      prevW: this.state.windowWidth,
      prevH: this.state.windowHeight,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
  })
  // document.getElementById(document.getElementsByClassName('apexcharts-canvas')[0].id).style.cssText = `height: ${0.7*this.state.windowHeight} !important`;
  // document.getElementById(document.getElementsByClassName('apexcharts-canvas')[0].id).style.cssText = `width: ${0.7*this.state.windowWidth} !important`
  if ((Math.abs(this.state.prevW - this.state.windowWidth) >= 30 ) ||
      (Math.abs(this.state.prevH - this.state.windowHeight) >= 30 ))
  {
	  window.location.reload();
  }
};

  render() {
    return (
      <div id="wrapper">
        <div className="CoinChartTitle">
          <div>Scatterplots for {this.state.currentCoin}</div>
        </div>
        <Tabs>
          <div label="MarketCap Rank">
            <Coinchart
              chart_type={this.state.fullData[0].name}
              chart_data={this.state.fullData[0].data}
            />
          </div>
          <div label="Rank by Volume">
            <Coinchart
              chart_type={this.state.fullData[1].name}
              chart_data={this.state.fullData[1].data}
            />
          </div>
        </Tabs>
        <a href="https://cointradehistory.altcoinsidekick.com" style={
          {
          "backgroundColor": "#195B9D",
          "color": "white",
          "height": "30px",
          "width": "100px",
          "textAlign": "center",
          "textJustify": "center",
          "alignSelf": "center",
          "justifySelf": "center"
          }}>
              Back
        </a>
      </div>
    )
  }
}

export default Coinhome;



// <div label="Rank Ratio">
//             <Coinchart
//               chart_type={this.state.fullData[2].name}
//               chart_data={this.state.fullData[2].data}
//             />
//           </div>
