import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Coinchart extends Component {
    constructor(props){
        super(props);
        this.state={
            options: {
                chart: {
                  id: 'coincharts-acsk',
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
                grid: {
                  clipMarkers: false
                },
                xaxis: {
                  type:"datetime"
                },
                yaxis: {
                  labels: {
                      formatter: function(val) {
                          return Math.abs(val)
                      }
                  },
                  decimalsInFloat: 0
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

export default Coinchart;