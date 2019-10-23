<template>
	<div class='directory-view offset-2 col-6'>
		<!-- <button class="btn-custom" @click='selectFiles()'>Add files</button> -->
		<input id='file-loader' type='file' multiple :accept='accept' hidden @change="uploadImages($event.files)"/>
		<div ref='dropZone' class='drop-zone row'>
			<div class="directories-view col-6">
			</div>
			<div ref='filesView' class="files-view col-6">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
		],
		data() {
			return {
				accept: 'image/png, image/jpg, image/jpeg, image/svg'
			}
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
			}
		},
		mounted() {
			this.$refs.dropZone.addEventListener("dragenter", this.dragenter, false);
			this.$refs.dropZone.addEventListener("dragover", this.dragover, false);
			this.$refs.dropZone.addEventListener("drop", this.drop, false);
		}
	}
</script>

<style>
	.directory-view {
		height: calc(100vh - 72px);
	}
	.drop-zone {
		height: calc(100vh - 272px);
		margin: 0px 20px 50px 50px;
		border: 1px solid var(--acc-dark-col)
	}
	.thumbnail {
		width: 40px;
	}
</style>