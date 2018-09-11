
require('common/nav/index.js');
require('common/footer/index.js');
require('common/search/index.js');
require('util/carousel/index.js');
require('common/index.css');
require('./index.css');
var _util=require('util/index.js');
var _user=require('user/index.js');
var _side=require('common/side/index.js');
var tpl = require('./keyword.tpl');
var carouselTpl=require('./carousel.tpl');
var floorTpl=require('./floor.tpl');
var page = {
	keywords:[
		{item:[{name:'电子数码'},{name:'手机'},{name:'电脑'}]},
		{item:[{name:'家居'},{name:'三件套'},{name:'沙发'}]},
		{item:[{name:'男装'},{name:'运动'},{name:'正装'},{name:'休闲'}]},
		{item:[{name:'儿童'},{name:'玩具'},{name:'奶粉'},{name:'童装'}]},
		{item:[{name:'美食'},{name:'零食'},{name:'进口水果'}]},
		{item:[{name:'游戏'},{name:'动漫'}]},
		{item:[{name:'女装'},{name:'休闲'},{name:'时尚'},{name:'潮流'}]}
	],
	carousel:[
		{categoryId:'1111',image:require('images/carousel/1.jpg')},
		{categoryId:'2222',image:require('images/carousel/2.jpg')}
	],
	floor:[
		{
			title:'F1数码',
			item:[
				{categoryId:'1111',text:'华为',image:require('images/floor/p1.jpg')},
				{categoryId:'222',text:'华为P20pro',image:require('images/floor/p2.jpg')},
				{categoryId:'33',text:'一加8',image:require('images/floor/p3.jpg')},
				{categoryId:'44',text:'vivoFindX',image:require('images/floor/p4.jpg')},
				{categoryId:'5',text:'oppoR17',image:require('images/floor/p5.jpg')},
			]
		},
		{
			title:'F2家居',
			item:[
				{categoryId:'1111',text:'iPhone',image:require('images/floor/3.jpg')},
				{categoryId:'222',text:'三星',image:require('images/floor/4.jpg')},
				{categoryId:'33',text:'vivo',image:require('images/floor/5.jpg')},
				{categoryId:'44',text:'oppo',image:require('images/floor/6.jpg')},
				{categoryId:'5',text:'华为',image:require('images/floor/7.jpg')},
			]
		},
		{
			title:'F3男装',
			item:[
				{categoryId:'1111',text:'iPhone',image:require('images/floor/m1.jpg')},
				{categoryId:'222',text:'三星',image:require('images/floor/m2.jpg')},
				{categoryId:'33',text:'vivo',image:require('images/floor/m3.jpg')},
				{categoryId:'44',text:'oppo',image:require('images/floor/m4.jpg')},
				{categoryId:'5',text:'华为',image:require('images/floor/m5.jpg')},
			]
		},
	],
	init:function(){
		this.loadKeywords(),
		this.handlecarousel(),
		this.handleFloor()
	},
	loadKeywords:function(){
		var html = _util.render(tpl,{
			keywords:this.keywords
		});
		$('.keywords').html(html)
	},
	handlecarousel:function(){
		var html = _util.render(carouselTpl,{
			carousel:this.carousel
		});
		$('.carousel').html(html)
		var $carousel=$('.carousel').unslider({
			dots: true,               //  Display dot navigation
			keys:true
		});
		$('.arrow').on('click',function(){
			let direction=$(this).hasClass('next')? 'next' :'prev';
			$carousel.data('unslider')[direction]()
		})
	},
	handleFloor:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		});
		$('.floor-wrap').html(html)
	}
	
}

$(function(){
	page.init();
})