<template >
	<view class="page" style="height: 100vh;">
		<view class="content" >
			<view class="header" >
				<div class="header-title gradient-text-one">goWhere</div>
			</view>
		
			<view class="list">
				<view class="list-call">
					<text class="cuIcon-mobile text-style "></text>
					<input class="biaoti" v-model="phoneNum" type="number" maxlength="11" placeholder="输入手机号" />
				</view>
				<view class="list-call">
					<text class="cuIcon-lock text-style "></text>
					<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="输入密码" password="true" />
				</view>
			</view>
		
			<view class="dlbutton bg-color" hover-class="dlbutton-hover" @tap="bindLogin()">
				<text>登录</text>
			</view>
		
			<view class="xieyi">
				<navigator url="../forgetPassword/forgetPassword" open-type="navigate">忘记密码</navigator>
				<text>|</text>
				<navigator url="../regit/regit" open-type="navigate">注册账户</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				phoneNum: '',
				password: ''
			};
		},
		
		methods: {
			bindLogin() {
				console.log("====================");
				if (this.phoneNum.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				console.log(this.websiteUrl+'/user/login');
				try{
					uni.request({
						url: this.websiteUrl+'/user/login',
						data: {
							mobile: this.phoneNum,
							password: this.password
						},
						method: 'POST',
						dataType: 'json',
						success: (res) => {
							console.log("登录返回数据",res);
							if (res.data.data.code == 1) {
								uni.showToast({
									title: "登录成功！",
									icon: 'none'
								});
								uni.setStorageSync('token', res.data.data.token);
								uni.setStorageSync('loginUser', res.data.data.userinfo);
								uni.reLaunch({
									url: "../index/index" //跳转到首页
								});
							} else {
								uni.showToast({
									title: "登录失败！",
									icon: 'wrong'
								});
							}
						}
					});
				}catch(e){
					//TODO handle the exception
					console.log('=======',e)
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 60upx;
	}

	.header {
		width: 270upx;
		height: 124upx;
		box-shadow: 0upx 12upx 13upx 0upx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin: 90px 70px 50px 70px;
		margin-left: auto;
		margin-right: auto;
	}
	.text-style{
		font-size: 40upx;
		color: #43cee9c4;
	}
	.header-title{
		position: absolute;
		top: 100px;
		font-family: fantasy;
		font-size: 35px;
	}
	
	.gradient-text-one{  
    background-image:-webkit-linear-gradient(left,rgba(63,205,235,1),rgba(188,226,158,1)); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.list-call .img {
		width: 40upx;
		height: 40upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width: 470upx;
		height: 100upx;
		box-shadow: 0upx 0upx 13upx 0upx rgba(164, 217, 228, 0.2);
		border-radius: 50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.dlbutton-hover {
		background: linear-gradient(-90deg, rgb(26, 183, 186,0.9), rgb(1, 131, 253,0.9));
	}

	.xieyi {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #4bcfe3;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.xieyi text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
