<template>
	<view class="page" style="height: 100vh;">
	<view class="content">
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
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="输入密码" :password='tfpsw' />
				<image class="img" :src="showPassword?'../../static/login-reg-forget/op.png':'../../static/login-reg-forget/cl.png'" @tap="display"></image>
			</view>
			<view class="list-call">
				<text class="cuIcon-people text-style "></text>
				<input class="biaoti" v-model="username" type="text" placeholder="输入用户名" />
			</view>
			<!-- <view class="list-call">
				<image class="img" src="/static/login-reg-forget/3.png"></image>
				<text class="cuIcon-safe text-style "></text>
				<input class="biaoti" v-model="code" type="number" maxlength="6" placeholder="验证码"/>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view> -->
		</view>
		
		<view class="dlbutton bg-color" hover-class="dlbutton-hover" @tap="bindReg">
			<text>注册</text>
		</view>
		
		<view class="xieyi">
			<image @tap="xieyitong" :src="xieyi==true?'/static/login-reg-forget/ty1.png':'/static/login-reg-forget/ty0.png'"></image>
			<text @tap="xieyitong"> 同意</text>
			<navigator url="blog?id=1" open-type="navigate">《软件用户协议》</navigator>
		</view>
	</view>
</view>
</template>

<script>
	var tha,js;
	export default {
		onLoad(){
			tha = this;
		},
		onUnload(){
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				token: '',
				phoneNum:'',
				password:'',
				username:'',
				tfpsw:true,
				code:'',
				invitation:'',
				xieyi:true,
				showPassword:false,
				second:0
			};
		},
		computed:{
			// yanzhengma(){
			// 	if(this.second==0){
			// 		return '获取验证码';
			// 	}else{
			// 		if(this.second<10){
			// 			return '重新获取0'+this.second;
			// 		}else{
			// 			return '重新获取'+this.second;
			// 		}
			// 	}
			// }
		},
		methods: {
					
			display() {
			    this.showPassword = !this.showPassword
				this.tfpsw =!this.tfpsw
			},
			xieyitong(){
				this.xieyi = !this.xieyi;
			},
			
			//发送验证码的方法
			
			getcode(){
				console.log('发送验证码...');
				
				if(this.second>0){
					return;
				}
				this.second = 60;
				//检查手机号码是否已经被注册
				//调用发送验证码的接口地址
				uni.request({
					url: this.websiteUrl+'/examdemo/users/sendRandomCode',
					method: 'GET',
					data: {mobile: tha.phoneNum},
					success: res => {
						//console.log(res.data);
						if(res.data.code==200){
							uni.showToast({title:res.data.msg,icon:'none'});
						    tha.token = res.data.data; //获取token值。
						    
						}else{
							uni.showToast({title:res.data.msg,icon:'none'});
						}
						
						//this.tabBars = res.data.data.catalogList;
						//this.chapterItems = res.data.data.charpterMap; //hashMap
					},
					fail: () => {},
					complete: () => {}
				});
			},
		    bindReg() {
				if (this.xieyi == false) {
				    uni.showToast({
				        icon: 'none',
				        title: '请先阅读《软件用户协议》'
				    });
				    return;
				}
				if (this.phoneNum.length !=11) {
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
				
				// if (this.code.length != 6) {
				//     uni.showToast({
				//         icon: 'none',
				//         title: '验证码不正确'
				//     });
				//     return;
				// }
				
				// console.log(this.phoneNum+","+this.token)
				
				uni.request({
				 	
					url: this.websiteUrl+'/user/signup',
				    data: {
						mobile:this.phoneNum,
						password:this.password,
						username:this.username,
						cityId:'5d132c7597464815c01eafc1'
						// validateCode:this.code
						//token: this.token
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						console.log(res,'-========-=-=-=-=')
						if(res.statusCode==200){
							
							uni.reLaunch({
								url: "../login/login" //跳转到首页
							});
							uni.showToast({title:"注册成功！",icon:'none'});
						}else{
							uni.showToast({title:"注册失败",icon:'wrong'});
						}
				    }
				});
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
		height: 60px;
		/* background:linear-gradient(-0deg,rgba(63,205,235,1),rgba(188,226,158,1), rgba(63, 205, 235, 1)); */
		box-shadow: 0upx 12upx 13upx 0upx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin: 80px 60px 40px 60px;
		margin-left: auto;
		margin-right: auto;
	}
	.text-style{
		font-size: 40upx;
		color: #43cee9c4;
	}
	.header-title{
		position: absolute;
		top: 80px;
		font-family: fantasy;
		/* color: linear-gradient(-0deg,rgba(63,205,235,1),rgba(188,226,158,1), rgba(63, 205, 235, 1)); */
		/* color: #5cd2d9; */
		font-size: 36px;
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
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 40upx;
		height: 40upx;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}
	.yzm {
		color: #43cee9c4;
		font-size: 24upx;
		line-height: 64upx;
		padding-left: 10upx;
		padding-right: 10upx;
		width:auto;
		height:64upx;
		border:1upx solid #43cee9c4;
		border-radius: 50upx;
	}
	.yzms {
		color: #e9436ec4 !important;
		border:1upx solid #e9436ec4;
	}
	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width:470upx;
		height:100upx;
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
		border-radius:50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}
	.dlbutton-hover {
		background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
	}
	.xieyi{
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
	.xieyi image{
		width: 40upx;
		height: 40upx;
	}
</style>
