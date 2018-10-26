import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export default class CoinChart extends Component {
    constructor(props){
        super(props);
        this.state={
            options: {
                chart: {
                  id: 'coinchart-acsk',
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
                name: props.chart_type,
                data: props.chart_data
              }
            ]
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
      if(nextProps.chart_data!==prevState.series.data){
        return { 
			series: [{
                name: nextProps.chart_type,
                data: nextProps.chart_data
              }
            ]
		};
     }
     else return null;
   }
  render() {
    return (
      <div className="scatterplot">
         <Chart options={this.state.options} series={this.state.series} type="scatter" height={0.7* window.innerHeight} width={0.8*window.innerWidth} />
      </div>
    )
  }
}
