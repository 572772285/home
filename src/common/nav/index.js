require('./index.css')
var _user=require('user/index.js')
var _util=require('util/index.js')
var nav={
	init:function(){
		this.bindEvent();
		this.loadUserInfo()
		this.loadCartInfo()
		return this
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload()
			},function(message){
				_util.showErrorMessage(message)
				alert('aaa')
			})
		})
	},
	loadCartInfo:function(){

	},
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			console.log(userInfo)
			$('.not-login').hide()
			$('.login')
			.show()
			.find('.username')
			.text(userInfo.username)
		},function(){
			alert('确认过眼神，你是没登陆的人，快登陆吧~')
		})
	}

}
module.exports=nav.init()