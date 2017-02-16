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


            ModalManager.isModalOpen = true;
            //set modal title
            $('#modal1 h4').text("Turbine " + wickUserData.IDname + " " + wickUserData.IDnumber );

            //set modal charts
             new PolarChart(wickUserData.yaw,wickUserData.speed,"Yaw");
             new PolarChart(wickUserData.yaw,wickUserData.speed,"Wind");

            //wip
            var gaugeChartSpeed = new GaugeChart(wickUserData.speed,"Speed");
            var gaugeChartEnergy = new GaugeChart(wickUserData.yaw,"Energy");

            
            //set modal text
            $('#modal1 p').html("<label>ID:</label>" + baseUserData.ID + "<br>" +
                                  "<label>baseType:</label>" + baseUserData.baseType + "<br>" +
                                  "<label>type:</label>" + baseUserData.type +"<br>" +
                                  "<label>speed:</label>" + wickUserData.speed + "<br>" +
                                  "<label>yaw:</label>" + wickUserData.yaw + "<br>" +
                                  "<h4>" +  wickUserData.status +"</h4>"+ "<br>");

            //show the modal
            $('#modal1').modal('open');
        }

    }

}
ModalManager.setModalClosed = function(){
    ModalManager.isModalOpen = false;
}


