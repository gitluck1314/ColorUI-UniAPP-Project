<template>
	<view class="">
		<!-- <cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">索引</block>
		</cu-custom> -->
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item, index) in values" :key="index">
				<view class="indexItem-index" style="padding: 10px;" :id="index" :data-index="index">
					{{ keys[index]}}
				</view>
				<view class="cu-list menu-avatar no-padding">
					<view class="cu-item padding" style="height: 55px;" :class="checked ?'colorChange':'bg-white '"
						  v-for="(item1, index1) in item" :key="index1"  @click="selectCity(item1)">
						<view class="content" >
							<view class="text-grey">{{ item1.cityName }}</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in keys" :key="index" 
					  :id="item" @touchstart="getCur" @touchend="setCur">
					  {{item}}
				</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				CustomBar: 0,
				cityList:[],
				keys:[],
				values:[],
				checked:false
			};
		},
		onLoad() {
			
			this.listCur = this.keys;
			
			uni.request({
				url: this.websiteUrl + '/api/getAllCity',
				method: 'GET',
				dataType: 'json',
				success: (res) => {
					console.log('获取所有的城市', res);
					this.cityList = res.data.data;
					var map = new Map();
					var val = [];
					this.cityList.forEach(item => {
						if (!map[item.cityFirstCode]) {
							val.push(item)
							map[item.cityFirstCode] = val;
							val = [];
						} else {
							map[item.cityFirstCode].push(item);
						}
					})
					this.cityList =map;
					this.keys = Object.keys(this.cityList);
					this.values = Object.values(this.cityList);
					
					
				}
			})
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
			console.log('that.boxTop',that.boxTop);
		},
		methods: {
			//获取文字信息
			getCur(e) {
				// console.log('11111111111',e)
				this.hidden = false;
				this.listCur = e.target.id;
				// console.log('this.listCur',this.listCur);
			},
			setCur(e) {
				// console.log('222222222',e)
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				console.log('move========',e);
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.cityList[num];
					console.log('that.cityList[num]',that.cityList[num]);
				};
			},
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			},
			selectCity(item){
				this.checked = true;
				console.log(item);
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}
	.indexes {
		position: relative;
	}
	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}
	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}
	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}
	.colorChange{
		background-color: #cccc;
	}
	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}
	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}
	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>