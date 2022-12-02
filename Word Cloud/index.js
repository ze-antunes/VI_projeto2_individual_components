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
        const countries = topojson.feature(data, data.objects.countries)

        g.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', path)
    })