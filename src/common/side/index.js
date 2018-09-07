require('./index.css')
var _util=require('util/index.js')
// var tpl=require('./index.tpl')
var hogan=require('hogan.js')
var tpl = require('./index.tpl')
//登陆页面逻辑
var side={
	list:[
		{name:'user-center',desc:'用户中心',href:'./user-center.html'},
		{name:'order-list',desc:'我的订单',href:'./order-list.html'},
		{name:'user-update-password',desc:'修改密码',href:'./user-update-password.html'},
	],
	render:function(name){
		for(var i=0;i<this.list.length;i++){
			if(this.list[i].name == name){
				this.list[i].isActive = true
			}
		}
		var html = _util.render(tpl,{
			list:this.list
		});
		$('.left').html(html)
	}
}

module.exports=side;
