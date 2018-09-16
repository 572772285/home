<div class="panel">
	<h2 class="panel-header">收货地址</h2>
	<div class="panel-body clearfix">
		{{#shippings}}
		{{#isActive}}
		<div class="shipping-item active" data-shipping-id="{{_id}}">
		{{/isActive}}
		{{^isActive}}
		<div class="shipping-item" data-shipping-id="{{_id}}">
		{{/isActive}}
			<h2 class="shipping-title">{{province}} {{city}}</h2>
			<p class="shipping-detail">{{address}} {{name}} {{phone}}</p>
			<div class="shipping-footer">
				<span class="link shipping-edit">编辑</span>
				<span class="link shipping-delete">删除</span>
			</div>
		</div>
		{{/shippings}}
		<div class="shipping-add">
			<i class="fa fa-plus"></i>
			<p class="shipping-add-text">添加新地址</p>
		</div>
	</div>
</div>