<template>
	<view class="cu-card dynamic bg-change-color" style="padding-top: 20px;">
		<view class="cu-item shadow"  v-for="(item,index) in orderList" :key='index'>
			<view class="cu-list menu-avatar">
				<view>
					<view class="solid-bottom" style="padding:10px">
						<view class="flex" style="justify-content: space-between;font-size: 17px;">
							<view>{{item.ticketsId.name}}区观光门票</view>
							<text class="cuIcon-time text-sm flex" style="line-height: 2;">
								{{item.createdAt | formatDateTime}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view style="padding:10px">
				<view class="flex" style="justify-content: space-between;padding-top: 10px;">
					<text class="text-gray">游客姓名</text>
					<text class=" text-sm flex" style="line-height: 2">
						{{item.ownOrderName}}
					</text>
				</view>

				<view class="flex" style="justify-content: space-between;padding-top: 10px;">
					<text class="text-gray">游客手机号</text>
					<text class=" text-sm flex" style="line-height: 2;">
						{{item.ownOrderMoble}}
					</text>
				</view>
				
				<view class="flex" style="justify-content: space-between;padding-top: 10px;">
					<text class="text-gray">{{item.ticketType}}</text>
					<view>
						<view class="text-price text-orange" style="line-height: 2;">{{item.goodsPrice}}</view>
					</view>
				</view>

				<view class="flex" style="justify-content: space-between;padding-top: 10px;">
					<text class="text-gray">购买数量</text>
					<view>
						<text style="padding: 0 10px;line-height: 2;">{{item.goodsNum}}</text>
					</view>
				</view>
		
				<view class="flex" style="justify-content: space-between;padding-top: 10px;">
					<text class="text-gray">游玩时间</text>
					<text class="cuIcon-time text-sm flex" style="line-height: 2;">
						{{item.goDate | formatDateTime}}
					</text>
				</view>

				<view class="flex" style="justify-content: space-between;padding-top: 10px;">
					<text class="text-gray">共支付</text>
					<text class="cuIcon-price text-sm flex" style="line-height: 2;">
						{{item.goodsNum * item.goodsPrice}}
					</text>
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
				orderList: [],
				userId:'',
				price:[],
				number:[],
				totalPrice:[]
			}
		},
		filters: {
			formatDateTime: function(value) {
				return format.formatDateTime(value, "yyyy-MM-dd");
			}
		},
		onPullDownRefresh:function(){
			this.order()
		},
		created: function() {
			this.order()
		},
		methods: {
		 order () {
			uni.showNavigationBarLoading();
			this.userId = uni.getStorageSync('loginUser')._id;
			console.log('userid',this.userId);
			uni.request({
				url: this.websiteUrl + '/api/getUserAllOders/'+ this.userId,
				method: 'GET',
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						this.orderList = res.data.data
						// console.log('=====单价======',this.price);
						// console.log('=====个数======',this.number);
						console.log('该用户的所有的订单',JSON.stringify(res.data.data));
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
				},
				
			});
			
		},
		}
	}
</script>

<style>

</style>
