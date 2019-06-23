// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 500;
// zoom = 10;

// Create chart margins
var chartMargin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};
var trace1 = {
    x:['Female', 'Male', 'Unknown'],
    y:[7274, 5418, 3848],
    type: "bar"
  };
  
  var data = [trace1];
  
  var layout = {
    title: "Amusement Park Accidents by Gender",
    xaxis: { title: "Gender"},
    yaxis: { title: "Number of Injuries"}
  };
  
  Plotly.newPlot("bar-plot", data, layout);




