var graph_width = 960;
var graph_height = 540;

function september_tests_and_vms(data) {

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = graph_width - margin.left - margin.right,
        height = graph_height - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom")
        .ticks(30);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left")
        .ticks(5);

    // Define the line
    var testsLine = d3.svg.line()
        .interpolate("basis")           // <=== THERE IT IS!
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.tests); });

    // Define the line
    var vmsLine = d3.svg.line()
        .interpolate("basis")           // <=== THERE IT IS!
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.vms); });

    // Adds the svg canvas
    var svg = d3.select("#september-tests-and-vms")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");


    data.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return Math.max(d.tests, d.vms); })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", testsLine(data));

    svg.append("path")
        .attr("class", "line")
        .attr("d", vmsLine(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}

// zcat tests-train-1.jsonl.gz | sed -ne 's/.*ok.*duration: \([0-9]\+\)s.*/\1/p' | sort | uniq -c
test_duration(data) {
    
}
