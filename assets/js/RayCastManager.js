class RayCastManager{
    constructor(scene, camera){
        this.ms_Scene           = scene;
        this.ms_Camera          = camera;

    }


    update(){
        //RAYCASTING
        RayCastManager.ms_Raycaster.setFromCamera(WINDOW.ms_Mouse, this.ms_Camera);
        var intersects = RayCastManager.ms_Raycaster.intersectObjects(this.ms_Scene.children, true);

        //unselect previous if the raycast is hovering over a new object
        if(RayCastManager.ms_SelectedTurbine != null){
            if(intersects[0].object != RayCastManager.ms_SelectedTurbine){
                RayCastManager.ms_SelectedTurbine.highLight(0x000000);
                RayCastManager.ms_SelectedTurbine = null;
            }
        }
        //select and highlight a turbine when it is hovered
        if(intersects[0].object.userData.baseType == 'turbine'){
            var nr                  = intersects[0].object.userData.Nr;
            var type                = intersects[0].object.userData.type;
            //console.log('turbine selected: ' + nr + " type: " + type);
            RayCastManager.ms_SelectedTurbine = Turbine.TurbineList[nr-1];
            RayCastManager.ms_SelectedTurbine.highLight(0x9999bb);
        }
    }

    static getHoveredTurbineNr(){
        if(RayCastManager.ms_SelectedTurbine){
            return RayCastManager.ms_SelectedTurbine._base._mesh.userData.Nr;
        }
    }

}
RayCastManager.ms_Raycaster = new THREE.Raycaster();
RayCastManager.ms_SelectedTurbine = null;