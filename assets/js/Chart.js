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
