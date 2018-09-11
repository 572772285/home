<div class="product-intro clearfix">
	<div class="product-img">
		<div class="product-main-img">
			<img src="{{mainImg}}" alt="" />
		</div>
		<ul class="product-small-img-list clearfix">
			{{#images}}
			<li class="product-small-img-item">
				<img src="{{.}}" alt="" />
			</li>
			<!-- 。代表数组里的每一项 -->
			{{/images}}
		</ul>
	</div>
	<div class="product-info clearfix">
		<h2 class="product-name">{{name}}</h2>
		<p class="product-description">{{description}}</p>
		<div class="product-info-item product-price">
			<span class="label">价格：</span>
			<span class="info">￥ {{price}}</span>
		</div>
		<div class="product-info-item product-stock">
			<span class="label">库存：</span>
			<span class="info">{{stock}}</span>
		</div>
		<div class="product-info-item product-count">
			<span class="label">购买数量：</span>
			<input type="text" value="1" class="count-input">
			<span class="btn-count plus">+</span>
			<span class="btn-count minus">-</span>
		</div>
		<div class="add-cart">
			<a href="javascript:;" class="btns link">添加购物车</a>
		</div>
	</div>
</div>
<div class="product-detail">
	<div class="tab">
		<ul class="tab-list">
			<li class="tab-item active">商品详情</li>
			<li class="tab-item">用户评论</li>
		</ul>
		<div class="tab-content">
			{{{value}}}
		</div>
	</div>
</div>