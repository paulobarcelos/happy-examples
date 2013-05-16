define(
[
	'happy/app/BaseApp',
	'happy/polyfill/console',
	'happy/utils/Keyboard',
	'happy/utils/DOM',

	'happy/_libs/box2d',
	'happy/_libs/threejs'
],
function (
	BaseApp,
	console,
	Keyboard,
	DOM,

	Box2D,
	threejs	
){
	var dom = new DOM();
	var keyboard = new Keyboard();

	var App = function(){
		var 
		self = this,
		renderer,
		scene,
		camera,
		world;

		self.setup = function(){
			world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0,-10), true);

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
			camera.position.set(0, 0, 50);
			scene.add(camera);

			
			var boxGeometry = new threejs.Geometry();
			boxGeometry.vertices.push(new threejs.Vector3(-1.0,  1.0, 0.0));
			boxGeometry.vertices.push(new threejs.Vector3( 1.0,  1.0, 0.0));
			boxGeometry.vertices.push(new threejs.Vector3( 1.0, -1.0, 0.0));
			boxGeometry.vertices.push(new threejs.Vector3(-1.0, -1.0, 0.0));
			boxGeometry.faces.push(new threejs.Face4(0, 1, 2, 3));

			var boxMaterial = new threejs.MeshBasicMaterial({color:0x000000, side:threejs.DoubleSide });
			
			var boxMesh = new threejs.Mesh( boxGeometry, boxMaterial );
			scene.add(boxMesh);

			var boxFixture = new Box2D.Dynamics.b2FixtureDef;
			boxFixture.density = 1.0;
			boxFixture.friction = 0.5;
			boxFixture.restitution = 0.2;
			boxFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape;
			boxFixture.shape.SetAsBox(1, 1);

			var boxBody = new Box2D.Dynamics.b2BodyDef;
			boxBody.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
			boxBody.position.x = 0;
			boxBody.position.y = 5;
			boxBody.angle = Math.random();
			boxBody.userData = boxMesh;

			world.CreateBody(boxBody).CreateFixture(boxFixture)


			var floorGeometry = new threejs.Geometry();
			floorGeometry.vertices.push(new threejs.Vector3(-5.0,  0.5, 0.0));
			floorGeometry.vertices.push(new threejs.Vector3( 5.0,  0.5, 0.0));
			floorGeometry.vertices.push(new threejs.Vector3( 5.0, -0.5, 0.0));
			floorGeometry.vertices.push(new threejs.Vector3(-5.0, -0.5, 0.0));
			floorGeometry.faces.push(new threejs.Face4(0, 1, 2, 3));
			
			var floorMaterial = new threejs.MeshBasicMaterial({color:0xff0000, side:threejs.DoubleSide });

			var floorMesh = new threejs.Mesh( floorGeometry, floorMaterial );
			scene.add(floorMesh);

			var floorFixture = new Box2D.Dynamics.b2FixtureDef;
			floorFixture.density = 1.0;
			floorFixture.friction = 0.5;
			floorFixture.restitution = 0.2;
			floorFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape;
			floorFixture.shape.SetAsBox(5, 0.5);

			var floorBody = new Box2D.Dynamics.b2BodyDef;
			floorBody.type = Box2D.Dynamics.b2Body.b2_staticBody;
			floorBody.position.x = 0;
			floorBody.position.y = -5;
			floorBody.userData = floorMesh;

			world.CreateBody(floorBody).CreateFixture(floorFixture)
		}
		self.update = function(dt, time){	
			world.Step(dt*2, 10, 10);
			world.ClearForces();

			var object = world.GetBodyList(), mesh, position;
			while ( object ) {

				mesh = object.GetUserData();

				if ( mesh ) {
					// Nice and simple, we only need to work with 2 dimensions
					var position = object.GetPosition();
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.rotation.z = object.GetAngle();
				}

				object = object.GetNext(); // Get the next object in the scene
			}
		}
		self.draw = function(dt, time) {
			renderer.render(scene, camera);
		}
		self.onKeyUp = function(e) {
			switch( keyboard.codeToChar(e.keyCode) ){
				case "SPACEBAR":
					//self.toggleFullscreen();
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
