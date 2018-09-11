require('./index.css')
var _util=require('util/index.js')
//登陆页面逻辑
var page={
	init:function(){
		this.bindEvent();
		this.onload()
	},
	onload:function(){
		var keyword=_util.getParamFromUrl('keyword')
		if(keyword){
			$('#search-input').val(keyword)
		}
	},
	//绑定事件
	bindEvent:function(){
		var _this=this;
		$('#btn-search').on('click',function(){
			_this.submit()
		})
		$('#search-input').on('keyup',function(e){
			if(e.keyCode==13){
				_this.submit()
			}
		})
	},
	submit:function(){
		var keyword=$.trim($('#search-input').val())
		window.location.href='./list.html?keyword='+keyword
		/*
		if(keyword){
			window.location.href='./list.html?keyword='+keyword
		}else{
			_util.goHome()
		}
		*/
	},
}
$(function(){
	page.init()
})
