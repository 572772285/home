<ul class="pagination-list">
	{{#pageArray}}
		{{#disabled}}
			<li class="pagination-item disabled" data-value="{{value}}">{{name}}</li>
		{{/disabled}}
		{{^disabled}}
			{{#active}}
			<li class="pagination-item active" data-value="{{value}}">{{name}}</li>
			{{/active}}
			{{^active}}
				<li class="pagination-item" data-value="{{value}}">{{name}}</li>
			{{/active}}
		{{/disabled}}
	{{/pageArray}}
	<!-- 显示当前页和总页数 -->
	<li class="pagination-sumn">{{current}}/{{pages}}</li>
</ul>