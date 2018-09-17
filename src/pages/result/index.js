require('./index.css')
require('common/logo/index.js')
require('common/footer/index.js')
var _util=require('util/index.js')
$(function(){
	var type=_util.getParamFromUrl('type')||'default'
	if(type=="payment"){
		var orderNo=_util.getParamFromUrl('orderNo')
		var href=$('.order-detail').attr('href');
		var newHref=href+orderNo;
		$('.order-detail').attr('href',newHref)
	}
	$('.'+type).show()

})