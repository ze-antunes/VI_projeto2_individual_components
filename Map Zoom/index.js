let file = "../UFO_sights.csv";

const handleRequest = data => {
    console.log(data)
}


// Data Request 
d3.csv(file, d3.autoType).then(handleRequest)

const width = 900;
const height = 600;

const svg = d3.select('body')
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

        const countries = topojson.feature(data, data.objects.countries)

        const paises = g.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr("cursor", "pointer")
            .attr('class', 'country')
            .attr('d', path)
            .on("click", clicked)

        paises.append("title")
            .text(d => d.properties.name);

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
            const { rm } = event;
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
        }
    })
