import Vue from 'vue'
import App from './App'
import iconfont from './static/iconfont.css'

Vue.config.productionTip = false
//设置全局的api地址
Vue.prototype.websiteUrl = 'http://10.4.14.132:7000';
// Vue.prototype.websiteUrl = 'http://127.0.0.1:7000';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
