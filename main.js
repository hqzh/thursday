import Vue from 'vue'
import App from './App'
import {
	getDictLabel
} from '@/common/helper.js'
import store from './store'
import $http from '@/js_sdk/zhouWei-request/requestConfig';
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = $http;
Vue.prototype.$getDictLabel = getDictLabel
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
