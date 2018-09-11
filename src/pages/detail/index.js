require('common/nav/index.js');
require('common/footer/index.js');
require('common/search/index.js');
require('util/pagination/index.js');
require('common/index.css');
require('./index.css');
var _util = require('util');
var _product = require('service/product/index.js');
var tpl = require('./index.tpl')
var page = {
	params:{
		productId:_util.getParamFromUrl('productId') || '',
	},
	init: function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		if (this.params.productId) {
			this.loadProductDetail();
		}
	},
	bindEvent:function(){
		var _this = this;
		//切换小图片,用事件代理
		$('.detail-box').on('mouseenter','.product-small-img-item',function(){
			var $this=$(this);
			$this.addClass('active');
			$this.siblings('.product-small-img-item').removeClass('active')
			var imgSrc=$this.find('img').attr('src')
			$('.product-main-img img').attr('src',imgSrc)
		})
		$('.detail-box').on('click','.btn-count',function(){
			var $this=$(this);
			var stock=_this.stock;
			var current=parseInt($('.count-input').val())
			var min=1;
			if($this.hasClass('plus')){
				$('.count-input').val(current>=stock ? stock :current+1)
			}else if($this.hasClass('minus')){
				$('.count-input').val(current<=min ? min :current-1)
			}
		})
	},
	loadProductDetail:function(){
		var _this=this;
		//获取详情页数据，data为this.params.productId
		_product.getProductDetail({productId:this.params.productId},function(product){
			_this.stock=product.stock;
			if (product.FileList) {
				//把字符串变成数组
				product.images = product.FileList.split(',');
			} else {
				product.images = [require('images/product-default.jpg')]
			}
			product.mainImg = product.images[0];

			var html = _util.render(tpl,product);
			$('.detail-box').html(html);
		},function(msg){
			_util.showErrorMessage(msg);
		})
	}
}

$(function(){
	page.init()
});