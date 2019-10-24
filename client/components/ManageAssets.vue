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
					<button class="btn-custom mt-2" @click='createDir()'>Add Directory</button>
					<button class="btn-custom mt-2" :disabled='disabled' :class="{disabled}" @click='parentDir()'>{{ buttonText }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	import FileLoader from './FileLoader'

	export default {
		components: {
			FileLoader
		},
		computed: {
			disabled() {
				return this.currentDir.indexOf('/') == -1
			},
			buttonText() {
				if (this.currentDir.indexOf('/') > -1) {
					return 'Parent Directory'
				} else {
					return 'This is root directory'
				}
			},
			...mapState({
				currentUrl: state => state.urls.currentUrl,
				currentDir: state => state.assets.currentDir
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
			...mapMutations({
				showModal: 'SET_MODAL',
				parentDir: 'assets/CHANGE_PARENT_DIR'
			})
		},
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

	.manage-assets .assets-toolbar .disabled {
		background-color: #a08036;
	}

	.manage-assets h5 {
		color: var(--main-col);
		margin-bottom: 0;
		padding-top: 30px;
		padding-right: 10px;
		margin-right: 10px
	}

</style>