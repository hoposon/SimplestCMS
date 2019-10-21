<template>
	<div class="manage-assets row">
		<!-- <Assets /> -->
		<FileLoader />
		<div class="assets-toolbar col-2 d-flex flex-column align-items-center">
			<button class="btn-custom" @click='uploadFiles()'>Add File</button>
			<button class="btn-custom mt-2">Add Directory</button>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	// import Assets from './Assets';	
	import FileLoader from './FileLoader'

	export default {
		components: {
			// Assets
			FileLoader
		},
		computed: {
			...mapState({
				// currentPage: state => state.pages.currentPage
			})
		},
		methods: {
			uploadFiles() {
				let fileUpload = document.querySelector('#file-loader');
				if (fileUpload) {
					let event = new MouseEvent('click', {
						view: window,
						bubbles: true,
						cancelable: true
					});
					fileUpload.dispatchEvent(event);
				} else {
					// !TODO handle not found fileLoader
				}
				
			}
		}
	}
</script>

<style>
	
	.manage-assets {
		position: fixed;
		top: 72px;
		left: 0;
		right: 0;
		/* height: 100%; */
		/* margin-top: 672x; */
	}

	.assets-toolbar {
		/* padding: 0 30px 0 30px; */
		padding-left: 0;
		padding-right: 20px;
		margin-top: 100px;
	}

</style>