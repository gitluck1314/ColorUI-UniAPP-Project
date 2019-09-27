<template>
	<view class="content">
		<!-- head -->
		<view class="head" > 
			<view class="cu-bar bg-color search" style="z-index: 100;position: fixed;width: 100vw;height: 150upx;">
				<view class="cu-bar bg-color search" style="padding-top: 20upx;width: 100vw;">
					<image  class="cu-avatar round" :src='avatar' mode=""></image>
					<view class="search-form radius">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" 
								type="text" placeholder="搜索旅游主题" confirm-type="search" ></input>
					</view>
					<view class="action" style="color: #FFFFFF;" @click="toCities" >
						<text>邯郸</text>
						<text class="cuIcon-triangledownfill"></text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空白 -->
		<view class="blank" style="width: 100%;height: 150upx;">
			
		</view>
		<!-- swiper -->
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 小工具 -->
		<view class="margin-bottom">
			<view class="cu-list grid col-3 no-border text-color" >
				<view class="cu-item" @click="jingdianClike">
					<view class=" icon-jingdian text-blue icon-font" ></view>景点·门票
				</view>
				<view class="cu-item" @click="account">
					<view class=" iconfont  text-orange " >&#xeb5b;</view>旅行账本
					<!-- //蓝色&#xeb57; -->
				</view>
				<view class="cu-item">
					<view class=" iconfont  text-pink ">&#xeb5c;</view>行程规划
					<!-- //蓝色&#xeb58; -->
				</view>
			</view>
		</view>
		
		<!--景点 卡片 -->
		<view class="card-list">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-orange ">热销推荐</text>
				</view>
			</view>
			<view class="cu-card case "  v-for="(item, index) in jingdian" :key="index"  @click="jd_Detial(item)">
				<view class="cu-item shadow">
					<view class="image">
						<image :src="item.img" mode="widthFix"></image>
						<view class="cu-tag bg-red">Hot</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="content flex-sub" style="left: 20px;">
								<view class="text-grey">{{item.name}}</view>
								<view class="text-gray text-sm flex justify-between">
									<!-- 十天前 -->
									<view class="text-gray text-sm">
										<text class="icon-icon_like-copy margin-lr-xs"></text>收藏
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-modal" :class="modalName?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">热心提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您未登录，小主人先登录吧！
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="queding">确定</button>

					</view>
				</view>
			</view>
		</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data() {
			return {
				InputBottom: 0,
				modalName: false,
				avatar: '', 
				token:'',
				username:'',
				cityId:'5d132c7597464815c01eafc1',
				phoneNum:'',
				cardCur: 0,
				jingdian:[],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2794908243,4007380831&fm=175&app=25&f=JPEG?w=640&h=400&s=1334528514414B4F04BC3C71030080B0'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3262068462,3086025637&fm=175&app=25&f=JPEG?w=640&h=427&s=89326F934F927ECE6279E97003003031',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3573491507,3388239267&fm=175&app=25&f=JPEG?w=640&h=360&s=5E5A25C606032B453080E53903004043'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1493525148,1028767586&fm=26&gp=0.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=752587597,2820616611&fm=26&gp=0.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1765588317,7985339&fm=26&gp=0.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387132371,2321577315&fm=26&gp=0.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			};
		},
		created:function () {
			try {
				const value = uni.getStorageSync('loginUser');
				if (value) {
					this.token = uni.getStorageSync('token');
					this.avatar = value.avatar
					this.username= value.username
					this.phoneNum= value.mobile
					this.cityId = value.cityId
				}else{
					this.modalName=true;
				}
				console.log('this.cityId',this.cityId);
				uni.request({
					url: this.websiteUrl+'/api/showCityTickets/'+ this.cityId,
					method: 'GET',
					dataType: 'json',
					success: (res) => {
						this.jingdian = res.data.data;
					}
				})
			} catch (e) {
				// error
				console.log('error',e)
			}
		},
		onLoad(options) {
			this.TowerSwiper('swiperList');
			console.log('index.vue',options);
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
//+++++++++++++= header =+++++++++++++++		
			InputFocus(e) {
				this.InputBottom = e.detail.height
				console.log('input---------------',e);
			},
			InputBlur(e) {
				this.InputBottom = 0
				console.log('input=========',e.detail.value);
				uni.navigateTo({
					url:"../searchTickets/searchTickets?name="+e.detail.value
				})
			},
			toCities(){
				uni.navigateTo({
					url: '../cities/cities'
				});
			},
			
//+++++++++++++= swiper =+++++++++++++++
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			
			
//+++++++++++++++++++小工具++++++++++++++++++++++++++
			jingdianClike(){
				uni.navigateTo({
					url:'../../pages/jingdian-mengpiao/jingdian-mengpiao'
				})
			},
			
			account(){
				uni.navigateTo({
					url:'../accountMark/accountMark'
				})
			},

// ++++++++++++++++++热销景点++++++++++++++++++++++++
			jd_Detial(item){
				console.log('id',item._id);
				uni.navigateTo({
					url:"../jingdian_detail/jingdian_detail?id=" + item._id
				})
			},
//================================================
			hideModal(e) {
				this.modalName = ''
			},
			queding(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		/* height: 400upx; */
	}
</style>
