var WINDOW = {
	ms_Width        : 0,
	ms_Height       : 0,
	ms_InitialWidth : 0,
	ms_InitialHeight: 0,
	ms_isFullScreen : false,
	ms_Callbacks    : {
		70: "WINDOW.toggleFullScreen()"		// Toggle fullscreen
	},
	ms_Canvas       : null,
	ms_Mouse        : new THREE.Vector2(),

	toggleFullscreen: function(){
		this.ms_isFullScreen = !this.ms_isFullScreen ;
		this.updateSize();
	},

	initialize: function initialize() {

		this.ms_InitialHeight = 600;
		this.updateSize();
		
		// Create callbacks from keyboard
		$(document).keydown(function(inEvent) { WINDOW.callAction(inEvent.keyCode); }) ;
		$(window).resize(function(inEvent) {
			WINDOW.updateSize();
			WINDOW.resizeCallback(WINDOW.ms_Width, WINDOW.ms_Height);
		});
		//mouse move listener
		window.addEventListener('mousemove', this.onMouseMove.bind(this), false );
	},

	onMouseMove( event ){
		var canvasWidth =  this.ms_Canvas.width();
		var canvasHeight =  this.ms_Canvas.height();
		var canvasLeft = this.ms_Canvas.position().left;
		var canvasTop  = this.ms_Canvas.position().top;
		
		this.ms_Mouse.x =  ( ( event.clientX - canvasLeft) / canvasWidth ) * 2 - 1;
		this.ms_Mouse.y = -( ( event.clientY - canvasTop) / canvasHeight ) * 2 + 1;
	},


	updateSize: function updateSize() {
		this.ms_Canvas = $('#canvas-3d');

		if(this.ms_isFullScreen){
			this.ms_Canvas.width('100%');
			this.ms_Canvas.height('100%');
			this.ms_Canvas.removeClass('canvasBorder')


			Card = $('#3Dcard');
			Card.removeClass('card-panel');

			this.ms_Width = $(window).width();
			this.ms_Height = $(window).height() - 4;
		}
		else{
			this.ms_Canvas = $('#canvas-3d');
			$(this).addClass('canvasBorder')

			Card = $('#3Dcard');
			Card.addClass('card-panel');

			this.ms_Width = this.ms_Canvas.width();
			this.ms_Height = this.ms_InitialHeight;
		}
		WINDOW.resizeCallback(WINDOW.ms_Width, WINDOW.ms_Height);
	},

	callAction: function callAction(inId) {
		if(inId in this.ms_Callbacks) {
			eval(this.ms_Callbacks[inId]);
			return false ;
		}
	},


	resizeCallback: function resizeCallback(inWidth, inHeight) {}
};

function fullscreen() {
	WINDOW.toggleFullscreen();
}


