class RayCastManager{
    constructor(scene, camera){
        this.ms_Scene           = scene;
        this.ms_Camera          = camera;

    }


    update(){
        //RAYCASTING
        RayCastManager.ms_Raycaster.setFromCamera(WINDOW.ms_Mouse, this.ms_Camera);
        var intersects = RayCastManager.ms_Raycaster.intersectObjects(this.ms_Scene.children, true);
        if(intersects[0].object.userData.baseType == 'turbine'){
            var id                  = intersects[0].object.userData.ID;
            var type                = intersects[0].object.userData.type;
            //console.log('turbine selected: ' + id + " type: " + type);
            RayCastManager.ms_SelectedTurbine = Turbine.TurbineList[id-1];
            RayCastManager.ms_SelectedTurbine.highLight(0x9999bb);
        }
        else{
            if(RayCastManager.ms_SelectedTurbine){
                RayCastManager.ms_SelectedTurbine.highLight(0x000000);
                RayCastManager.ms_SelectedTurbine = null;
            }
        }
    }

    static getHoveredTurbineID(){
        if(RayCastManager.ms_SelectedTurbine){
            return RayCastManager.ms_SelectedTurbine._base._mesh.userData.ID;
        }
    }

}
RayCastManager.ms_Raycaster = new THREE.Raycaster();
RayCastManager.ms_SelectedTurbine = null;