<template>
	<div class='directory-view row justify-content-between'>
		<input id='file-loader' type='file' multiple :accept='accept' hidden @change="uploadImages($event)"/>
		<div ref='dropZone' class='drop-zone' :class='{"no-assets": noData}'>
			<DirItem v-for='dir in currentChildren' :key='dir.id' :dir='dir' />
			<div v-if='noData' class="no-assets-text">No assets here</div>
		</div>
		<div class="assets-toolbar col-2 d-flex flex-column align-items-center">
			<button class="btn-custom" @click='uploadFiles()'>Add File</button>
			<button class="btn-custom mt-2" @click='createDir()'>Add Directory</button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from 'vuex';

	import DirItem from './manage-assets/DirItem'

	export default {
		components: {
			DirItem
		},
		data() {
			return {
				accept: 'image/png, image/jpg, image/jpeg, image/svg'
			}
		},
		computed: {
			noData() {
				return this.currentChildren.length == 0 && this.currentAssets.length == 0
			},
			...mapState({
				currentUrl: state => state.urls.currentUrl,
				currentChildren: state => state.assets.currentChildren,
				currentAssets: state => state.assets.currentAssets
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
			createDir() {
				let options = {
					modalName: 'CreateDirectoryModal',
					show: true,
					params: {
						transl: 'Create directory',
						translResSuccess: 'Directory created successfully'
					}
				}
				this.showModal(options);
			},
			async uploadImages(event) {
				try {
					await this.storeAssets(event.target.files);
				}
				catch(e) {
					console.log('UploadImages exception >>>> ', e)
				}
				
			},
			dragenter(e) {
				e.stopPropagation();
				e.preventDefault();
			},
			dragover(e) {
				e.stopPropagation();
				e.preventDefault();
			},
			drop(e) {
				e.stopPropagation();
				e.preventDefault();

				const dt = e.dataTransfer;
				const files = dt.files;

				this.uploadImages(files);
			},
			...mapActions({
				getDirs: 'assets/getDirs',
				storeAssets: 'assets/storeAssets'
			}),
			...mapMutations({
				showModal: 'SET_MODAL',
			})
		},
		async mounted() {
			if (this.currentUrl) {
				try {
					await this.getDirs();
				}
				catch(e) {
					console.log('comp getDirs exception >>>> ', e)
				}
			}	
			this.$refs.dropZone.addEventListener("dragenter", this.dragenter, false);
			this.$refs.dropZone.addEventListener("dragover", this.dragover, false);
			this.$refs.dropZone.addEventListener("drop", this.drop, false);
		},
		async fetch({ store }) {
			await store.dispatch('assets/getDirAssets')		
		}
	}
</script>

<style>
	.directory-view {
		padding: 0;
	}
	.directory-view .drop-zone {
		display: block;
		width: 1012px;
		height: calc(100vh - 272px);
		overflow: auto;
		padding-bottom: 2px;
	}

	.directory-view .drop-zone::-webkit-scrollbar { 
		width: 4px !important 
	}

	.directory-view .drop-zone::-webkit-scrollbar-thumb {
		background: var(--acc-light-col);
	}

	.directory-view .drop-zone::-webkit-scrollbar-track {
		background: var(--shades-light-col)
	}

	.drop-zone.no-assets {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.no-assets-text {
		font-size: 25px;
		color: var(--font-light-col);
	}

	.directory-view .assets-toolbar .btn-custom {
		height: 40px;
		width: 198px;
		box-shadow: 0px 0px 10px 0px var(--shade-for-dark-col)
	}

</style>