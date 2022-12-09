let file = "../UFO_sights.csv";

const width = 900;
const height = 800;

const svg = d3.select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height)


const projection = d3.geoMercator();
const path = d3.geoPath(projection)

const g = svg.append('g')

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(data => {
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        svg.attr("viewBox", [30, -200, width, height])
            .on("click", reset);


        const countries = topojson.feature(data, data.objects.countries)

        const paises = g.selectAll('g')
            .data(countries.features)
            .enter()
            .append('g')

        paises.append("text")
            .attr('class', 'countryName')
            .text(d => d.properties.name)
            .attr("transform", function (d) {
                console.log(path.centroid(d)[0])
                console.log(path.centroid(d)[1])
                return (
                    "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
                );
            })
            .style("text-anchor", "middle")
            .attr("dx", 0)
            .attr("dy", 0)
            // .insert("rect", "text")
            // .attr("class", "countryLabelBg")
            // .attr("transform", function (d) {
            //     return "translate(" + (path.centroid(d)[0] - 2) + "," + path.centroid(d)[1] + ")";
            // })
            // .attr("width", function (d) {
            //     return 300 + 4;
            // })
            // .attr("height", function (d) {
            //     return 300;
            // });

        paises.append('path')
            .attr("cursor", "pointer")
            .attr('class', 'country')
            .attr("fill", "gray")
            .attr('d', path)
            .on("click", clicked)
        // .on("mouseover", (d) => {
        //     console.log("ola")
        // })

        g.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path(topojson.mesh(data, data.objects.countries, (a, b) => a !== b)));

        svg.call(zoom);

        function reset() {
            paises.transition().style("fill", null);
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
            );
            console.log("reset")
        }

        function clicked(event, d) {
            const [[x0, y0], [x1, y1]] = path.bounds(d);
            event.stopPropagation();
            paises.transition().style("fill", null);
            d3.select(this).transition().style("fill", "red");
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(width / 2, height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                d3.pointer(event, svg.node())
            );
        }

        function zoomed(event) {
            const rm = event;
            g.attr("transform", rm.transform);
            g.attr("stroke-width", 1 / rm.transform.k);
        }

        return svg.node();
    })

const handleRequest = data => {
    console.log(data)


    // const paises = g.selectAll('path')
    //     .append("g")
    //     .attr('class', 'something')
    //     .data(data)
    //     .text(d => d['city'])
}


// Data Request 
d3.csv(file, d3.autoType).then(handleRequest)