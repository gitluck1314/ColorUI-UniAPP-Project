<template>
	<view>
		<view class="bg-img bg-mask padding-tb-xl" style="background-image: url('http://img2.imgtn.bdimg.com/it/u=836624741,2766032559&fm=26&gp=0.jpg');height: 414rpx;">
			<view class="padding-xl text-white">
					<view class="padding-xs text-xl">
					我的旅行
				</view>
				<view class="padding-xs">
					同行伙伴
					<image  class="cu-avatar round" src='https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'
							mode=""></image>
				</view>
				
					<view class="grid col-2 bg-white padding-sm" style="height: 90px;border-radius: 5px;">
					<view style="padding: 0px;">
						<view class="bg-Cyan padding radius text-center light">
							<view class="text-lg">我的消费</view>
							<view class="margin-top-sm text-Abc text-orange text-price">{{total}}</view>
						</view>
					</view>
					<view style="padding: 0px;">
						<view class="bg-Cyan padding radius text-center light">
							<view class="text-lg">我的付款</view>
							<view class="margin-top-sm text-Abc text-orange text-price">{{meBuy}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-card dynamic" v-for="(item,index) in accountList" :key='index' >
			<view class="cu-item shadow"  >
				<view class="cu-list menu-avatar">
					<view>
						<view class="solid-bottom" style="padding:10px">
							<view class="flex" style="justify-content: space-between;font-size: 17px;">
								<view class="cuIcon-time flex" style="line-height: 2;">
									{{formatDateTime(item.time)}}
								</view>
								<view class="text-sm  text-grey" style="line-height: 3;">支出：{{item.money}}</view>
							</view>
						</view>
					</view>
				</view>
				<view style="padding:10px">
					<view class="flex text-gray" style="justify-content: space-between;padding-top: 10px;">
						<text class="">{{item.type}}</text>
						<text class=" text-xl flex" >
							{{item.money}}
						</text>
					</view>
		
					<view class="flex text-gray" style="justify-content: space-between;padding-top: 10px;">
						<text class="">{{item.detial + item.money}}</text>
						<text class=" text-sm flex" style="line-height: 2;">
							{{item.buyerNmae}}支出
						</text>
					</view>
					
					<view class="flex text-gray" style="justify-content: space-between;padding-top: 10px;">
						<text class="">参与者</text>
						<text class=" text-sm flex" style="line-height: 2;">
							{{item.name}}
						</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cuIcon-roundaddfill text-cyan text-xxl self-center" 
			  style="position: fixed;z-index: 10;bottom: 20px;right: 20px;font-size: 40px;"
			  @click="createAccount"></view>
	</view>
</template>

<script>
	import {
		format
	} from '../../common/formatTime.js'
	export default {
		data() {
			return {
				accountList:[],
				meBuy:0,
				total:0
			}
		},
		onShow:function(){
			const value = uni.getStorageSync('loginUser');
			this.meBuy = 0;
			this.total = 0;
			uni.request({
				url: this.websiteUrl + '/api/getAllAccount',
				method: 'GET',
				dataType: 'json',
				success: (res) => {
					console.log(res);
					if (res.data) {
						this.accountList=res.data.data;
						for (let i = 0; i < this.accountList.length; i++) {
							this.total += this.accountList[i].money;
							if(this.accountList[i].buyerNmae  === value.username){
								this.meBuy += this.accountList[i].money
							}
						}
					} else {
						uni.showToast({
							title: "目前没有记录账单，开始记录吧！",
							icon: 'none'
						});
					}
				}
			})
			console.log('this.accountList',this.accountList);
		},
		methods: {
			formatDateTime(date) {
				return format.formatDateTime(date, "yyyy-MM-dd");
			},
			createAccount(){
				uni.navigateTo({
					url:'../createAccount/createAccount'
				})
			}
		}
	}
</script>

<style>

</style>
