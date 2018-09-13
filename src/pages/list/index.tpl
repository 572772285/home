<ul class="product-list">
	{{#list}}
	<li class="product-item">
		<a href="./detail.html?productId={{_id}}" target="_blank">
			<img class="product-img" src="{{image}}" alt="{{name}}">
			<p class="product-price">￥ {{price}}</p>
			<p class="product-name">{{name}}</p>
		</a>
	</li>
	{{/list}}
</ul>
{{^list}}
<p class="empty-msg">温馨提示：你要找的东西去火星了~~</p>
{{/list}}