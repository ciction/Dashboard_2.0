class SkyBox{
    constructor(){

        this._skybox_sunset = {
            path: "assets/img/skybox_sunset/",
            right : 'px.jpg',
            left  : 'nx.jpg',
            top   : 'py.jpg',
            bottom: 'ny.jpg',
            front : 'pz.jpg',
            back  : 'nz.jpg'
        };


        this._skybox_neutral = {
            path: "assets/img/skybox_neutral/",
            right  : 'skyboxsun_right.png',
            left   : 'skyboxsun_left.png',
            top    : 'skyboxsun_top.png',
            bottom : 'skyboxsun_bottom.png',
            front  : 'skyboxsun_front.png',
            back   : 'skyboxsun_back.png'
        };


        this._skybox = this._skybox_neutral;
        var skybox = this._skybox;

        
        var aCubeMap = THREE.ImageUtils.loadTextureCube([
            skybox.path + skybox.right,
            skybox.path + skybox.left,
            skybox.path + skybox.top,
            skybox.path + skybox.bottom,
            skybox.path + skybox.front,
            skybox.path + skybox.back
        ]);

        aCubeMap.format = THREE.RGBFormat;

        var aShader = THREE.ShaderLib['cube'];
        aShader.uniforms['tCube'].value = aCubeMap;

        var aSkyBoxMaterial = new THREE.ShaderMaterial({
            fragmentShader: aShader.fragmentShader,
            vertexShader: aShader.vertexShader,
            uniforms: aShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        this._mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1000000, 1000000, 1000000),
            aSkyBoxMaterial
        );
    }

    getMesh(){
        return this._mesh;
    }

    setSunset(){
        this._skybox = this._skybox_sunset;
    }
}