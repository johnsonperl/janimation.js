//下面两行根据浏览器设定字体大小，站内使用rem控制字体大小
var html = document.documentElement;
html.style.fontSize = html.clientWidth+"px";

var sys = {};
//绑定touch事件
sys.inittouch = function(id) {
	var j = document.getElementById(id);
	j.addEventListener("touchstart", sys.ts);
	j.addEventListener("touchmove", sys.tm);
	j.addEventListener("touchend", sys.te)
};
//删除touch事件
sys.removeTouch = function(id){
	var j = document.getElementById(id);
	j.removeEventListener("touchstart", sys.ts);
	j.removeEventListener("touchmove", sys.tm);
	j.removeEventListener("touchend", sys.te)
}
//touch started
sys.ts = function(e) {
	//e.preventDefault();
	sys.endY = undefined;
	sys.endX = undefined;
	sys.yInit = undefined;
	sys.startY = e.touches[0].pageY;
	sys.startX = e.touches[0].pageX;
	sys.yInit = ahk.step * ahk.h;
	$(".section").removeTransition();
}
//touch move
sys.tm = function(e) {
	e.preventDefault();
	sys.endY = e.touches[0].pageY;
	sys.endX = e.touches[0].pageX;

	var dis = Math.abs(sys.startY - sys.endY);

	if (sys.startY > sys.endY) {
		if(ahk.step == $(".section").length -1){
			//$("#section_"+ahk.step).j_transform({y:(-sys.yInit - dis)+"px"})
		}else{
			$("#section_"+(ahk.step+1)).j_transform({y:(-sys.yInit - dis)+"px"})
		}
	} else{
		$("#section_"+ahk.step).j_transform({y:(-sys.yInit + dis)+"px"})
	}
}

//touch end
sys.te = function() {
	if(sys.endY == undefined){
		sys.endY = sys.startY;
	}
	
	if(sys.endX == undefined){
		sys.endX = sys.startX;
	}

	if (sys.startY == sys.endY || Math.abs(ahk.startY - ahk.endY) <= 20){

	}else if (sys.startY > sys.endY){
		sys.moveup();
	}else{
		sys.movedown();
	}
}
//手指往下滑，切换场景
sys.movedown = function(){
	if(ahk.step > 0 && Math.abs(sys.startY - sys.endY) > 20){
		sys.preScene()
	}else{
		sys.thisScene()
	}
}
//手指往上滑，切换场景
sys.moveup = function(){
	if(ahk.step < ahk.size -1 && Math.abs(sys.startY - sys.endY) > 20){
		sys.nextScene()
	}else{
		sys.thisScene()
	}
}

sys.thisScene = function(){
	$("#section_"+ahk.step).j_transition({timingFunc:"cubic-bezier(0.04, 1.01, 0.18, 0.96)",duration:"0.4s"});
	$("#section_"+ahk.step).j_transform({y:(-ahk.h * ahk.step)+"px"})
}

sys.nextScene = function(){
	if(ahk.step >= ahk.size - 1){
		return;
	}
	ahk.step++;
	$("#section_" + ahk.step).j_transition({
		timingFunc: "cubic-bezier(0.04, 1.01, 0.18, 0.96)",
		duration: "0.4s"
	});
	$("#section_" + ahk.step).j_transform({
		y: (-ahk.h * ahk.step) + "px"
	})
	ahk.scene();
}

sys.preScene = function(){
	if(ahk.step == 0){
		return
	}
	var tp = ahk.step;
	$("#section_" + tp).j_transition({
		timingFunc: "cubic-bezier(0.04, 1.01, 0.18, 0.96)",
		duration: "0.4s"
	});
	$("#section_" + tp).j_transform({
		y: 0
	})
	ahk.step--;
	ahk.scene();
}
//播放和暂停音乐
sys.playMusic = function(){
	if(!sys.music){
		$(".music span").removeAnimation();
		$(".music").css({"background-image":""});
		$("audio")[0].pause();
		sys.music = true;
	}else{
		$(".music span").j_animation({name:"spinner",duration:"1s",iteration:"infinite"})
		$(".music").css({"background-image":"url(static/images/music.gif)"});
		$("audio")[0].play();
		sys.music = false;
	}
}
//提示手指往上滑动的底部小图标
sys.tips = function(){
	$(".tips").j_animation({name:"fadeInUp",duration:"1s",timingFunc:"cubic-bezier(0.24, 0.5, 0.26, 0.8)",iteration:"infinite"})
}
sys.stopTips = function(){
	$(".tips").removeAnimation();
}
//判断是不是wechat内置浏览器
sys.isWeixinBrowser = function(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}