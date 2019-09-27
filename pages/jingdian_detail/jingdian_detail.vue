<template>
	<view>
		<view class="cu-item shadow">
			<view class="image">
				<image style="width:100vw;" mode="widthFix" :src="detail.img"></image>
			</view>
		</view>
		<view class="floatCard card-list bg-white solid-bottom">
			<view class="cu-card case ">
				<view class="content flex-sub">
					<view class="titleStyle">{{detail.name}}</view>
					<view class="text-gray text-sm " style="text-align:center;padding-bottom:10px;">风景美如画，敬请欣赏吧</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-cyan ">开放时间</text>
			</view>
		</view>
		<view class="bg-white solid-bottom descriptFont">
			<view>
				<text class="cuIcon-time text-blue"></text>
				<text class="padding-left">{{detail.openTime}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles  text-cyan ">景点地址</text>
			</view>
		</view>
		<view class="bg-white solid-bottom descriptFont">
			<view @click="getMap()">
				<text class="cuIcon-location text-blue"></text>
				<text class="padding-left">{{detail.address}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles  text-cyan ">票价</text>
			</view>
		</view>
		<view class="bg-white solid-bottom descriptFont">
			<view class="flex-sub solid-bottom flex">
				<view class=" padding ">
					<text class="text-bold text-l text-left">成人票</text>
					<text class="text-price text-xl text-red padding-left">{{detail.adultPrice}}</text>
					<text class="text-gray padding-left">（原价</text><text class="text-price text-gray">{{detail.adultPrice}}）</text>
				</view>
				<view class="padding-change-sm">
					<view class="text-center">
						<button class="cu-btn round shadow bg-yellow " style="color:#FFFFFF;" data-target="bottomModal"
								@click="buyAdult" bindtap="__e">预定</button>
					</view>
				</view>
			</view>
			<view class="flex-sub  flex">
				<view class=" padding ">
					<text class="text-bold text-l text-left">儿童票</text>
					<text class="text-price text-xl text-red padding-left">{{detail.childPrice}}</text>
					<text class="text-gray padding-left">（原价</text><text class="text-price text-gray">{{detail.childPrice}}）</text>
				</view>
				<view class="padding-change-sm">
					<view class="text-center">
						<button class="cu-btn round shadow bg-yellow" style="color:#FFFFFF;" data-target="bottomModal"
						  @click="buyChild" bindtap="__e">预定</button></view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" >
			<view class="cu-dialog bg-white">
				<view class="cu-bar bg-white">
					<text class="text-bold text-xl text-left padding-left">{{detail.name+"景区观光门票"}}</text>
					<view @click="hideModal" class="action cuIcon-close text-gray"></view>
				</view>
				<view class="padding text-left text-gray">
					<text class="text-gray">{{typeName}}</text>
					<text class="text-price text-xl text-orange">{{price}}</text>/张
				</view>
				<view class="text-bold text-left padding-left">日期选择</view>
				<view class="grid col-4 padding-sm">
					<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
						<button class="cu-btn orange lg block" :class="item.checked?'bg-orange':'line-orange'" @tap="ChooseCheckbox"
						 :data-value="item.value"> {{item.name}}
							<view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view>
						</button>
					</view>
				</view>
				<view class=" text-orange text-left padding-left padding-bottom">需要在游玩当天的16:00前预定；预定后2小时才能入园</view>
				<button @click="buyNow" class="cu-btn bg-yellow" 
						style="height:45px;width:100vw;color:white;border-radius:0;">
						立即预定
				</button>
			</view>
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
				detail: {},
				modalName: null,
				price: '',
				typeName: '',
				ticketId: '',
				items: [],
				val: '',
				checkbox: [{
					value: 1,
					name: '明天',
					checked: false
				}, {
					value: 2,
					name: '后天',
					checked: false
				}, {
					value: 3,
					name: '其他',
					checked: false
				}]
			};
		},
		onLoad(options) {
			var _this = this;
			console.log("景点详情接收参数**********", options.id);
			this.ticketId = options.id;
			console.log('this.ticketId', this.ticketId);
			uni.request({
				url: this.websiteUrl + '/api/ticketsShowDetial/' + options.id,
				method: 'GET',
				dataType: 'json',
				success: function success(res) { // console.log("===+++ res ++",res );
					if (res.statusCode == 200) {
						_this.detail = res.data.data;
						console.log(res.data.data, '}}}}}}}}');
						console.log('&&&&&&&&this.detail&&&&&&', _this.detail);
					}
				}
			});
			console.log('&&&&&&&&this.detail&&&&&&', this.detail);
		},
		methods: {
			getMap(){
				// uni.getLocation({
				//     type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				//     success: function (res) {
				//         const latitude = res.latitude;
				//         const longitude = res.longitude;
				        uni.openLocation({
				            latitude: 36.905090081481426,
				            longitude: 114.01571655078128,
				            success: function () {
				                console.log('success');
				            }
				        });
				//     }
				// });
			},
			buyAdult(e) {
				console.log('AAAAAAAAAA----this.detail----AAAAAA', this.detail);
				console.log("成人票", this.detail.adultPrice);
				this.modalName = e.currentTarget.dataset.target;
				this.price = this.detail.adultPrice;
				this.typeName = '成人票';
				console.log('=======typeNametypeName=====', this.typeName);
			},
			buyChild(e) {
				console.log('BBBBB----this.detail----bbbbbb', this.detail);
				this.modalName = e.currentTarget.dataset.target;
				console.log("儿童票", this.detail.childPrice);
				this.price = this.detail.childPrice;
				this.typeName = '儿童票';
				console.log('=======typeNametypeName=====', this.typeName);
			},
			hideModal(e) {
				this.modalName = null;
			},
			ChooseCheckbox(e) {
				this.items = this.checkbox;
				var values = e.currentTarget.dataset.value;
				for (var i = 0, lenI = this.items.length; i < lenI; ++i) {
					if (this.items[i].value == values) {
						this.items[i].checked = !this.items[i].checked;
						break;
					}
				}
				console.log('选择处理后的项', JSON.stringify(this.items));
			},
			buyNow() {
				// console.log('items==========', this.items);
				// console.log('=======this.ticketId=======', this.ticketId);
				const value = uni.getStorageSync('loginUser');
				if(value){
					for (var i = 0; i < this.items.length; i++) {
						console.log("this.items[i].checked", this.items[i].checked);
						if (this.items[i].checked) {
							this.val = this.items[i].value;
							console.log('valval---', this.val);
						}
					}
					if (this.val) {
						console.log(this.detail.name, 'this.detail.name');
						console.log(this.val, this.price, this.detail.name, this.typeName, this.ticketId);
						uni.navigateTo({
							url: '../buyTickets/buyTickets?timeDate=' + this.val + '&price=' + this.price + '&jqName=' + this.detail.name +
								'&typeName=' + this.typeName + '&ticketId=' + this.ticketId
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '请选择时间'
						});
					}
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
	.titleStyle {
		font-size: 20px;
		font-family: initial;
		font-weight: 600;
		text-align: center;
		padding: 10px;
	}

	.descriptFont {
		font-size: 16px;
		padding: 15px 20px;
	}

	.padding-change-sm {
		padding: 10px 10px 10px 30px;
	}

	.bg-change-blue {
		background-color: #1dc4f4d1;
		color: #FFFFFF;
	}

	.line-change-blue {
		color: #1dc4f4d1;
	}
</style>
