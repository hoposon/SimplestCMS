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
				<div class="file-manager offset-2 col-8">
					<div class="current-path row d-flex align-items-center">
						<button class="btn-custom" :disabled='disabled' :class="{disabled}" @click='parentDir()'><<</button>
						<div v-for='(subPath, index) in currentPath' :key='index' class="path-indicator-item d-flex align-items-center">{{ subPath }}</div>
					</div>
					<FileLoader />
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
			currentPath() {
				let path = '';
				let currPath = [];
				// console.log('this.dirs >>> ', Object.keys(this.dirs).length)
				if (Object.keys(this.dirs).length > 0) {
					// console.log('> 0 >>>>>')
					this.currentDir.split('/').forEach(val => {
						path = path + val;
						currPath.push(this.dirs[path].dirName)
						path = path + '/'
					})
					// console.log('currPath >>> ', currPath)
					currPath.shift();
				}
				// console.log('currPath >>> ', currPath)
				return currPath
			},
			...mapState({
				currentUrl: state => state.urls.currentUrl,
				currentDir: state => state.assets.currentDir,
				dirs: state => state.assets.dirs
			})
		},
		methods: {
			
			...mapMutations({
				// showModal: 'SET_MODAL',
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

	.manage-assets h5 {
		color: var(--main-col);
		margin-bottom: 0;
		padding-top: 30px;
		padding-right: 10px;
		margin-right: 10px
	}

	.manage-assets .assets-zone {
		margin-top: 50px;
	}

	.assets-zone .file-manager {
		box-shadow: 1px 1px 12px 1px var(--shade-for-light-col);
		background-color: var(--acc-dark-col);
		padding: 10px 10px 10px 10px;
	}

	.assets-zone .current-path {
		width: 1000px;
		/* height: 40px; */
		background-color: white;
		padding-left: 0px;
		margin-bottom: 10px

	}

	.assets-zone .current-path .path-indicator-item {
		height: 40px;
		background-color: var(--acc-light-col);
		padding: 0 10px;
		color: var(--font-light-col);
		/* margin-left: 2px */
		border: 3px solid var(--shades-light-col);
		border-right: none;
	}

	.assets-zone .btn-custom {
		width: 70px;
		/* height: 36px;
		box-shadow: 0px 0px 10px 0px var(--shade-for-dark-col); */
		border-radius: 0px;
	}

	.assets-zone .current-path .disabled {
		background-color: #a08036;
	}

</style>