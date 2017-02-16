var DEMO = {
	ms_Canvas         : null,
	ms_Renderer       : null,
	ms_Camera         : null,
	ms_Scene          : null,
	ms_Controls       : null,
	ms_WaterShader    : null,
	ms_FilesDND       : null,
	ms_Clickable      : [],
	ms_isDebugMode    : true,
	ms_selectedObjects: [],
	ms_RayCastManager : null,
	
    enable: (function enable() {
        try {
            var aCanvas = document.createElement('canvas');
            return !! window.WebGLRenderingContext && (aCanvas.getContext('webgl') || aCanvas.getContext('experimental-webgl'));
        }
        catch(e) {
            return false;
        }
    })(),
	
	initialize: function initialize(inIdCanvas, inParameters) {
		this.ms_Canvas = $('#'+inIdCanvas);
		
		// Initialize Renderer, Camera, Projector and Scene
		this.ms_Renderer = this.enable? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		//this.ms_Canvas.html(this.ms_Renderer.domElement);
		this.ms_Canvas.append(this.ms_Renderer.domElement);
		this.ms_Scene = new THREE.Scene();
		
		this.ms_Camera = new THREE.PerspectiveCamera(55.0, WINDOW.ms_Width / WINDOW.ms_Height, 0.5, 3000000);
		this.ms_Camera.position.set(0, Math.max(inParameters.width * 1.5, inParameters.height) / 8, -inParameters.height);
		this.ms_Camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.ms_RayCastManager = new RayCastManager(this.ms_Scene, this.ms_Camera);

		// Initialize Orbit control
		this.ms_Controls = new THREE.OrbitControls(this.ms_Camera, this.ms_Renderer.domElement);
		this.ms_Controls.userPan = false;
		this.ms_Controls.userPanSpeed = 0.0;
		this.ms_Controls.maxDistance = 5000.0;
		this.ms_Controls.maxPolarAngle = Math.PI * 0.495;
	
		// Add light
		var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		directionalLight.position.set(-600, 300, 600);
		this.ms_Scene.add(directionalLight);
		var ambientLight = new THREE.AmbientLight( 0x3c464c, 1 ); // soft white light
		this.ms_Scene.add(ambientLight);


		// Add water
		var water = new Water(this.ms_Renderer, this.ms_Camera, this.ms_Scene, directionalLight);
		this.ms_Scene.add(water.getMesh());
		this.ms_WaterShader = water.getShader();

		// Add SkyBox
		this.ms_Scene.add(new SkyBox().getMesh());

		// Add Models
		this.ms_Scene.add(new Cube());


		//create Turbines
		this._turbineManager = new TurbineManager(this.ms_Scene);
		this._turbineManager.createTurbines();
		





		// Add Debug elements
		if(this.ms_isDebugMode){
			var axisHelper = new THREE.AxisHelper( 400 );
			this.ms_Scene.add( axisHelper );

			var directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 70);
			this.ms_Scene.add(directionalLightHelper);
			directionalLightHelper.position.set(-600, 300, 600);
		}
	},

	
	display: function display() {
		this.ms_WaterShader.render();
		this.ms_Renderer.render(this.ms_Scene, this.ms_Camera);
	},


	update: function update() {
		if (this.ms_FilesDND != null) {
			this.ms_FilesDND.rotation.y += 0.01;
		}

		for (var i=0;i< Turbine.TurbineList.length;i++){
			Turbine.TurbineList[i].animate(.1);

		}



		this.ms_WaterShader.material.uniforms.time.value += 1.0 / 60.0;
		this.ms_Controls.update();

		//this.ms_Controls.update();
		this.ms_RayCastManager.update();

		this.display();
	},
	
	resize: function resize(inWidth, inHeight) {
		this.ms_Camera.aspect =  inWidth / inHeight;
		this.ms_Camera.updateProjectionMatrix();
		this.ms_Renderer.setSize(inWidth, inHeight);
		this.ms_Canvas.append(this.ms_Renderer.domElement);
		//this.ms_Canvas.html(this.ms_Renderer.domElement);
		this.display();
	}


};




