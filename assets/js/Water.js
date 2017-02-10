class Water{
    constructor(renderer,camera, scene, directionalLight){

        this._parameters = {
            width: 2000,
            height: 2000,
            widthSegments: 250,
            heightSegments: 250,
            depth: 1500,
            param: 4,
            filterparam: 1
        }

        // Load textures
        var waterNormals = new THREE.ImageUtils.loadTexture('assets/img/waternormals.jpg');
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;



        // Create the water effect
        this._waterShader = new THREE.Water(renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 	1.0,
            sunDirection: directionalLight.position.normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 50.0
        });
        this._mesh        = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(this._parameters.width * 500, this._parameters.height * 500, 10, 10),
            this._waterShader.material
        );

        this._mesh.add(this._waterShader);
        this._mesh.rotation.x = - Math.PI * 0.5;

    }

    getMesh(){
        return this._mesh;
    }
    getShader(){
        return this._waterShader;
    }
}