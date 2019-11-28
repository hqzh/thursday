<template>
	<view class="wrap">
		<van-search :value="keyword" placeholder="请输入企业编码或名称" @search="onSearch" />
		<view class="card-wrap">
			<view v-for="item in cardData" :key="item.id" class="card item">
				<view class="card-item">{{ item.name }}</view>
				<view class="card-item">
					<text>车辆数：{{ item.vehicleCount}}</text>
					<text>联系人：{{ item.contact || ""}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import initDict from '@/mixins/initDict'
	export default {
		mixins: [initDict],
		data() {
			return {
				cardData: []
			};
		},
		onLoad() {
			// this.getDictMap(
			// 	'company_operation_status,company_department,company_scale,company_certification_status,company_dt_compliance_status,company_tt_compliance_status,gender,company_association_duty,company_business_scope,company_association_qualifications'
			// )
			this.fetch();
		},
		methods: {
			onSearch(event) {
				this.fetch({
					keyword: event.detail
				});
			},
			async fetch(payload = {}) {
				const res = await this.$http.post('companyInfo/get', {
					pageOffset: 0,
					pageSize: 10,
					sortDirect: "DESC",
					sortField: "modifyTime",
					...payload
				});
				this.cardData = res.data.content;
			}
		}
	};
</script>

<style>
	.item+.item {
		margin-top: 24upx;
	}
</style>
