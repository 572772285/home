{{#notEmpty}}
<div class="panel">
	<h2 class="panel-header">商品清单</h2>
	<div class="panel-body">
		<ul class="cart-title clearfix">
			<li class="product-info">商品信息</li>
			<li class="product-price">单价</li>
			<li class="product-count">数量</li>
			<li class="product-totalPrice">小计</li>
		</ul>
		{{#cartList}}
		<ul class="cart-item clearfix" data-product-id={{product._id}}>
			<li class="product-info">
				<a href="./detail.html?productId={{product._id}}" class="link" target="_blank">
					<img src="{{product.image}}" alt=""> 
					<span>{{product.name}}</span>
				</a>
			</li>
			<li class="product-price">
				￥{{product.price}}
			</li>
			<li class="product-count">
				<span>{{count}}</span>
			</li>
			<li class="product-totalPrice">
				￥{{totalPrice}}
			</li>
		</ul>
		{{/cartList}}
		<ul class="cart-footer clearfix">
			<li class="product-submit">
				<span class="total-price-text">总价:</span>
				<span class="total-price">￥{{totalCartPrice}}</span>
				<span class="btns btn-submit link">去结算</span>
			</li>
		</ul>
	</div>
</div>
{{/notEmpty}}
{{^notEmpty}}
<p class="empty-message">
	购物车没有商品！！！
	<a href="./cart.html" class="btn gocart-btn">查看购物车</a>
</p>

{{/notEmpty}}