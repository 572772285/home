require('common/nav/index.js');
require('common/footer/index.js');
require('common/search/index.js');
require('util/carousel/index.js');
require('common/index.css');
require('./index.css');
require('util/pagination/index.js');
var _util=require('util/index.js');
var _product=require('../../service/product/index.js')
var tpl=require('./index.tpl')
var page = {
	listParams:{
		keyword:_util.getParamFromUrl('keyword')||'',
		categoryId:_util.getParamFromUrl('categoryId')||'',
		page:_util.getParamFromUrl('page')||1,
		orderBy:_util.getParamFromUrl('orderBy')||'default'
	},
	init:function(){
		this.initPagination();
		this.bindEvent()
		this.loadProductList()
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $('.pagination-box');
		$pagination.on('page-change',function(e,value){
			// console.log(value)
			_this.listParams.page = value;
			_this.loadProductList()
		})
		$pagination.pagination();
	},
	bindEvent:function(){
		var _this=this;
		$('.sort-item').on('click',function(){

			//如果点的是默认排序
			var $this=$(this);
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				//如果点的默认排序就会把值改为default
				_this.listParams.orderBy='default'
			}else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				if(!$this.hasClass('asc')){
					$this.addClass('asc')
					.removeClass('desc')
					//如果点的按价格排序升序就会把orderby的值改为price_asc
				_this.listParams.orderBy='price_asc'

				}else{
					$this.removeClass('asc')
					.addClass('desc')
					//如果点的按价格排序降序就会把orderby的值改为price_desc
					_this.listParams.orderBy='price_desc'
				}
			}
			_this.listParams.page=1;
			_this.loadProductList()
		})
	},
	loadProductList:function(){
		(this.listParams.categoryId)
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId)
		$('.product-list-box').html('<p>loading</p>');
		_product.getProductList(this.listParams,function(result){
			// console.log(result)
			var list = result.list.map(function(product){
				// console.log(product.images)
				if (product.FileList) {
					// console.log(product.FileList)
					// console.log(product.FileList.split(','));
					product.image = product.FileList.split(',')[0];
				} else {
					product.image = require('images/product-default.jpg');
				}
				return product;
			});
			var html = _util.render(tpl,{
				list:list
			});
			$('.product-list-box').html(html);
			$('.pagination-box').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize
			})
		},function(msg){
			_util.showErrorMessage(msg)
		})
	}
	
}

$(function(){
	page.init();
})