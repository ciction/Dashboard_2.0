class Cube{
    constructor(params){
        Cube.count ++;

        this._parameters = {
            width: 30,
            height: 30,
            depth: 30,
            x: 0,
            y: 0,
            z: 0,
            color: 0x00ff00,
            name: 'Cube_' + Cube.count
        }

        if(params != null){
            this._parameters = {
                width: 	params.width ||  30,
                height: params.height || 30,
                depth: 	params.depth ||  30,
                x: 		params.x ||0,
                y:		params.y ||0,
                z: 		params.z ||0,
                color:	params.color ||0x00ff00,
                name:   params.name || 'Cube_' + Cube.count
            }
        }



        this._geometry = new THREE.BoxGeometry( this._parameters.width,this._parameters.height,this._parameters.depth );
        this._material = new THREE.MeshStandardMaterial( { color: this._parameters.color } );
        this._mesh = new THREE.Mesh( this._geometry, this._material  );
        this._mesh.name = this._parameters.name;

        this._mesh.position.set(this._parameters.x, this._parameters.y, this._parameters.z)
        return this._mesh;
    }
}
Cube.count = 0;