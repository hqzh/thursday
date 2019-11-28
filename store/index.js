import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		username: "",
		userInfo: {},
		// 企业或驾驶员的id
		sourceId: '',
	},
	mutations: {
		login(state, {
			username,
			user
		}) {
			state.username = username;
			state.userInfo = user;
			state.hasLogin = true;
		},
		logout(state) {
			state.username = "";
			state.hasLogin = false;
			uni.clearStorageSync();
		},
		updateState(state, newState) {
			Object.assign(state, newState)
		}
	}
})

export default store
