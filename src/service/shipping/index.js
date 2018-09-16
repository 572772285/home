var _util = require('util')


var _shipping = {
	//添加地址
	addShipping:function(data,success,error){
		_util.request({
			url:'/shipping',
			method:'post',
			data:data,
			success:success,
			error:error
		})
	},
	//加载获取地址
	getShippingList:function(success,error){
		_util.request({
			url:'/shipping/list',
			success:success,
			error:error
		})
	},
	//删除地址
	deleteShippingList:function(data,success,error){
		_util.request({
			url:'/shipping/delete',
			method:'put',
			data:data,
			success:success,
			error:error
		})
	},
	//点击编辑按钮回填数据
	editShippingList:function(data,success,error){
		_util.request({
			url:'/shipping/edit',
			method:'put',
			data:data,
			success:success,
			error:error
		})
	},
	//编辑添加
	editShipping:function(data,success,error){
		_util.request({
			url:'/shipping/editsubmit',
			method:'put',
			data:data,
			success:success,
			error:error
		})
	},
}


module.exports = _shipping;