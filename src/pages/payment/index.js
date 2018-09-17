require('common/nav/index.js');
require('common/footer/index.js');
require('common/search/index.js');
require('util/pagination/index.js');
require('common/index.css');
require('./index.css');
var _util = require('util');
var tpl = require('./index.tpl')
var _payment=require('service/payment/index.js')
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || '',
	},
	init: function(){
		this.onload();
	},
	onload:function(){
		if (this.params.orderNo) {
			this.loadPaymentDetail();
		}
	},

	loadPaymentDetail:function(){
		var _this=this;
		//获取详情页数据，data为this.params.productId
		_payment.getPaymentInfo({orderNo:this.params.orderNo},function(payment){
			var html = _util.render(tpl,payment);
			$('.payment-box').html(html);
			_this.listenPaymentStatus()
		},function(msg){
			$('.payment-box').html('<p class="empty-msg">温馨提示：获取支付信息错误，请刷新页面~~</p>')
		})
	},
	listenPaymentStatus:function(){
		var _this=this;
		window.setInterval(function(){
			_payment.getPaymentStatus({orderNo:_this.params.orderNo},function(result){
				if(result==true){
					window.location.href='./result.html?type=payment&orderNo='+_this.params.orderNo;
				}
			})
		},5000)

	}
}

$(function(){
	page.init()
});