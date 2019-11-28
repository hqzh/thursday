<template>
	<view v-if="url">
		<van-popup :show="show" @close="show=false">
			<van-image width="100vw" height="40vh" fit="scale-down" :src="filePreviewApi+ url" />
		</van-popup>
		<van-image width="40" height="40" :src="filePreviewApi+ url" @click="handleShow" />
	</view>
</template>

<script>
	import {
		filePreviewApi
	} from '@/common/helper.js'
	export default {
		props: {
			url: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				show: false,
				filePreviewApi
			}
		},
		methods: {
			handleShow() {
				this.show = true
			}
		}
	}
</script>
