<template>
	<div class="manage-assets row">
		<div v-if='!currentUrl' class="no-site d-flex justify-content-center col-12">
			<span class="m-auto">You need to select site to be able to add assets</span>
		</div>
		<div v-else class="col-12">
			<div class="row justify-content-center">
				<h5>Manage assets</h5>
			</div>
			<div class="assets-zone row">
				<FileLoader />
				<div class="assets-toolbar col-2 d-flex flex-column align-items-center">
					<button class="btn-custom" @click='uploadFiles()'>Add File</button>
					<button class="btn-custom mt-2">Add Directory</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import FileLoader from './FileLoader'

	export default {
		components: {
			// Assets
			FileLoader
		},
		computed: {
			...mapState({
				currentUrl: state => state.urls.currentUrl
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
			},
			...mapActions({
				getDirs: 'assets/getDirs'
			})
		},
		mounted() {
			try {
				this.getDirs();
			}
			catch(e) {
				console.log('getDirs exception >>> ', e)
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

	.manage-assets .no-site {
		background-color: var(--main-col);
		padding: 10px;
		margin-top: 1px;
		color: var(--font-light-col);
		/* border-radius: 3px; */
		box-shadow: 0px 0px 10px 0px var(--shade-for-light-col)
	}

	.manage-assets .assets-zone {
		margin-top: 50px;
	}

	.manage-assets .assets-toolbar {
		/* padding: 0 30px 0 30px; */
		padding-left: 0;
		padding-right: 20px;
	}

	.manage-assets h5 {
		color: var(--main-col);
		margin-bottom: 0;
		padding-top: 30px;
		padding-right: 10px;
		margin-right: 10px
	}

</style>