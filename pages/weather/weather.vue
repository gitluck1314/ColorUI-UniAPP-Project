<template>
	<view>
		<view class="bg-img bg-mask padding-tb-xl" style="background-image: url('http://dpic.tiankong.com/x9/h3/QJ6915630750.jpg');height: 414rpx;">
			<view class="padding-xl text-white">
				<view class="padding-xs text-xl">
					{{thisToday.city}}
				</view>
				<view class="padding-xs flex" style="justify-content: space-between;">
					<text>{{thisToday.date_y + " "+ thisToday.week}}</text>
					<text>{{thisToday.weather +" " +thisToday.temperature}}</text>
				</view>
				<view class="padding-xs text-xxl text-orange flex" style="justify-content: space-between;">
					<text>{{sk.time }}</text>
					<text>{{sk.temp}}`C</text>
				</view>
				<view class="margin-top-sm text-grey">{{sk.wind_direction + " " + sk.wind_strength}}</view>
			</view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="text-orange cuIcon-titles">Future Weather</text>
				</view>
			</view>
			<view class="bg-white  solid-bottom " v-for='(item,index) in future' :key='index'>
				<view class="padding flex col-1" style="justify-content: space-between;">
					<text>{{item.week}}</text>
					<text>{{item.weather}}</text>
					<text>{{item.wind}}</text>
					<text>{{item.temperature}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityName: '',
				thisToday: {},
				sk: {},
				future: []
			}
		},
		onLoad: function(options) {
			console.log('tianqi ', options.cityName);
			this.cityName = options.cityName;
			uni.request({
				url: 'http://apis.haoservice.com/weather?key=cd3395d9997048aea361a9da56ad7f94&cityname=' + this.cityName,
				method: 'GET',
				dataType: 'json',
				success: (res) => {
					if (res.statusCode == 200) {
						this.thisToday = res.data.result.today;
						this.sk = res.data.result.sk;
						this.future = res.data.result.future
					}
					
				}
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
