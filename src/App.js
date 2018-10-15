import React, { Component } from 'react';
import './App.css';
import Chart from 'react-apexcharts';
import { Link, BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
        }
      },
      series: [{
        name: 'series-1',
        data: [  45, 50, 49, 60, 70, 91,112,323,221,221,444,544,211,334,1212,434,232,566,343,665,334,887]
      },
      {
        name: 'series-2',
        data: [49, 60, 70, 91,112,323,221,221,444,544,211,334,1212,434,232,566,343,665,334,887]
      },
      {
        name: 'series-3',
        data: [30, 40, 45, 50, 49, 60, 70, 91,112,323,221,221,444,544,211,334,1212,434,232,566,343,665,334,887]
      }
    ]
    }
  }
  render() {
    return (
      <div>
      <Chart  
        className="container" 
        options={this.state.options} 
        series={this.state.series} 
        type="scatter"  
        />
      </div>
    )
  }
}

export default App;
