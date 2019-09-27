<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
		/*每个页面公共css */
	@import "./colorui/main.css";
	@import "./colorui/icon.css";
	@import "./colorui/icon.wxss";
	@import "./colorui/colorui.wxss";
	.page{
		background-color: #FFFFFF;
	}
	.bg-color{
		background: linear-gradient(left,rgba(63,205,235,1),rgba(188,226,158,1)) ;
	}
	.bg-change-color{
		background: linear-gradient(top,rgba(63,205,235,0.44),rgba(63,205,235,0)) ;
	}
</style>
