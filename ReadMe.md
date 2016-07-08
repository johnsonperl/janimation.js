# 说明

该文件中含有控transform、transition和animation的函数。该文件唯一方便的地方是通过兼容处理，减少css代码的数量。可用于手机上的动画效果控制，速度还行。写这个文件的目的是方便自己做微信 H5 页面动画专题，达到外面使用类似“易企秀”、“兔展”等免费的微场景的效果，而且可以完全自定义页面中的表单等。**注意，这里没有回调函数的功能，因为我现在接触的项目中用不着**

**使用该文件前，必须知道 css3 中 transform、transition 和 animation 的区别**

#### 控制 transform，不含过渡效果
> `$(selector).j_animation({x:"50px",y:"50px",scale:"2.0",rotate:"45deg"})` 

> 默认值是 {x:0,y:0,scale:1,rotate:"0deg"}

> `x` 是 translateX，`y` 是 translateY，scale 和 rotate 就不解释了



#### 控制 transition
> `$(selector).j_transition({property:"width",timingFunc:"ease",duration:"1s",delay:"0.2s"})`

> 默认值是 {property:"all",timingFunc:"linear",duration:"1s",delay:"0s"} *这里的时间都要加上时间秒“s”，这块处理的不是很好，以后再说*

> 参数很明显，不解释

#### 控制 animation
> `$(selector).j_animation({name:"fadeInLeft",duration:"1s"})`

> 默认值是 {name:"",duration:"1s",timingFunc:"linear",delay:0,iteration:1,fillMode:"both",direction:"normal"}

> `name` 就是 animation-name，其他参数很明显。不清楚的话，就需要先了解 css3 的 animation 的参数的含义。

#### 清除animation、transition和transform
> `$(selector).removeAnimation()` ，但是不清除修改过的其他css属性，比如 width、height、opacity等

> 推荐使用国外某人做的[CSS3 动画库](http://daneden.github.io/animate.css/ "CSS3 动画库")，当然大神可以自己来写效果，对了，大神肯定有更好的工具，求推荐！！！

### 使用方法
``` html
<script src="调用 jQuery 文件"></script>
<script src="https://raw.githubusercontent.com/johnsonperl/janimation.js/master/janimation.js"></script>
<link href="http://daneden.github.io/animate.css/" rel="stylesheet">
<script>
$("div").j_animation({name:"fadeInLeft"});
</script>
```
