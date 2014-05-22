define(
[
	'happy/app/BaseApp',
	'happy/utils/Easing'
],
function (
	BaseApp,
	Easing
){
	var equasions = [
		'inQuad', 
		'outQuad', 
		'inOutQuad', 
		'inCubic', 
		'outCubic', 
		'inOutCubic', 
		'inQuart', 
		'outQuart', 
		'inOutQuart', 
		'inQuint', 
		'outQuint', 
		'inOutQuint', 
		'inSine', 
		'outSine', 
		'inOutSine', 
		'inExpo', 
		'outExpo', 
		'inOutExpo', 
		'inCirc', 
		'outCirc', 
		'inOutCirc', 
		'inElastic', 
		'outElastic', 
		'inOutElastic', 
		'inBack', 
		'outBack', 
		'inOutBack', 
		'inBounce', 
		'outBounce', 
		'inOutBounce'
	]
	var App = function(options){
		var self = this,
		node,
		easingEquasion;
		
		self.setup = function(){
			var select = document.createElement('select');
			for (var i = 0 ; i < equasions.length; i++) {
				var option = document.createElement('option');
				option.value = equasions[i];
				option.innerHTML = equasions[i];
				select.appendChild(option);
			};
			select.onchange = function(e){
				setEasingEquasion(select.options[select.selectedIndex].value + 'Shape');
			}
			self.container.appendChild(select);
			setEasingEquasion(equasions[0] + 'Shape');

			node = document.createElement('div');
			node.style.position = 'absolute';
			node.style.backgroundColor = 'red';
			node.style.width = '100px';
			node.style.height = '100px';
			self.container.appendChild(node);
		}		
		var setEasingEquasion = function(name){
			easingEquasion = Easing[name];
		}
		self.update = function(dt, time) {
			var value = (time % 2) / 2;
			
			var x = easingEquasion(value)  * 500;
			node.style.left = x+'px';
		}
		
	}
	App.prototype = new BaseApp();

	return App;
});