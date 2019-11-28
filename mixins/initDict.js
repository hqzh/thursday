export default {
	data() {
		return {
			dicts: [],
			dictMap: {}
		}
	},
	methods: {
		async getDict(name) {
			return new Promise((resolve, reject) => {
				this.$http.get('api/dictDetail', {
					dictName: name,
					page: 0,
					size: 9999
				}).then(res => {
					this.dicts = res.content
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 多个字典查询时使用逗号拼接， 如：
		// 加载多个数据字典，如何调用如下：
		// this.getDict('user_status,job_status')
		// 在vue中使用加载出来的字典：
		// dictMap.[字典名称] 如：dictMap.user_status、 dictMap.job_status
		async getDictMap(names) {
			// 优先放入到dictMap中，避免页面加载时 undefined
			const arr = names.split(',')
			for (let i = 0; i < arr.length; i++) {
				this.dictMap[arr[i]] = []
			}
			return new Promise((resolve, reject) => {
				this.$http.get('api/dictDetail/map', {
						dictName: names,
						page: 0,
						size: 9999
				}).then(res => {
					this.dictMap = res
					// 把数据处理成表格字典筛选[{text,value}]的格式
					Object.keys(res).map(item => {
						this.$set(this.dictMap, item, res[item].map(opt => ({ ...opt,
							value: opt.id,
							text: opt.label,
							val: opt.value
						})))
					})
					resolve(this.dictMap)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}
