var _nav=require('common/nav/')
require('common/search/')
require('common/footer/')

require('./index.css')

var _util = require('util');
var _cart = require('service/cart/');

var tpl = require('./index.tpl');

var page = {

	init:function(){
		this.$box=$('.cart-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		//单个选中/取消
		
		this.$box.on('click','.select-one',function(){
			var $this = $(this);
			let productId = $this.parents('.product-item').data('product-id')
			//选中
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})
			}
			//取消
			else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})				
			}
		})
		//全选全部选
		this.$box.on('click','.select-all',function(){
			var $this=$(this);
			if($this.is(':checked')){//选中
				_cart.selectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
				_this.showPageError();
			})
			}else{//全取消
				_cart.unselectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})	
			}
		})
		//删除一个
		this.$box.on('click','.delete-one',function(){
			var $this=$(this);
			var productId = $this.parents('.product-item').data('product-id')
			if(_util.confirm('你确定要删除该条购物车商品吗')){
				_cart.deleteOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})	
			}
		})
		//删除选中
		this.$box.on('click','.delete-selected',function(){
			var $this=$(this);
			var productId = $this.parents('.product-item').data('product-id')
			if(_util.confirm('你确定要删除选中商品吗')){
				_cart.deleteSelected(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})	
			}
		})
		//更新购物车数量
		this.$box.on('click','.count-btn',function(){
			var $this=$(this);
			var productId = $this.parents('.product-item').data('product-id')
			var $input=$this.siblings('.count-input');
			var current=parseInt($input.val())
			var max=$input.data('stock')
			var min=1;
			var newCount=0;
			if($this.hasClass('plus')){
				if(current>=max){
					_util.showErrorMessage('商品达到上限')
					return;
				}
				newCount=current+1;
			}else if($this.hasClass('minus')){
				if(current<=min){
					return;
				}
				newCount=current-1;
			}
			//修改数量
			_cart.updateCount({productId:productId,count:newCount},function(cart){
				_this.renderCart(cart)
			},function(){
				_this.showPageError();
			})
		});
		//去结算
		this.$box.on('click','.btn-submit',function(){
			if(_this.cart&&_this.cart.totalCartPrice>0){
				window.location.href='./order-confirm.html'
			}else{
				_util.showErrorMessage('请选择商品后再提交')
			}
		})
	},
	loadCart:function(){
		var _this = this;
		_cart.getCart(function(cart){
			_this.renderCart(cart)
		},function(){
			_this.showPageError();
		})
	},
	renderCart:function(cart){
		//从新渲染顶部购物车数量

		//缓存购物车信息，用来提交时验证
		this.cart=cart;

		_nav.loadeCartCount()
		//购物车数据适配
		cart.cartList.forEach(item=>{
			if(item.product.FileList){
				item.product.image = item.product.FileList.split(',')[0];
			}else{
				item.product.image = require('images/product-default.jpg');
			}
		})
		cart.notEmpty = !!cart.cartList.length;
		//渲染购物车
		var html = _util.render(tpl,cart)
		$('.cart-box').html(html);
	},
	showPageError:function(){
		$('.cart-box').html('<p class="empty-message">好像哪里出错了,刷新试试看!!!</p>')
	}
}

$(function(){
	page.init();
})