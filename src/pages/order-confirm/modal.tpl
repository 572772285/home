<div class="modal close-icon">
	<div class="modal-container">
		<div class="modal-header">
			{{#isEdit}}
			<h2 class="modal-title">编辑地址</h2>
			{{/isEdit}}
			{{^isEdit}}
			<h2 class="modal-title">新增地址</h2>
			{{/isEdit}}
			<i class="fa fa-close close-icon close"></i>
		</div>
		<div class="modal-body">
			<div class="form">
				<div class="form-box">
					<div class="error-item">
						<i class="fa fa-times error-icon"></i>
						<p class="error-msg">error</p>
					</div>
					<div class="form-item">
						<label for="" class="form-label"> 
							<i class="fa fa-user"></i>
						</label>
						<input type="text" class="form-content" name="name" placeholder="请输入收货人姓名" value="{{data.name}}">
					</div>
					<div class="form-item city-item">
						<label for="a1" class="form-label"> 
							<i class="fa fa-lock"></i>
						</label>

						<select name="province" id="a1" class="selectOption">
							<option value="">请选择</option>
						</select>
						<select name="city" id="" class="citiesOption">
							<option value="">请选择</option>
						</select>
					</div>
					<div class="form-item">
						<label for="" class="form-label"> 
							<i class="fa fa-map-marker"></i>
						</label>
						<input type="text" class="form-content" name="address" placeholder="请输入详细地址" value="{{data.address}}">
					</div>
					<div class="form-item">
						<label for="" class="form-label"> 
							<i class="fa fa-phone"></i>
						</label>
						<input type="text" class="form-content" name="phone" placeholder="请输入手机号" value="{{data.phone}}">
					</div>
					<div class="form-item">
						<label for="" class="form-label"> 
							<i class="fa fa-envelope"></i>
						</label>
						<input type="text" class="form-content enterEvent" name="zip" placeholder="请输入邮编,如100001" value="{{data.zip}}">
					</div>
					<div class="btn-item">
						<a href="javascript:;" class="btn btn-submit" id="btn-submit">提交</a>
					</div>
					<div class="link-item">
						<a href="./user-login.html" class="link">已有账号去登陆</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>