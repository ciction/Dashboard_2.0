class PolarChart {
    constructor(direction, force, title, minAngle, maxAngle) {

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
            default:
                console.log("no container available for: '"+title+"'");
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
                startAngle: minAngle,
                endAngle  : maxAngle
            },

            xAxis: {
                tickInterval: 45,
                min         : minAngle,
                max         : maxAngle,
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
    constructor(level, title,minValue, maxValue) {

        var ChartContainers = {
            RPMContainer: "RPMGaugeContainer",
            powerProductionContainer: "powerProductionGaugeContainer",
        }
        var chartContainer = "";

        switch (title){
            case "RPM":
            case "rpm":
                chartContainer = ChartContainers.RPMContainer;
                break;
            case "Power Production":
            case "power production":
                chartContainer = ChartContainers.powerProductionContainer;
                break;
            default:
                console.log("no container available for: '"+title+"'");
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
                min: minValue,
                max: maxValue,
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
                    '<span style="font-size:12px;color:silver">'+title+'</span></div>'
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


// -----------------------------------------------

class LineChart {
    constructor() {
        this._lineChart = Highcharts.chart('container', {
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }],

            plotOptions:{
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                //category == x axis categories
                                alert ('Category: '+ this.category +', value: '+ this.y);
                            }
                        }
                    }
                }
            },

        });
    }
}

new LineChart();