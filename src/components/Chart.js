const ApexCharts = require('apexcharts');

var options = {
    chart: {
      toolbar: {
        autoSelected: 'zoom'
      },
      events: {
        beforeZoom() {
          console.log('beforeZoom');
        },
        zoomed() {
          console.log('zoomed');
        }
      },
    },
    series: [{
      data: [ [0, 30], [10, 35], [20, 50], [30, 60], [40, 65] ]
    }],
    xaxis: {
        type: 'datetime'
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
//   var finalChart = chart.render();

  module.exports = chart;