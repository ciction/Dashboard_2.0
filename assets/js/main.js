var modalManager = new ModalManager();

function mainLoop() {
	requestAnimationFrame(mainLoop);
	DEMO.update();
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    
    var mouse = new THREE.Vector2(
        ( event.clientX / window.innerWidth ) * 2 - 1, 
        - ( event.clientY / window.innerHeight ) * 2 + 1 );

	RayCastManager.ms_Raycaster.setFromCamera( mouse, DEMO.ms_Camera );
    var intersects = RayCastManager.ms_Raycaster.intersectObjects( DEMO.ms_Clickable );

    if (intersects.length > 0) {  
        intersects[0].object.callback();
    }

	modalManager.openModal(RayCastManager.getHoveredTurbineID())
}



$(function() {
	WINDOW.initialize();

	document.addEventListener('click', onDocumentMouseDown, false);
	
	var parameters = {
		width: 2000,
		height: 2000,
		widthSegments: 250,
		heightSegments: 250,
		depth: 1500,
		param: 4,
		filterparam: 1,
	};
	DEMO.initialize('canvas-3d', parameters);

	
	WINDOW.resizeCallback = function(inWidth, inHeight) { DEMO.resize(inWidth, inHeight); };



	
	DEMO.resize(WINDOW.ms_Width, WINDOW.ms_Height);
	
	mainLoop();
});

