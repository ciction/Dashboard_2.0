class TurbineManager {
    constructor(scene){
        this._worldScene = scene;
        this._counter = 0;
        this._scale = 450;
        this._offset = 700;
    }

    createTurbines(){
        this.createNext();
    }

    createNext(){

        var newTturbine;
        var params = {
            IDname: serverSideTurbineData.data[this._counter][0],
            IDnumber: serverSideTurbineData.data[this._counter][1],
            status: serverSideTurbineData.data[this._counter][2],
            position:{
                x: serverSideTurbineData.data[this._counter][3][0] * this._scale - this._offset,
                y: 0,
                z: serverSideTurbineData.data[this._counter][3][1] * this._scale - this._offset,
            },
            gaugeData:{
                power_production: serverSideTurbineGauges.power_production,
                rotor_rpm: serverSideTurbineGauges.rotor_rpm,
                wind_speed: serverSideTurbineGauges.wind_speed,
                wind_direction: serverSideTurbineGauges.wind_direction,
                yaw_angle: serverSideTurbineGauges.yaw_angle
            }
        }

        if(this._counter < serverSideTurbineData.data.length -1 ){
            newTturbine = new Turbine(this._worldScene, params, this.createNext.bind(this));
        }
        else{
            newTturbine = new Turbine(this._worldScene, params, null);
        }

        this._counter = this._counter + 1;
    }
}

new TurbineManager();