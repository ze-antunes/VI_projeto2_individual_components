let file = "./UFO_sights.csv";

// set the dimensions and margins of the graph
const margin = { top: 20, right: 20, bottom: 0, left: 100 },
  width = 900,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    `translate(${margin.left}, ${margin.top})`);

// // Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv").then(function (data) {

  //   // // List of groups = header of the csv files
  //   const keys = data.columns.slice(1)
  //   console.log(keys)

  //   // Add X axis
  //   const x = d3.scaleLinear()
  //     .domain(d3.extent(data, function (d) {
  //       // console.log(d.year)
  //       return d.year;
  //     }))
  //     .range([0, width]);
  //   svg.append("g")
  //     .attr("transform", `translate(0, ${height * 0.8})`)
  //     .call(d3.axisBottom(x).tickSize(-height * .7).tickValues([1900, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]))
  //     .select(".domain").remove()
  //   // Customization
  //   svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

  //   // Add X axis label:
  //   svg.append("text")
  //       .attr("text-anchor", "end")
  //       .attr("x", width)
  //       .attr("y", height-30 )
  //       .text("Time (year)");

  //   // Add Y axis
  //   const y = d3.scaleLinear()
  //     .domain([-100000, 100000])
  //     .range([ height, 0 ]);

  //   // color palette
  //   const color = d3.scaleOrdinal()
  //     .domain(keys)
  //     .range(d3.schemeDark2);

  //   //stack the data?
  //   const stackedData = d3.stack()
  //     .offset(d3.stackOffsetSilhouette)
  //     .keys(keys)
  //     (data)

  console.log(data)
  //     console.log(stackedData)
  //   // create a tooltip
  //   const Tooltip = svg
  //     .append("text")
  //     .attr("x", 0)
  //     .attr("y", 0)
  //     .style("opacity", 0)
  //     .style("font-size", 17)

  //   // Three function that change the tooltip when user hover / move / leave a cell
  //   const mouseover = function(event,d) {
  //     Tooltip.style("opacity", 1)
  //     d3.selectAll(".myArea").style("opacity", .2)
  //     d3.select(this)
  //       .style("stroke", "black")
  //       .style("opacity", 1)
  //   }
  //   const mousemove = function(event,d,i) {
  //     grp = d.key
  //     Tooltip.text(grp)
  //   }
  //   const mouseleave = function(event,d) {
  //     Tooltip.style("opacity", 0)
  //     d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
  //    }

  //   // Area generator
  //   const area = d3.area()
  //     .x(function(d) { 
  //       return x(d.data.year); 
  //     })
  //     .y0(function(d) { return y(d[0]); })
  //     .y1(function(d) { return y(d[1]); })

  //   // Show the areas
  //   svg
  //     .selectAll("mylayers")
  //     .data(stackedData)
  //     .join("path")
  //       .attr("class", "myArea")
  //       .style("fill", function(d) { return color(d.key); })
  //       .attr("d", area)
  //       .on("mouseover", mouseover)
  //       .on("mousemove", mousemove)
  //       .on("mouseleave", mouseleave)

})

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// Parse the Data
d3.csv(file).then(function (data) {

  const keys = ['us', '', 'gb', 'ca', 'au']

  let years = []
  for (let i = 0; i < data.length; i++) {
    // let year = data[i].datetime.slice(-10, -6);
    // let test = data[i]['duration (seconds)'];
    // console.log(test)
    let date = new Date(data[i].datetime)
    let year = date.getFullYear()
    // console.log(year)
    years.push(year)
  }
  // console.log(years)
  // console.log(data)


  let newDate = d3.group(data, (d) => {
    let date = new Date(d.datetime)
    return date.getFullYear()
  })

  let newObject = []

  for (const [key, value] of newDate.entries()) {
    // console.log(key, value);
    let yearEntry = {year: key }
    for(let i = 0; i < keys.length; i++){
      yearEntry[keys[i]] = 0;
    }
    for(let i = 0; i < value.length; i++){
      yearEntry[value[i].country] ++;
    }
    newObject.push(yearEntry)
  }

  
  newObject.sort((a, b) => {
    return a.year - b.year
  })
  console.log(newObject)

  // Add X axis
  const x = d3.scaleLinear()
    .domain(d3.extent(data, function (d) {
      return d.datetime.slice(-10, -6);
    }))
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height * 0.8})`)
    .call(d3.axisBottom(x).tickSize(-height * .7).tickValues([1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]))
    .select(".domain").remove()
  // Customization
  svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

  // Add X axis label:
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 30)
    .text("Time (year)");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([-6000, 6000])
    .range([height, 0]);

  // color palette
  const color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeDark2);

  //stack the data?
  const stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (newObject)

  // create a tooltip
  const Tooltip = svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("font-size", 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function (event, d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".myArea").style("opacity", .2)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  const mousemove = function (event, d, i) {
    grp = d.key
    Tooltip.text(grp)
  }
  const mouseleave = function (event, d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
  }

  // Area generator
  const area = d3.area()
    .x(function (d) {
      return x(d.data.year);
    })
    .y0(function (d) { return y(d[0]); })
    .y1(function (d) { return y(d[1]); })

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .join("path")
    .attr("class", "myArea")
    .style("fill", function (d) { return color(d.key); })
    .attr("d", area)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

})