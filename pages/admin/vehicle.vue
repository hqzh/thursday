<template>
<!-- 	<view class="wrap">
		<van-search :value="keyword" placeholder="请输入车牌号码" @search="onSearch" />
		<view class="card-wrap">
			<view v-for="item in cardData" :key="item.id" class="card item">
				<view class="card-item">
					<text>{{ item.plateNo }}</text>
					<text>{{ item.docNo || ''}}</text>
				</view>
				<view class="card-item"> -->
					<!-- 车辆类型： -->
					<!-- <text>{{ $getDictLabel(dictMap, 'vehicle_type', item.vehicleTypeId) }}</text> -->
					<!-- 使用性质： -->
					<!-- <text>{{ $getDictLabel(dictMap, 'vehicle_use_type', item.useTypeId) }}</text> -->
				<!-- </view>
				<view class="card-item">所属公司：{{ item.company.title }}</view>
			</view>
		</view>
	</view> -->
	<view >开发中</view>
</template>

<script>
import initDict from '@/mixins/initDict';
export default {
	mixins: [initDict],
	data() {
		return {
			cardData: []
		};
	},
	onLoad() {
		// this.getDictMap('vehicle_type,vehicle_use_type,vehicle_status,operation_vehicle_type,operation_vehicle_business_scope');
		// this.fetch();
	},
	methods: {
		onSearch(event) {
			this.fetch({ plateNo: event.detail });
		},
		async fetch(payload = {}) {
			// 后面做懒加载
			const res = await this.$http.get('api/info/vehicle', { page: 0, size: 100, ...payload });
			this.cardData = res.content;
		}
	}
};
</script>

<style>
.item + .item {
	margin-top: 24upx;
}
</style>
