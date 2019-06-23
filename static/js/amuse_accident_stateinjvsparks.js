//#D3 Dabbler
console.log("in the JS")


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

// Define the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;



var svg = d3
  .select('#scatter')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .append('g')



  .attr('transform', 'translate(' + chartMargin.left + ',' + chartMargin.top + ')');
var chartGroup = svg.append("g")

//Using the D3, create a scatter plot that represents each state with circle data points
//pull data from `data.csv` by using the `d3.csv` function. 

d3.csv("../static/data/amusecount.csv").then(function(accidents) {
  // if (error) throw error;
    console.log("inside d3 csv")

    console.log(accidents)
    

    for (var i = 0; i < accidents.length; i++) {
        console.log(i, accidents[i].State, accidents[i].Injury_total, accidents[i].AmusementParks );
      }
    // Cast the smokes value to a number for each piece of accidents
    accidents.forEach(function(data) {
      data.Injury_total = +data.Injury_total;
      data.AmusementParks = +data.AmusementParks;
    });

    //y scaled to chart height
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);
    //x scaled to chart width.
    var xLinearScale = d3.scaleLinear().range([0, chartWidth]);

    //axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);  

    xLinearScale.domain([0,
        d3.max(accidents, function(data) {
        return +data.Injury_total * 0.09;
      }),
    ]);

    yLinearScale.domain([0,
        d3.max(accidents, function(data) {
        return +data.AmusementParks * 0.7;
      }),
    ]);

          // Tool tip
          var toolTip = d3
          .tip()
          .attr('class', 'd3-tip')
          .offset([-10, 30])
          .html(function(data) {
              var State = data.State;
              var Injury_total = +data.Injury_total;
              var AmusementParks = +data.AmusementParks;
              return (
              State + '<br> Number Injured: ' + Injury_total + '<br> The number of amuse parks: ' + AmusementParks
              );
          });
    
        svg.call(toolTip);

      //Scatter code
      chartGroup
      .selectAll('circle')
      .data(accidents)
      .enter()
      .append('circle')
      .attr('cx', function(data, index) {
        return xLinearScale(data.Injury_total);
      })
      .attr('cy', function(data, index) {
        return yLinearScale(data.AmusementParks);
      })
      .attr('r', '16')
      .attr('fill', 'green')
      .attr('fill-opacity',0.4)

      //hover over the point and show data
      .on("mouseover",function(data) {
        toolTip.show(data, this);
      })
      // Hide the mouseout
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
      chartGroup
      .append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append('g').call(leftAxis);

    svg.selectAll(".dot")
    .data(accidents)
    .enter()
    .append("text")
    .text(function(data) { return data.State; })
    .attr('x', function(data) {
      return xLinearScale(data.Injury_total);
    })
    .attr('y', function(data) {
      return yLinearScale(data.AmusementParks);
    })
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("text-anchor", "middle");

    // x-axis
    chartGroup
      .append('text')
      .attr(
        'transform',
        'translate(' + chartWidth / 2 + ' ,' + (chartHeight + chartMargin.top - 40) + ')',
      )
      .attr('class', 'axisText')
      .text("Number of Injuries");  

    chartGroup
      .append('text')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x",0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Amusement Parks");  


  });
   