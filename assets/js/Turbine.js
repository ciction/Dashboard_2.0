class Turbine{
    constructor(scene, params){
        Turbine.count = Turbine.count + 1;
        if(Turbine.TurbineList == null) {
            Turbine.TurbineList = [];
        }
        self = this;

        var wickData = {
            ID: Turbine.count,
            baseType: 'turbine',
            type: 'turbineWick',
            speed: 10,
            yaw: 45
        };

        var baseData = {
            ID: Turbine.count,
            baseType: 'turbine',
            type: 'turbineBase'
        };

        var wickParams = {
            userData: wickData
        }

        var baseParams = {
            userData: baseData
        }

        this._wick = new JSONModel("assets/models/Wind Turbine_top.json", scene, "turbineWick", onLoadReady.bind(this), Turbine.count,wickParams);
        this._base = new JSONModel("assets/models/Wind Turbine_base.json", scene, "turbineBase", onLoadReady.bind(this) , Turbine.count, baseParams);
        Turbine.TurbineList.push(this);
        
        //after JSON is loaded add some more configurations
        var wick = this._wick;
        var base = this._base;
        function onLoadReady(){
            if(this._wick.getMesh() && this._base.getMesh()) {
                //make wicks child of the base
                this._base.getMesh().add(this._wick.getMesh());
                //reset wick scale
                this._wick.getMesh().scale.set( 1,1,1 );
                this._wick.getMesh().position.set( 0, 185/30, 0 );
                this._wick.getMesh().updateMatrix();


                this._base .getMesh().rotation.y += Math.radians(180);

                if(params !=null){
                    if(params.position !=null){
                        self.setPosition(params.position);
                    }
                }
             }
        }

    }

    animate(degrees){
        if(this._wick.getMesh()){
            this._wick.getMesh().rotation.z += Math.radians(degrees);
        }
    }

    setPosition(position){
        this._base.getMesh().position.set(position.x,position.y,position.z);
    }

    rotateY(degrees){
        if(this._wick.getMesh() && this._base.getMesh()){
            //wicks rotate along with the base
            this._base .getMesh().rotation.y += Math.radians(degrees);
        }
    }
    
    highLight(highLigthColor){
        if(this._wick.getMaterialSet() && this._base.getMaterialSet()){
            this._wick.getMaterialSet().materials[0].emissive.set(highLigthColor);

            this._base.getMaterialSet().materials[0].emissive.set(highLigthColor);
            this._base.getMaterialSet().materials[1].emissive.set(highLigthColor);
        }
    }
}
Turbine.count = 0;