define(
[
	'happy/app/BaseApp',
	'happy/polyfill/console',
	'happy/utils/DOM',
	'happy/utils/Keyboard',
	'happy/_libs/threejs'
],
function (
	BaseApp,
	console,
	DOM,
	Keyboard,
	threejs
){

	var dom = new DOM();
	var keyboard = new Keyboard();

	var App = function(options){
		var 
		self = this,
		renderer,
		scene,
		camera;
		
		self.setup = function(){
			var size = dom.measure(self.container);

			renderer = new threejs.WebGLRenderer({
					antialias: true, // to get smoother output
					preserveDrawingBuffer: true	// to allow screenshot
			});
			renderer.setClearColorHex( 0xBBBBBB, 1 );
			renderer.setSize(size.width, size.height);
			self.container.appendChild(renderer.domElement);

			scene = new threejs.Scene();

			camera = new threejs.PerspectiveCamera(35, size.width/ size.height, 1, 10000 );
			camera.position.set(0, 0, 5);
			scene.add(camera);

			var geometry = new threejs.TorusGeometry( 1, 0.42 );
			var material = new threejs.MeshNormalMaterial();
			var mesh = new threejs.Mesh( geometry, material );
			scene.add(mesh);
		}		
		self.update = function(dt, time) {
			camera.rotation.z = Math.sin(time);
		}
		self.draw = function(dt, time) {
			renderer.render(scene, camera);
		}
		self.onKeyUp = function(e) {
			switch( keyboard.codeToChar(e.keyCode) ){
				case "SPACEBAR":
					self.toggleFullscreen();
				break;
			}
		}
		self.onResize = function(size) {
			renderer.setSize(size.width, size.height);
			camera.aspect = size.width/ size.height;
			camera.updateProjectionMatrix();
		}
	}
	App.prototype = new BaseApp();

	return App;
});