var hogan=require('hogan.js')
var _util={
	request:function(params){
		var _this=this;
		$.ajax({
			url:params.url||'',
			method:params.method||'get',
			dataType:params.dataType||'json',
			data:params.data||'',
			success:function(result){
				if(result.code==0){
					params.success&&params.success(result.data)
				}else if(result.code==10){
					_this.dologin()
				}else if(result.code==1){
					params.error&&params.error(result.message)
				}
			},
			error:function(err){
					params.error&&params.error(err.statusText)
			}
		})
	},
	showErrorMessage:function(msg){
		alert(msg)
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	confirm:function(msg){
		return window.confirm(msg)
	},
	dologin:function(){
		//登陆页面 传一个参数
		window.location.href='/user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	goHome:function(){
		window.location.href='/'
	},
	getParamFromUrl:function(key){
		var query=window.location.search.substr(1)
		var reg=new RegExp('(^|&)'+key+'=([^&]*)(&|$)')
		var result=query.match(reg);
		return result ? decodeURIComponent(result[2])  :null
	},
	render:function(tpl,data){
		var template=hogan.compile(tpl);
		var html=template.render(data); //render一个对象
		return html;
	},
	validate:function(value,type){
		var value = $.trim(value)
		//非空验证
		if(type === 'require'){
			return !!value
		}
		//用户名格式
		if(type === 'username'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//密码格式
		if(type === 'password'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//手机格式
		if(type === 'phone'){
			return /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
		}
		//邮箱
		if(type === 'email'){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}
	}
}
module.exports=_util