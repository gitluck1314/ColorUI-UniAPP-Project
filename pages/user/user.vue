<template>
	<view class="page">
		<view class="touxiang">
			<view class="bg-blue-green ">
				<view style="display: flex;justify-content: flex-start;">
					<image class="cu-avatar xl round margin-change"  :src='avatar' mode=""></image>
					<view class="userName" style="line-height: 5;font-size: 18px;color: #FFFFFF;margin-top: 20px;">
						<text>您好！{{username}}</text>
						<text v-if="notLogin" @click="login">点击登录</text>
					</view>
				</view>
				<view class="shadow-blur">
					<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100rpx"></image>
				</view>
			</view>
		</view>
		<view class="cu-list menu" :class="menuBorder?'sm-border':''" @click='toUserCenter'>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-people text-blue"></text>
					<text class="text-grey">个人中心</text>
				</view>
			</view>
			
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-service text-olive"></text>
					<text class="text-grey">联系客服</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @click=" myAllOrders">
				<navigator class="content" hover-class="none" open-type="redirect">
					<text class="cuIcon-text text-pink"></text>
					<text class="text-grey">全部订单</text>
				</navigator>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @click="loginOut">
				<navigator class="content" hover-class="none" open-type="redirect">
					<text class="cuIcon-close text-gray"></text>
					<text class="text-grey">退出登录</text>
				</navigator>
			</view>
			
		</view>

	</view>
</template>

<script>
	// import mave from '../'
	export default {
		data() {
			return {
				menuBorder: true,
				menuArrow: true,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				avatar:"",
				username:'',
				phoneNum:'',
				userId:'',
				notLogin:false
			};
		},
		created:function () {
			
				const value = uni.getStorageSync('loginUser');
				console.log('value===========',value);
				if (value) {
					this.avatar = value.avatar
					this.username= value.username
					this.phoneNum= value.mobile
					this.userId = value._id
					console.log('this.userId',this.userId);
				}else{
					this.notLogin =true
				}
			
		},
		methods: {
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			toUserCenter(){
				uni.navigateTo({
					url:'../userCenter/userCenter?id='+this.userId
				})
			},
			myAllOrders(){
				uni.switchTab({
					url:'../orders/orders'
				})
			},
			loginOut(){
				uni.setStorageSync('loginUser', '');
				uni.showToast({
					title: "注销成功！",
					icon: 'none'
				});
				uni.reLaunch({
					url: "../login/login"
				});
			},
			login(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	@import "../../colorui/animation.css";
	/* @import "../../colorui/main.css"; */
	
	.bg-blue-green{
		background:linear-gradient(top,rgba(63,205,235,1),rgba(188,226,158,1)); 
	}
	.bg-green{
		background:rgba(188,226,158,1)
	}
	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
	}
	.margin-change{
		margin: 25px 15px 0px 15px;
	}
	.page {
		height: 100Vh;
		width: 100vw;
	}
	.page.show {
		overflow: hidden;
	}
	.switch-sex::after {
		content: "\e716";
	}
	.switch-sex::before {
		content: "\e7a9";
	}
	.switch-music::after {
		content: "\e66a";
	}
	.switch-music::before {
		content: "\e6db";
	}

</style>
