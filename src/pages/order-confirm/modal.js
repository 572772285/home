

var _util = require('util');
var _shipping=require('service/shipping/')
var modalTpl=require('./modal.tpl')
var _cities=require('util/cities/')
var formErr = {
	show:function(validateResult){
		$('.error-item').show().find('.error-msg').text(validateResult.msg)
	},
	hide:function(){
		$('.error-item').hide().find('.error-msg').text('')
	},
}
var _modal = {
	show:function(options){
		this.$box=$('.modal-box')
		this.options=options
		this.loadModal();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this=this
		this.$box.find('.close-icon').on('click',function(){
			_this.hide()
		})
		//点击蒙版关闭修改收获地址弹窗
		$('.modal-box').find('.modal-container').on('click',function(e){
			e.stopPropagation()
		})
		//省份和城市的联动
		var $provinceSelect=this.$box.find('.selectOption')
		$provinceSelect.on('change',function(){
			_this.loadCities($provinceSelect.val())
		})
		//提交事件
		this.$box.find('#btn-submit').on('click',function(){
			console.log(';a')
			_this.submit()
		})
		this.$box.find('input').on('keyup',function(e){
			if(e.keyCode==13){
				_this.submit()
			}
		})

	},
	loadCities:function(provinceName){//读取城市和读取省份原理一样
		var _this=this;
		var cities=_cities.getCities(provinceName)
		var citiesSelectOptions=this.getSelectOptions(cities)
		var $city=this.$box.find('.citiesOption')
		$city.html(citiesSelectOptions)

		//编辑后省份的回填
		if(this.options.data&&this.options.data.city){
			$city.val(_this.options.data.city)
		}
	},
	loadModal:function(){
		var $this=this
		//加载新增模板
		var html = _util.render(modalTpl,{
			data:this.options.data||{},
			isEdit:this.options.data
		})
		this.$box.html(html)
		this.loadProvinces()
	},
	loadProvinces:function(){//读取城市和读取省份原理一样
		var _this=this;
		var province=_cities.getProvinces()
		var loadSelectOptions=this.getSelectOptions(province)
		var $province=this.$box.find('.selectOption');
		$province.html(loadSelectOptions)

		//编辑后省份的回填
		if(this.options.data&&this.options.data.province){
			$province.val(_this.options.data.province)
			this.loadCities(_this.options.data.province)
		}
	},
	getSelectOptions:function(arr){//遍历数据形成html
		let html='<option value="">请选择</option>'
		for(var i=0;i<arr.length;i++){
			html+='<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html
	},
	hide:function(){
		this.$box.empty()
	},
	submit:function(){//提交
		// alert('aa')
		//1获取数据
		var _this=this;
		var formData={
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val())
		}
		//2验证数据
		var validateResult=this.validate(formData)
		//3提交
		//验证通过
		if(validateResult.status){
			//编辑
			if(this.options.data){
				formErr.hide()
				formData.shippingId=this.options.data._id
				_shipping.editShipping(formData,function(shippings){
					_util.showSuccessMsg('编辑地址成功')
					_this.hide()
					_this.options.success(shippings)
				},function(result){
					$('.error-item').show().find('.error-msg').text(result)
				})
			}
			//新增
			else{
				formErr.hide()
				_shipping.addShipping(formData,function(shippings){
					_util.showSuccessMsg('添加地址成功')
					_this.hide()
					_this.options.success(shippings)
				},function(result){
					$('.error-item').show().find('.error-msg').text(result)
				})		
			}

		}else{
			formErr.show(validateResult)
		}
	},
	validate:function(formData){//验证
		var result = {
			status:false,
			mag:''
		}
		//验证用户名不能为空
		if(!_util.validate(formData.name,"require")){
			result.msg = '收货人不能为空';
			return result;
		}
		if(!_util.validate(formData.province,"require")){
			result.msg = '省份不能为空';
			return result;
		}
		if(!_util.validate(formData.city,"require")){
			result.msg = '城市不能为空';
			return result;
		}
		if(!_util.validate(formData.address,"require")){
			result.msg = '地址不能为空';
			return result;
		}
		
		if(!_util.validate(formData.phone,"require")){
			result.msg = '手机号码不能为空';
			return result;
		}
		if(!_util.validate(formData.phone,"phone")){
			result.msg = '手机号码格式不对';
			return result;
		}
		
		result.status = true;
		return result;
	}

	
}
module.exports=_modal;