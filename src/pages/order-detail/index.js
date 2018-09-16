require('common/nav/index.js')
require('common/footer/index.js')
require('common/search/index.js')
require('./index.css')
var _util=require('util/index.js')
var _side=require('common/side/index.js')
var _order=require('service/order/index.js')
var tpl = require('./index.tpl');
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo')||1,
	},
	init:function(){
		this.onload();
		this.loadOrderDetail();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this=this;
		$('.right').on('click',".btn-cancel",function(){
			if(_util.confirm('您确定取消订单吗？')){
				_order.cancelOrder({orderNo:_this.params.orderNo},function(order){
					console.log(_this.params.orderNo)
					_this.renderOrderDetail(order)
				},function(msg){
					_util.showErrorMessage(msg)
				})
			}
		})
	},
	onload:function(){
		_side.render('order-list')
	},
	loadOrderDetail:function(){
		var _this=this;
		_order.getOrder(this.params,function(order){
			_this.renderOrderDetail(order)
		},function(msg){
			$('.order-box').html('<p class="empty-message">获取订单列表出错了，刷新试试看</p>')
		})
	},
	renderOrderDetail:function(order){
		if(order){
					//图片
			order.productList.forEach(product=>{
				if(product.FileList){
					product.image = product.FileList.split(',')[0];
				}else{
					product.image = require('images/product-default.jpg');
				}
			})
			//时间
			order.createdTime = new Date(order.createdAt).toLocaleString();
			var html = _util.render(tpl,{
				order:order,
				notEmpty:!!order,
				needpay:order.status == 10,
				cancel:order.status == 10
			});
			$('.right').html(html)
		}
	}
}

$(function(){
	page.init();
})