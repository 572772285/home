require('common/nav/index.js')
require('common/footer/index.js')
require('common/search/index.js')
require('./index.css')
var _util=require('util/index.js')
var _user=require('user/index.js')
var _side=require('common/side/index.js')
var tpl = require('./index.tpl')

var page = {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-center')
		$('.right').html('<div class="loading"></div>');
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			var html = _util.render(tpl,userInfo);
			$('.right').html(html)
		})
	}
}

$(function(){
	page.init();
})