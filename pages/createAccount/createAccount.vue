<template>
	<view class="page">
		<view class="cu-list menu sm-border card-menu">
			<view class="cu-item">
				<view class="content">
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">价格</view>
						<input placeholder="请输入价格" v-model="money"></input>
					</view>
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">类型</view>
						<input placeholder="交通/住宿/门票" v-model="type"></input>
					</view>
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">详情</view>
						<input placeholder="聚餐/酒店/火车票" v-model="detial"></input>
					</view>
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">参与人</view>
						<input placeholder="" v-model="name"></input>
					</view>
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">付款人</view>
						<input placeholder="" v-model="buyerNmae"></input>
					</view>
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">时间</view>
						<input placeholder="" v-model="time"></input>
					</view>
				</view>
			</view>
		</view>

		<view class="dlbutton " @tap="save()">
			<text>保存</text>
		</view>
	</view>
</template>

<script>
	import {
		format
	} from '../../common/formatTime.js'
	export default {
		data() {
			return {
				money: '',
				time: '',
				buyerNmae: '',
				type: '',
				name: '',
				detial: ""

			}
		},
		onLoad: function() {
			const nowDate = new Date();
			nowDate.setDate(nowDate.getDate());
			this.time = this.formatDateTime(nowDate)
		},
		methods: {
			formatDateTime(date) {
				return format.formatDateTime(date, "yyyy-MM-dd");
			},
			save() {
				const value = uni.getStorageSync('loginUser');
				if(value){
					uni.request({
						url: this.websiteUrl + '/api/createAccount',
						data: {
							money: this.money,
							time: this.time,
							buyerNmae: this.buyerNmae,
							name: this.name,
							type: this.type,
							detial: this.detial
						},
						method: 'POST',
						dataType: 'json',
						success: (res) => {
							console.log(res);
							if (res.data) {
								uni.showToast({
									title: "保存成功！",
									icon: 'none'
								});
									this.name = '',
									this.money = "",
									this.buyerNmae = '',
									this.type = '',
									this.detial = '',
									this.time = '',
									uni.navigateBack({
										delta:1
									})
							} else {
								uni.showToast({
									title: "保存失败！",
									icon: 'none'
								});
							}
						}
					})
				}else{
					uni.navigateTo({
						url:'../login/login'
					})
				}
				
			}
		}
	}
</script>

<style>
	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width: 300upx;
		height: 90upx;
		box-shadow: 0upx 0upx 13upx 0upx rgba(164, 217, 228, 0.2);
		background-color: #1CBBB4;
		border-radius: 50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}
</style>
