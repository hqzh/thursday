<template>
	<view class="root">
		<van-search :value="keyword" placeholder="请输入身份证或姓名" @search="onSearch" />
		<z-table :stickSide="true" showSelect :tableData="drivers" titleTextAlign="center" textAlign="center" :columns="columns"
		 @onSelect="tableSelect"></z-table>
	</view>
</template>

<script>
	import zTable from '@/components/z-table/z-table.vue';
	export default {
		components: {
			zTable
		},
		data() {
			return {
				drivers: [],
				id: '',
				keyword: '',
				columns: [{
						title: '序号',
						key: 'index',
					}, {
						title: '姓名',
						key: 'name',
					},
					{
						title: '所属公司',
						key: 'companyName',
						width: 400
					}, {
						title: '身份证号码',
						key: 'idCardNumber',
						width: 400
					},
				]
			};
		},
		onLoad(option = {}) {
			// this.id = JSON.parse(option.drivers).id;
			this.fetch();
		},
		methods: {
			onSearch(event) {
				this.fetch({
					keyword: event.detail
				})
			},
			tableSelect(val) {
				console.log(val);
			},
			async fetch(params = {}) {
				const {
					id,
					$http
				} = this;
				const res = await $http.post(`drivingLicenseInfo/get`, {
					pageOffset: 0,
					pageSize: 100,
					sortDirect: "DESC",
					sortField: "updateTime",
					...params
				});
				this.drivers = res.data.content;
			}
		}
	};
</script>
