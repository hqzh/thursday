<template>
	<view class="content">
		<view class="mark">
			<cover-image src="../../static/img/logo.png"></cover-image>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">注册</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
			<!-- 	<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	import service from '@/service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '@/components/m-input.vue'
	import uuid from 'uuid/v4';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				username: 'admin',
				password: 'admin@123',
				positionTop: 0
			}
		},
		computed: mapState(['hasLogin']),
		methods: {
			...mapMutations(['login', 'updateState']),
			// initProvider() {
			// 	const filters = ['weixin', 'qq', 'sinaweibo'];
			// 	uni.getProvider({
			// 		service: 'oauth',
			// 		success: (res) => {
			// 			if (res.provider && res.provider.length) {
			// 				for (let i = 0; i < res.provider.length; i++) {
			// 					if (~filters.indexOf(res.provider[i])) {
			// 						this.providerList.push({
			// 							value: res.provider[i],
			// 							image: '../../static/img/' + res.provider[i] + '.png'
			// 						});
			// 					}
			// 				}
			// 				this.hasProvider = true;
			// 			}
			// 		},
			// 		fail: (err) => {
			// 			console.error('获取服务供应商失败：' + JSON.stringify(err));
			// 		}
			// 	});
			// },
			// initPosition() {
			// 	/**
			// 	 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			// 	 * 反向使用 top 进行定位，可以避免此问题。
			// 	 */
			// 	this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			// },
			async bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				const {
					username,
					password
				} = this;
				if (username.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 3 个字符'
					});
					return;
				}
				if (password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = await this.$http.post('sys/oauth/token', {
					username,
					password,
					grant_type: 'password',
					cid: uuid(),
					scope: 'all'
				}, {
					auth: false,
				})
				
				
				const {
					access_token
				} = data;
				uni.setStorageSync('token', access_token);
				const userInfo =await this.$http.post('sys/auth/logininfo')
				if (userInfo.data.username === username) {
					this.toMain(username, userInfo.data);
				}
			},
			// oauth(value) {
			// 	uni.login({
			// 		provider: value,
			// 		success: (res) => {
			// 			uni.getUserInfo({
			// 				provider: value,
			// 				success: (infoRes) => {
			// 					/**
			// 					 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
			// 					 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
			// 					 */
			// 					this.toMain(infoRes.userInfo.nickName);
			// 				}
			// 			});
			// 		},
			// 		fail: (err) => {
			// 			console.error('授权登录失败：' + JSON.stringify(err));
			// 		}
			// 	});
			// },
			toMain(username, user) {
				this.login({
					username,
					user
				});
				if (this.hasLogin) {
					uni.switchTab({
						url: '/pages/main/index',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		// onReady() {
		// 	this.initPosition();
		// 	this.initProvider();
		// }
	}
</script>

<style>
	.mark{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 80upx 0;
	}
	.logo{
		width: 80upx;
	}
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
