<template>
	<view>
		<!-- <view class="weather blocks">
			<image style="width: 100vw;height: 200upx;" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"
			 mode=""></image>
		</view> -->
		<view class="cu-card article"  v-for="(item,index) in jingdian" :key="index" @click="detail(item)">
			<view class="cu-item shadow">
				<view class="content" style="padding: 16px;">
					<image :src="item.img" mode="aspectFill" style="height: 7.4em;"></image>
					<view class="desc">
						<view class="title" style="line-height:1;">
							<view class="text-cut">
								{{item.name}}（4A）
							</view>
						</view>
						<view class="text-content" style="height: auto;">
							<view class="padding-left" style="line-height: 1.5;">
								<text class="cuIcon-favorfill text-orange"></text>
								<text class="cuIcon-favorfill text-orange"></text>
								<text class="cuIcon-favorfill text-orange"></text>
								<text class="cuIcon-favorfill text-orange"></text>
							</view>
							<text class="text-price text-xl text-orange padding-left">{{item.childPrice}}</text>/起
							<view class="text-gray padding-left">{{item.address}}</view>
						</view>
						<view class="padding-left">
							<view class="cu-tag bg-red light sm round">赠券</view>
							<view class="cu-tag bg-green light sm round">必游景点</view>
						</view>
					</view>
				</view>
				<view class="piaojia">
					<view class="solid-bottom flex " style="padding:8px 16px;justify-content: space-between;">
						<view class="text-bold text-l text-left">{{item.name}}观光成人票</view>
						<view class="text-price text-xl text-red padding-left">{{item.adultPrice}}</view>
					</view>
					<!-- 儿童票 -->
					<view class="flex" style="padding:8px 16px;justify-content: space-between;">
						<view class="text-bold text-l text-left">{{item.name}}观光儿童票</view>
						<view class="text-price text-xl text-red padding-left">{{item.childPrice}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="show"  class="text-center title">
			没有查询到相关信息
		</view>
		<!-- 查看天气按钮 -->
		<view class="margin-tb-sm text-center" 
			  style="position: fixed;z-index: 10;bottom: 20px;right: 20px;">
			<button class="cu-btn round shadow bg-cyan" 
					hover-class="bg-change-cyan-hover"
					@click="seeWeather">城市天气</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: true,
				jingdian:[],
				show:false
				// cityId:'5d132c7597464815c01eafc1'
			}
		},
		onLoad:function(options){
			console.log(options.name);
			uni.request({
				url: this.websiteUrl+'/api/searchOne?search='+ options.name,
				method: 'GET',
				dataType: 'json',
				success: (res) => {
					console.log("查询结果===",res.data.data.data);
					
					if(res.data.data.data){
						this.jingdian = res.data.data.data;
					}else{
						console.log('---------');
						this.show = true;
					}
				}
			})
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			detail(item){
				uni.navigateTo({
					url:"../jingdian_detail/jingdian_detail?id=" + item._id
				})
			},
			seeWeather(){
				uni.navigateTo({
					url:'../weather/weather?cityName=邯郸'
				})
			}
		}
	}
</script>

<style>
.bg-change-cyan{
	background-color: #49cfeba3;
    color: #fff;
}
.bg-change-cyan-hover{
	background-color: #49cfebeb;
    color: #fff;
}
</style>
