var _util = require('util')


var _order = {
	getOrderProductList:function(success,error){
		_util.request({
			url:'order/getOrderProductList',
			method:'get',
			success:success,
			error:error
		})
	}

	
}


module.exports = _order;