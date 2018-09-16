var _util = require('util')


var _order = {
	getOrderProductList:function(success,error){
		_util.request({
			url:'/order/getOrderProductList',
			method:'get',
			success:success,
			error:error
		})
	},
	creatOrder:function(data,success,error){
		_util.request({
			url:'/order',
			method:'post',
			data:data,
			success:success,
			error:error
		})
	},
	getOrderList:function(data,success,error){
		_util.request({
			url:'/order/list',
			data:data,
			success:success,
			error:error
		})
	},
	getOrder:function(data,success,error){
		_util.request({
			url:'/order',
			data:data,
			success:success,
			error:error
		})
	},
	cancelOrder:function(data,success,error){
		_util.request({
			url:'/order/cancel',
			data:data,
			method:'put',
			success:success,
			error:error
		})
	},
	
}


module.exports = _order;