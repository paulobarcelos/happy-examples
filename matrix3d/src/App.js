define(
[
	'happy/app/BaseApp',
	'happy/_libs/glmatrix',
	'happy/_libs/dat.gui'
],
function (
	BaseApp,
	glmatrix,
	Gui
){

	var App = function(){
		var 
		self = this,
		windowSize,
		transform,
		camera,
		translate,
		gui,
		node;

		self.setup = function(){

			transform = glmatrix.mat4.create();
			camera = glmatrix.mat4.create();


			gui = new Gui();
			gui.translateX = 0;
			gui.translateY = 0;
			gui.translateZ = -1.00001;
			gui.add(gui, 'translateX', -500, 500);
			gui.add(gui, 'translateY', -500, 500);
			gui.add(gui, 'translateZ', -1, 1);
			gui.rotateX = 0;
			gui.rotateY = 0;
			gui.rotateZ = 0;
			gui.add(gui, 'rotateX', -Math.PI, Math.PI);
			gui.add(gui, 'rotateY', -Math.PI, Math.PI);
			gui.add(gui, 'rotateZ', -Math.PI, Math.PI);
			gui.scale = 1;
			gui.add(gui, 'scale', -5, 5);
			gui.vfov = 2;
			gui.add(gui, 'vfov', 0, Math.PI);

			node = document.createElement('div');
			node.style.backgroundColor = '#f00';
			node.style.width = '200px';
			node.style.height = '200px';
			node.style.marginLeft = '-100px';
			node.style.marginTop = '-100px';
			node.innerHTML = "HELLO";		
			node.style.webkitTransformOrigin = 'center';	
			self.container.appendChild(node);
		}
		self.update = function(dt, time){	
			glmatrix.mat4.identity(transform);
			glmatrix.mat4.identity(camera);

			glmatrix.mat4.perspective(camera, gui.vfov , 1, -1000, 10000);
			glmatrix.mat4.invert(camera, camera);

		
			glmatrix.mat4.translate(transform, transform, [
				gui.translateX,
				gui.translateY,
				gui.translateZ]);
			
			

			glmatrix.mat4.scale(transform, transform, [gui.scale, gui.scale, gui.scale]);

			glmatrix.mat4.multiply(transform, transform,camera);

			/*glmatrix.mat4.translate(transform, transform, [
				windowSize.width/2,
				windowSize.height/2, 
				0]);
*/
			node.style.webkitTransform = getMatrixString(transform);

		}
		self.draw = function(dt, time){	
			
		}
		self.onKeyUp = function(e){	
			
		}
		self.onKeyDown = function(e){	

		}
		self.onMouseOver = function(e){	

		}
		self.onMouseOut = function(e){	

		}
		self.onMouseOut = function(e){	

		}
		self.onMouseUp = function(e){	

		}
		self.onMouseMove = function(e){	

		}
		self.onClick = function(e){	

		}
		self.onDoubleClick = function(e){	

		}
		self.onResize = function(size){	
			windowSize = size;
		}
		var getMatrixString = function(matrix){
			return 'matrix3d(' +matrix[0] + ', ' + matrix[1] + ', ' + matrix[2] + ', ' + matrix[3] + ', ' +
								matrix[4] + ', ' + matrix[5] + ', ' + matrix[6] + ', ' + matrix[7] + ', ' +
								matrix[8] + ', ' + matrix[9] + ', ' + matrix[10] + ', ' + matrix[11] + ', ' + 
								matrix[12] + ', ' + matrix[13] + ', ' + matrix[14] + ', ' + matrix[15] + ')'
		}
	}
	App.prototype = new BaseApp();
	return App;
});