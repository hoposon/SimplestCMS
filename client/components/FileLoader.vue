<template>
	<div class='directory-view offset-2 col-6'>
		<!-- <button class="btn-custom" @click='selectFiles()'>Add files</button> -->
		<input id='file-loader' type='file' multiple :accept='accept' hidden @change="uploadImages($event.files)"/>
		<div ref='dropZone' class='drop-zone row'>
			<DirItem v-for='dir in dirsList' :key='dir.id' :dir='dir' />
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import DirItem from './manage-assets/DirItem'

	export default {
		components: {
			DirItem
		},
		props: [
		],
		data() {
			return {
				accept: 'image/png, image/jpg, image/jpeg, image/svg',
			}
		},
		computed: {
			dirsList() {
				return this.currentChildren
			},
			...mapState({
				currentUrl: state => state.urls.currentUrl,
				// dirs: state => state.assets.dirs,
				// currentDir: state => state.assets.currentDir,
				currentChildren: state => state.assets.currentChildren
			})
		},
		methods: {
			uploadImages(files) {
				console.log(files)
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					
					if (!file.type.startsWith('image/')){ continue }
					
					const img = document.createElement("img");
					img.classList.add("thumbnail");
					img.file = file;
					this.$refs.filesView.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
					
					const reader = new FileReader();
					reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
					reader.readAsDataURL(file);
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
				getDirs: 'assets/getDirs'
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
		}
	}
</script>

<style>
	.drop-zone {
		height: calc(100vh - 272px);
		margin: 0px 20px 50px 50px;
		border: 1px solid var(--acc-dark-col)
	}
	.assets-view {

	}

	.thumbnail {
		width: 40px;
	}

</style>