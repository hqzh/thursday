<template>
	<van-grid column-num="3">
		<van-grid-item use-slot @click="handleInfo('company')">
			<view>企业管理</view>
		</van-grid-item>
		<van-grid-item use-slot @click="handleInfo('vehicle')">
			<view>车辆管理</view>
		</van-grid-item>
		<van-grid-item use-slot @click="handleInfo('driver')">
			<view>驾驶员管理</view>
		</van-grid-item>
	</van-grid>
</template>

<script>

export default {
	methods: {
		handleInfo(link) {
			uni.navigateTo({
				url: `../admin/${link}`
			});
		},
	}
};
</script>
