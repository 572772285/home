var _util=require('util/index.js')
var _user={
	getProductList:function(data,success,error){
		_util.request({
			url:'/product/homeList',
			data:data,
			success:success,
			error:error
		})
	},
	getProductDetail: function (data,success,error) {
		_util.request({
			url:'/product/homeDetail',
			data:data,
			success:success,
			error:error
		})
	}
	
}
module.exports=_user