<template>
	<div class="dir-item d-flex justify-content-center align-items-center" @click=''>
		<span>{{ dir.dirName }}</span>
	</div>
</template>

<script>
	import { mapMutations, mapActions } from 'vuex';

	export default {
		props: [
			'dir'
		],
		methods: {
			async setThisDir() {
				this.setCurrentDir({dirId: dir.id})
				await this.getDirAssets();
			},
			...mapMutations({
				setCurrentDir: 'assets/SET_CURRENT_DIR'
			}),
			...mapActions({
				getDirAssets: 'assets/getDirAssets'
			})
		}
	}
</script>

<style>
	.dir-item {
		/* border: 1px solid var(--shades-dark-col); */
		margin: 1px;
		height: 198px;
		width: 198px;
		float: left;
		background-color: var(--shades-light-col);
		cursor: pointer
	}

	.dir-item:hover {
		background-color: var(--acc-light-col);
		box-shadow: 1px 1px 15px 5px var(--shade-for-light-col);
	}
</style>