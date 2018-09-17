require('common/nav/index.js')
require('common/footer/index.js')
require('common/search/index.js')
require('./index.css')
var _util=require('util/index.js')
var _side=require('common/side/index.js')
var _order=require('service/order/index.js')
var tpl = require('./index.tpl');
require('util/pagination/index.js');
var page = {
	params:{
		page:_util.getParamFromUrl('page')||1,
	},
	init:function(){
		this.initPagination();
		this.onload();
		this.loadOrderList();
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $('.pagination-box');
		$pagination.on('page-change',function(e,value){
			// console.log(value)
			_this.params.page = value;
			_this.loadOrderList()
		})
		$pagination.pagination();
	},
	onload:function(){
		_side.render('order-list')
	},
	loadOrderList:function(){
		$('.order-box').html('<div class="loading"></div>');
		_order.getOrderList(this.params,function(orders){
			//获取图片
			let list=orders.list.map(order=>{
				order.productList.forEach(product=>{
					if(product.FileList){
						product.image = product.FileList.split(',')[0];
					}else{
						product.image = require('images/product-default.jpg');
					}
				})
				order.createdTime = new Date(order.createdAt).toLocaleString();
				return order;
			})
			console.log('list',list)
			var html = _util.render(tpl,{
				list:list,
				notEmpty:!!list.length
			});
			$('.order-box').html(html)
			$('.pagination-box').pagination('render',{
				current:orders.current,
				total:orders.total,
				pageSize:orders.pageSize
			}) 
		},function(msg){
			$('.order-box').html('<p class="empty-message">获取订单列表出错了，刷新试试看</p>')
		})
	}
}

$(function(){
	page.init();
})