;
(function($, window, document, undefined) {
	function j_isAnimation() {
		var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
			pfx = '',
			elm = document.createElement('div');

		if (elm.style.animationName !== undefined) {
			return "";
		} else {
			for (var i = 0, len = domPrefixes.length; i < len; i++) {
				if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
					pfx = domPrefixes[i];
					return "-" + pfx + "-";
				}
			}
			return "";
		}
	}
	//运行一次，确认前缀，提高效率
	var j_PRE_fix = j_isAnimation();

	$.fn.j_animation = function(option) {
		//默认参数
		var options = {
			name: "",
			duration: "1s",
			timingFunc: "linear",
			delay: 0,
			iteration: 1,
			fillMode: "both",
			direction: "normal"
		}

		$.extend(options, option);

		var cssObj = {};
		cssObj[j_PRE_fix + "animation-duration"] = options.duration;
		cssObj[j_PRE_fix + "animation-timing-function"] = options.timingFunc;
		cssObj[j_PRE_fix + "animation-delay"] = options.delay;
		cssObj[j_PRE_fix + "animation-iteration-count"] = options.iteration;
		cssObj[j_PRE_fix + "animation-fill-mode"] = options.fillMode;
		cssObj[j_PRE_fix + "animation-direction"] = options.direction;
		cssObj[j_PRE_fix + "animation-name"] = options.name;
		this.css(cssObj);
	}

	$.fn.j_transform = function(option) {
		var options = {
			x: 0,
			y: 0,
			scale: 1,
			rotate: "0deg"
		}
		$.extend(options, option);

		var cssObj = {};
		cssObj[j_PRE_fix + "transform"] = "translate(" + options.x + "," + options.y + ") scale(" + options.scale + ") rotate(" + options.rotate + ")";

		this.css(cssObj);
	}

	$.fn.j_transition = function(option) {
		//参数中关于时间的必须加上“s”
		var options = {
			property: "all",
			timingFunc: "linear",
			duration: "1s",
			delay: "0s"
		}
		$.extend(options, option);

		var str = options.property + " " + options.duration + " " + options.timingFunc + " " + options.delay;

		this.each(function() {
			if (j_PRE_fix == "") {
				this.style["transition"] = str;
			} else {
				var temp = j_PRE_fix.replace(/\-/g, "");
				temp = temp.substring(0, 1).toUpperCase() + temp.substring(1);
				this.style[temp + "Transition"] = str;
			}
		})
	}

	$.fn.removeAnimation = function() {
		this.removeTransform();
		this.removeKeyAnimation();
		this.removeTransition()
	}

	$.fn.removeTransform = function() {
		var cssObj = {};
		cssObj[j_PRE_fix + "transform"] = "";
		this.css(cssObj);
	}

	$.fn.removeKeyAnimation = function() {
		var cssObj = {};
		cssObj[j_PRE_fix + "animation-duration"] = "";
		cssObj[j_PRE_fix + "animation-timing-function"] = "";
		cssObj[j_PRE_fix + "animation-delay"] = "";
		cssObj[j_PRE_fix + "animation-iteration-count"] = "";
		cssObj[j_PRE_fix + "animation-fill-mode"] = "";
		cssObj[j_PRE_fix + "animation-direction"] = "";
		cssObj[j_PRE_fix + "animation-name"] = "";
		this.css(cssObj);
	}

	$.fn.removeTransition = function() {
		this.each(function() {
			if (j_PRE_fix == "") {
				this.style["transition"] = "";
			} else {
				var temp = j_PRE_fix.replace(/\-/g, "");
				temp = temp.substring(0, 1).toUpperCase() + temp.substring(1);
				this.style[temp + "Transition"] = "";
			}
		})
	}
})(jQuery, window, document);