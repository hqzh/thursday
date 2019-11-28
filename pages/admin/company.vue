<template>
	<view class="wrap">
		<van-search :value="keyword" placeholder="请输入企业编码或名称" @search="onSearch" />
		<ws-load-more ref="loadMore" @provider="provider" :pageSize="10" class="card-wrap">
			<template v-slot:list="{ items }">
				<!-- 此处为插槽，只能使用template或其他自定义component -->
				<view class="card item" v-for="item in items" :key="item.id">
					<!-- 此处为每个元素的样式 -->
					<view class="card-item">{{ item.name }}</view>
					<view class="card-item">
						<text>车辆数：{{ item.vehicleCount}}</text>
						<text>联系人：{{ item.contact || ""}}</text>
					</view>
				</view>
			</template>
		</ws-load-more>
	</view>
</template>

<script>
	import initDict from '@/mixins/initDict'
	import wsLoadMore from '@/components/wsure-load-more/load-more.vue';
	export default {
		mixins: [initDict],
		components: {
			wsLoadMore
		},
		data() {
			return {
				keyword: " "
			};
		},
		onLoad() {
			// this.getDictMap(
			// 	'company_operation_status,company_department,company_scale,company_certification_status,company_dt_compliance_status,company_tt_compliance_status,gender,company_association_duty,company_business_scope,company_association_qualifications'
			// )
			this.$refs.loadMore.reLoadData()
		},
		methods: {
			onSearch(event) {
				this.keyword = event.detail;
				this.$refs.loadMore.reLoadData()
			},
			async fetch(payload = {}) {
				const res = await this.$http.post('companyInfo/get', {
					pageOffset: 0,
					pageSize: 10,
					sortDirect: "DESC",
					sortField: "modifyTime",
					keyword: this.keyword,
					...payload
				});
				return res.data.content;
			},
			async provider(e) {
				console.log(e);
				const {
					pageSize,
					pageNo
				} = e;
				const res =await this.fetch({
					pageOffset: pageNo - 1,
					pageSize
				})
				this.$refs.loadMore.pushData(res);
			},

			onReachBottom() {
				console.log("onReachBottom")
				this.$refs.loadMore.reachBottom()
			}
		}
	};
</script>

<style>
	.item+.item {
		margin-top: 24upx;
	}
</style>
