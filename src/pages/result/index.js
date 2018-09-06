require('./index.css')
require('common/logo/index.js')
require('common/footer/index.js')
var _util=require('util/index.js')
$(function(){
	var type=_util.getParamFromUrl('type')||'default'
	console.log(type)
	$('.'+type).show()
})