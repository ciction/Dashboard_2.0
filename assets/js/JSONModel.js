class JSONModel{
    constructor(file, scene, name, onReadyFn, count, params){
        name = name + '_' + count || 'JSONModel_' + JSONModel.count;
        this._loader = new THREE.JSONLoader();
        var self = this;


        this._parameters = {
           scale: 30,
           userData:{
               ID: 0,
               baseType: 'JSONModel',
               type: 'JSONModel'
           }
        }

        if(params != null){
            this._parameters = {
                scale: 	params.scale ||   this._parameters.scale,
                userData: params.userData ||   this._parameters.userData
            }
        }


        // load a resource
        this._loader.load(

            // resource URL
            file,
            // Function when resource is loaded
            function ( geometry, materials ) {
                console.log("start loading json");

                //self._material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                // self._mesh = new THREE.Mesh( geometry , materials );

                self._materialSet  = new THREE.MultiMaterial( materials );
                self._mesh = new THREE.Mesh( geometry , self._materialSet );
                self._geometry = geometry;
                self._mesh.scale.set(self._parameters.scale,self._parameters.scale,self._parameters.scale);
                self._mesh.name = name;
                self._mesh.userData = self._parameters.userData;
                scene.add(self._mesh);
                if(onReadyFn){
                    onReadyFn(this);
                }
            },
            //onProgress
            function(){},
            //onError
            function(){
                console.log("resource not found");
            }
        );
    }

    getMesh(){
        return this._mesh;
    }
    getGeometry(){
        return this._geometry;
    }
    getMaterialSet(){
        return this._materialSet;
    }
}
JSONModel.count = 0
