;(function ( $, window, document, undefined ) {
  function j_isAnimation = function(){
    var animation = false,
        animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '',
        elm = document.createElement('div');

    if( elm.style.animationName !== undefined ) {
      return "";
    }else{
        for( var i = 0,len = domPrefixes.length; i < len; i++ ) {
          if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          //animationstring = pfx + 'Animation';
          //keyframeprefix = '-' + pfx.toLowerCase() + '-';
          //animation = true;
          return "-"+pfx+"-";
          }
        }
        return "--";
    }
  }
  //运行一次，确认前缀，提高效率
  j_PRE_fix = j_isAnimation();
  if(j_PRE_fix == "--"){
    j_PRE_fix = "";
  }


  $.fn.j_animation(option){
    //默认参数
    var options = {
      name:"",
      duration:1,
      timingFunc:"linear",
      delay:0,
      iteration:1,
      fillMode:"both",
      direction:"normal"
    }

    $.extend(options,option);

    //不使用this.css({})的方式来控制css是因为这种模式不支持字符串的加法
    this.css(j_PRE_fix+"animation-name",options.name);
    this.css(j_PRE_fix+"animation-duration",options.duration);
    this.css(j_PRE_fix+"animation-timing-function",options.timingFunc);
    this.css(j_PRE_fix+"animation-delay",options.delay);
    this.css(j_PRE_fix+"animation-iteration-count",options.iteration);
    this.css(j_PRE_fix+"animation-fill-mode",options.fillMode);
    this.css(j_PRE_fix+"animation-direction",options.direction);
  }

  $.fn.removeAnimation = function(){
    this.css(j_PRE_fix+"animation-name","");
    this.css(j_PRE_fix+"animation-duration","");
    this.css(j_PRE_fix+"animation-timing-function","");
    this.css(j_PRE_fix+"animation-delay","");
    this.css(j_PRE_fix+"animation-iteration-count","");
    this.css(j_PRE_fix+"animation-fill-mode","");
    this.css(j_PRE_fix+"animation-direction","");
  }
})( jQuery, window, document );
