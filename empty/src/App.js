define(
[
	'happy/app/BaseApp',
	'happy/polyfill/console',
	'happy/utils/Keyboard'
],
function (
	BaseApp,
	console,
	Keyboard
){
	var keyboard = new Keyboard();

	var App = function(){
		var 
		self = this;

		self.setup = function(){
			console.log("This is the container: " + self.container);
			
			self.setFPS("auto"); // requestAnimationFrame (default)
			//self.setFPS(120);	
			//self.setFPS(30);
			//self.setFPS(0); // no loop
			
		}
		self.update = function(dt, time){	

		}
		self.draw = function(dt, time){	
			self.container.innerHTML = "Runtime: " + time + "<br>FPS: " + (1 / dt);
		}
		self.onKeyUp = function(e){	
			console.log("Key up: " + keyboard.codeToChar(e.keyCode) );
		}
		self.onKeyDown = function(e){	
			console.log("Key down: " + keyboard.codeToChar(e.keyCode) );
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
			self.toggleFullscreen();
			//self.exitFullscreen();
			//self.toggleFullscreen();
			//self.isFullscreen;
		}
		self.onResize = function(size){	

		}
	}
	App.prototype = new BaseApp();
	return App;
});