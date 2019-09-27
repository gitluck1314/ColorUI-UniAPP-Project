<template>
	<view class="cu-card dynamic bg-change-color" style="padding-top: 20px;">
		<!-- //11111111111111 -->
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view>
					<view class="solid-bottom" style="padding: 20px 10px 20px 10px;">
						<view class="flex" style="justify-content: space-between;padding-bottom: 15px;font-size: 17px;">
							<view>{{jqName}}区观光门票</view>
							<view class="text-price text-orange">{{price}}/张</view>
						</view>
						<text class="cuIcon-time text-sm flex" style="line-height: 1;">
							{{time}}
						</text>
					</view>
				</view>
			</view>
			<view class="text-content">
				<view class="flex" style="justify-content: space-between;padding-top: 15px;">
					<text class="text-gray">购买数量</text>
					<view>
						<text class="cuIcon-move shadow" :class="isFlagS ? 'bg-blue' : 'bg-change-grey'"
							  style="padding: 2px;border-radius: 5px;" @click="subNum"></text>
						<text style="padding: 0 10px;">{{number}}</text>
						<text class="cuIcon-add shadow "  :class="isFlagA ? 'bg-blue' : 'bg-change-grey'"
							  style="padding: 2px;border-radius: 5x" @click="addNum"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 2222222222222222 -->
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view>
					<view class="solid-bottom" style="padding: 20px 10px 20px 10px;">
						<view class="flex" style="font-size: 17px;">
							<view>游客信息</view>
						</view>
					</view>
				</view>
			</view>
			<view class="text-content">
				<view class="text-content">
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">姓名</view>
						<input placeholder="必须与省份证号一致"  v-model="name"></input>
					</view>
					<view class="cu-form-group" style="height: 50px;">
						<view class="title" style="font-size:16px;">手机号码</view>
						<input placeholder="请输入手机号" v-model="mobile"  maxlength="11"></input>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white" style="position: fixed;bottom: 0;height: 55px;width: 100vw;">
			<view class="flex" style="justify-content: space-between;padding: 10px;">
				<view class="text-orange" style="line-height: 2;">
					待支付 <text class="text-price" style="font-size: 18px;padding-left: 10px;">{{price * number}}</text>
				</view>
				<view class="padding-change-sm">
					<view class="text-center">
						<button class="cu-btn round shadow bg-yellow" @click="subOder"  data-target="bottomModal">提交订单</button>
					</view> 
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {format} from '../../common/formatTime.js'
	export default {
		data() {
			return {
				price:0,
				time:'',
				number:1,
				typeName:'',
				jqName:'',
				isFlagS:false,
				isFlagA:false,
				name:'',
				mobile:'',
				userId:'',
				ticketId:''
			}
		},
		created:function () {
			try {
				const value = uni.getStorageSync('loginUser');
				if (value) {
					this.userId = value._id
				}
			} catch (e) {
				// error
				console.log('error',e)
			}
		},
		onLoad(options) {
			console.log(options,'订单填写页面');
			this.typeName= options.typeName;
			this.jqName =options.jqName;
			this.price = options.price;
			this.ticketId = options.ticketId;
			var nowDate = new Date();

			if(options.timeDate == 1){
				nowDate.setDate(nowDate.getDate() + 1);
				this.time = this.formatDateTime(nowDate)
			}
			else if(options.timeDate == 2){
				nowDate.setDate(nowDate.getDate() + 2);
				this.time = this.formatDateTime(nowDate)
			}
		},
		methods: {
			 formatDateTime(date) {
				return format.formatDateTime(date, "yyyy-MM-dd");
			},
			addNum(){
				this.isFlagA = true
				this.isFlagS = false
				this.number++
			},
			subNum(){
				this.isFlagS = true
				this.isFlagA = false
				if(this.number == 1){
					this.isFlagS = false
					this.number = 1
				}else{
					this.number--
				}
			},
			subOder(){
				console.log(this.price,this.mobile,this.jqName,this.typeName,this.time,this.name,this.mobile,this.userId,this.ticketId);
				uni.request({
					url: this.websiteUrl+'/api/createOders',
					data: {
						goodsNum:this.number,
						goodsPrice:this.price,
						goDate:this.time,
						ownOrderName:this.name,
						ownOrderMoble:this.mobile,
						ticketType:this.typeName,
						userId: this.userId,
						ticketsId:this.ticketId
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						console.log(res);
						if(res.statusCode==200){
							uni.showToast({
								title: "购买成功！",
								icon: 'none'
							});
							this.name = '',
							this.mobile=""
						}
						else{
							uni.showToast({
								title: "购买失败！",
								icon: 'none'
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
.bg-blue{
	background-color: #46cfec75;
    color: #09aacb;
}
.bg-change-grey{
	background-color: rgba(204, 204, 204, 0.44);
}
</style>
