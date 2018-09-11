require('./index.css');
var _util = require('util');
var tpl = require('./index.tpl');

(function($){
	function Pagination($elem){
		this.$elem = $elem;
		this.bindEvent();
	}
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){
			var _this = this;
			this.$elem.on('click','.pagination-item',function(){
				var $this = $(this);
				// console.log($(this).data('value'))
				if ($this.hasClass('active') || $this.hasClass('disabled')) {
					return
				}
				_this.$elem.trigger('page-change',[$this.data('value')])
			})
		},
		render:function(options){
			console.log(options);
			var pages = Math.ceil(options.total / options.pageSize);
			if (pages <= 1) {
				return;
			}
			var start = options.current - options.range > 1 ? options.current - options.range : 1;
			var end = options.current + options.range < pages ? options.current + options.range : pages;
			var prev = options.current - 1;
			var next = options.current + 1;
			var hasPrev = prev > 0 ? true : false;
			var hasNext = next <= pages ? true : false;
			var pageArray = [];
			pageArray.push({
				name:'上一页',
				value:prev,
				disabled:!hasPrev
			})
			for (var i = start; i <= end; i++) {
				pageArray.push({
					name:i,
					value:i,
					active:(i==options.current)
				})
			}
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:!hasNext
			})
			console.log(pageArray)
			var html = _util.render(tpl,{
				pageArray:pageArray,
				current:options.current,
				pages:pages
			});
			this.$elem.html(html);
		}
	};

	Pagination.DEFAULTS = {
		current:1,
		list:1,
		pageSize:1,
		range:3
	}
	$.fn.extend ({
		pagination:function(fn,options){
			return this.each(function(){
				var $this = $(this);
				var pagination = $this.data('pagination');
				if (!pagination) {
					options  = $.extend({},Pagination.DEFAULTS,options);
					pagination = new Pagination($this,options);
					$this.data('pagination',pagination);
				}
				if (typeof pagination[fn] == 'function') {
					pagination[fn](options)
				}
			})
		}
	})
})(window.jQuery)