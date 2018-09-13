require('common/nav/')
require('common/search/')
require('common/footer/')
require('util/pagination/');
require('./index.css')

var _util = require('util');
var productTpl=require('./product.tpl')
var shippingTpl=require('./shipping.tpl')
var _order=require('service/order/')
var _shipping=require('service/shipping/')
var page = {
init: function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShippingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this=this;
	},
	loadShippingList:function(){
		var _this=this;
		this.rederShipping()
	},
	rederShipping:function(){
		var html = _util.render(shippingTpl)
		$('.shipping-box').html(html);
	},
	loadProductList:function(){
		var _this=this;
		_order.getOrderProductList(function(result){
			result.cartList.forEach(item=>{
				if(item.product.filePath){
					item.product.image = item.product.filePath.split(',',1)
				}else{
					item.product.image = [require('images/product-default.jpg')]
				}
			})
			result.notEmpty = !!result.cartList.length;
			var html = _util.render(productTpl,result)
			$('.product-box').html(html);
		},function(){
			$('.product-box').html('<p class="empty-message">获取商品列表出错了，刷新试试看</p>')
		})
		
	},

	
}

$(function(){
	page.init()
});