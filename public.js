function Naughty(obj){}//想写一个运动类

/**
 * @author lily
 * move
 */
function getStyle(obj, attr){//获取样式
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}

function buffer(obj, json, fn){//缓冲运动
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//这一次运动就结束了——所有的值都到达了
		for(var attr in json){
			//1.取当前的值
			var iCur=0;
			if(attr=='opacity'){
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}else{
				iCur=parseInt(getStyle(obj, attr));
			}
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//3.检测停止
			if(iCur!=json[attr]){
				bStop=false;
			}
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		if(bStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	}, 30);
}
function constant(obj, json, fn){//匀速运动
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//这一次运动就结束了——所有的值都到达了
		for(var attr in json){
			//1.取当前的值
			var iCur=0;
			if(attr=='opacity'){
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}else{
				iCur=parseInt(getStyle(obj, attr));
			}
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//3.检测停止
			if(Math.abs(iCur - json[attr]) > iSpeed){
				bStop=false;
			}
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		if(bStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	}, 30);
}
/*
*公共函数
*/
var getElementsByClassName = function (searchClass, node,tag) {//类名获取元素
	if(document.getElementsByClassName){
		var nodes =  (node || document).getElementsByClassName(searchClass),result = [];
		for(var i=0 ;node = nodes[i++];){
			if(tag !== "*" && node.tagName === tag.toUpperCase()){
				result.push(node);
			}
		}
		return result;
	}else{
		node = node || document;
		tag = tag || "*";
		var classes = searchClass.split(" "),
			elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
			patterns = [],
			current,
			match;
		var i = classes.length;
		while(--i >= 0){
			patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
		}
		var j = elements.length;
		while(--j >= 0){
			current = elements[j];
			match = false;
			for(var k=0, kl=patterns.length; k<kl; k++){
				match = patterns[k].test(current.className);
				if (!match){
					break;
				}
			}
			if (match){
				result.push(current);
			}
		}
		return result;
	}
}
function mousePos(e){//获取鼠标位置
	var x,y;
	var e = e||window.event;
	return {
		x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
		y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop
	};
}