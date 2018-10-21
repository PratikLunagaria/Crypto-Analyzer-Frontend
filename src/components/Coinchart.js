var data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 5, {
  min: 30,
  max: 90
});
var options1 = {
  chart: {
    id: "chart2",
    type: "scatter",
    height: 500,
    toolbar: {
      show: true
    }
  },
  series: [
    {
      data: data
    }
  ],
  tooltip: {
    theme: "dark"
  },
  xaxis: {
    type: "datetime"
  },
  yaxis: {
    min: 0,
    tickAmount: 4
  }
};

var chart1 = new ApexCharts(document.querySelector("#chart-area"), options1);

chart1.render();


function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}