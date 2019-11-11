<template>
	<img :src='src' class='thumbnail' />	
</template>

<script>
	export default {
		props: [
			'file'
		],
		computed: {
			src() {
				// if (!file.type.startsWith('image/'))
				return window.URL.createObjectURL(this.file);
			}
		}
		// created() {
			

		// 	const img = document.createElement("img");
		// 	img.classList.add("thumbnail");
		// 	img.file = this.file;

		// 	const reader = new FileReader();
		// 	reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
		// 	reader.readAsDataURL(file);
		// 	for (let i = 0; i < files.length; i++) {
		// 			const file = files[i];
					
		// 			if (!file.type.startsWith('image/')){ continue }
					
		// 			const img = document.createElement("img");
		// 			img.classList.add("thumbnail");
		// 			img.file = file;
		// 			this.$refs.dropZone.appendChild(img);

					
		// 		}
		// }
	}
</script>

<style>
	.thumbnail {
		width: 198px;
	}
</style>