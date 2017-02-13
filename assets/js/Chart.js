class PolarChart {
    constructor(direction, force, title) {

        var ChartContainers = {
            yawContainer: "yawChartContainer",
            windContainer: "windChartContainer",
            powerProductionContainer: "powerProductionChartContainer",
            rpmContainer: "rpmChartContainer",
        }
        var chartContainer = "";

        switch (title){
            case "Yaw":
            case "yaw":
                chartContainer = ChartContainers.yawContainer;
                break;
            case "Wind":
            case "wind":
                chartContainer = ChartContainers.windContainer;
                break;
        }


        Highcharts.chart(chartContainer, {

            chart: {
                polar: true
            },

            title: {
                text: title
            },

            pane: {
                startAngle: 0,
                endAngle  : 360
            },

            xAxis: {
                tickInterval: 45,
                min         : 0,
                max         : 360,
                labels      : {
                    formatter: function () {
                        return this.value + '°';
                    }
                }
            },

            yAxis: {
                min: 0
            },

            plotOptions: {
                series: {
                    pointStart: direction-1
                }
            },

            series: [
                {
                    type: 'line',
                    name: title,
                    data: [0, force]
                }
            ]
        });
    }
}



// -----------------------------------------------

class GaugeChart {
    constructor(level, title) {

        var ChartContainers = {
            speedContainer: "speedGaugeContainer",
            energyContainer: "energyGaugeContainer",
        }
        var chartContainer = "";

        switch (title){
            case "Energy":
            case "Energy":
                chartContainer = ChartContainers.energyContainer;
                break;
            case "Speed":
            case "speed":
                chartContainer = ChartContainers.speedContainer;
                break;
        }

        var gaugeOptions = {

            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 6
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };

        // The speed gauge
        this._gauge = Highcharts.chart(chartContainer, Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 200,
                title: {
                    text: title
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: title,
                data: [level],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">km/h</span></div>'
                },
                tooltip: {
                    valueSuffix: ' km/h'
                }
            }]

    }));
    }

    updateValue(value){
        //update value
        if (this._gauge) {
            point = this._gauge.series[0].points[0];
            point.y = value;
            point.update(newVal);
        }
    }
}
