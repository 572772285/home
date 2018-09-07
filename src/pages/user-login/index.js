require('./index.css')
require('common/logo/index.js')
require('common/footer/index.js')
var _util=require('util/index.js')
var _user=require('user/index.js')
var formErr = {
	show:function(validateResult){
		$('.error-item').show().find('.error-msg').text(validateResult.msg)
	},
	hide:function(){
		$('.error-item').hide().find('.error-msg').text('')
	},
}
//登陆页面逻辑
var page={
	init:function(){
		this.bindEvent()
	},
	//绑定事件
	bindEvent:function(){
		var _this=this;
		$('#btn-sumbit').on('click',function(){
			_this.submit()
		})
		$('input').on('keyup',function(e){
			if(e.keyCode==13){
				_this.submit()
			}
		})
	},
	submit:function(){
		// alert('aa')
		//1获取数据
		var formData={
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//2验证数据
		var validateResult=this.validate(formData)
		//3提交
		//验证通过
		if(validateResult.status){
			formErr.hide()
			_user.login(formData,function(){
				window.location.href=_util.getParamFromUrl('redirect')||'/index.html'
			},function(result){
				$('.error-item').show().find('.error-msg').text(result)
			})
		}else{
			formErr.show(validateResult)
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			mag:''
		}
		//验证用户名不能为空
		if(!_util.validate(formData.username,"require")){
			result.msg = '用户名不能为空';
			return result;
		}
		//验证用户名格式错误
		if(!_util.validate(formData.username,"username")){
			result.msg = '用户名格式错误';
			return result;
		}
		//验证密码不能为空
		if(!_util.validate(formData.password,"require")){
			result.msg = '密码不能为空';
			return result;
		}
		//验证密码格式错误
		if(!_util.validate(formData.password,"password")){
			result.msg = '密码格式错误';
			return result;
		}

		result.status = true;
		return result;
	}
}
$(function(){
	page.init()
})
