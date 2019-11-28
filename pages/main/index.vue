<template>
	<view class="root">
		<view v-if="hasLogin" class="hello">
			<company v-if="userInfo.u_expand1 === 'ENTERPRISE'"></company>
			<admin v-if="userInfo.u_expand1 === 'POLICE'"></admin>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import company from './company.vue'
	import admin from './admin.vue'
	export default {
		components: {
			company,
			admin
		},
		computed: mapState(['hasLogin', 'username', 'userInfo']),
		onLoad() {
			console.log(this.userInfo)
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul {
		font-size: 30upx;
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul>view {
		line-height: 50upx;
	}
</style>
