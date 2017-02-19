class ModalManager{
    constructor(){
        ModalManager.isModalOpen = false;
    }

    openModal(turbineID){
        console.log("open modal");
        if(turbineID != null && (ModalManager.isModalOpen == false)){
            //Turbine data
            var baseUserData = Turbine.TurbineList[turbineID - 1]._base._mesh.userData;
            var wickUserData = Turbine.TurbineList[turbineID - 1]._wick._mesh.userData;

            var power_production = wickUserData.gaugeData.power_production;
            var rotor_rpm = wickUserData.gaugeData.rotor_rpm;
            var wind_speed = wickUserData.gaugeData.wind_speed;
            var wind_direction = wickUserData.gaugeData.wind_direction;
            var yawAngle = wickUserData.gaugeData.yaw_angle;


            ModalManager.isModalOpen = true;
            //set modal title
            $('#modal1 h4').text("Turbine " + wickUserData.IDname + " " + wickUserData.IDnumber );


            //wip
            var gaugeChartSpeed = new GaugeChart(rotor_rpm,"RPM", serverSideChartConfiguration.chart_config.rotor_rpm[0], serverSideChartConfiguration.chart_config.rotor_rpm[1]);
            var gaugeChartEnergy = new GaugeChart(power_production,"Power Production",serverSideChartConfiguration.chart_config.power_production[0], serverSideChartConfiguration.chart_config.power_production[1]);

            //set modal charts
             new PolarChart(yawAngle,10,"Yaw",0,360);
             new PolarChart(wind_direction,wind_speed,"Wind",0,360);


            //set modal text
            $('#modal1 p').html("<label>ID:</label>" + baseUserData.ID + "<br>" +
                                  "<label>baseType:</label>" + baseUserData.baseType + "<br>" +
                                  "<label>type:</label>" + baseUserData.type +"<br>" +
                                  "<label>speed:</label>" + wickUserData.gaugeData.wind_speed + "<br>" +
                                  "<label>yaw:</label>" + wickUserData.gaugeData.yaw_angle + "<br>" +
                                  "<h4>" +  wickUserData.status +"</h4>"+ "<br>");
            //show the modal
            $('#modal1').modal('open');
        }

    }

}
ModalManager.setModalClosed = function(){
    ModalManager.isModalOpen = false;
}


