<template>
	<div class="dir-item col-12" @click='setCurrentDir({dirId: dir.id})'>
		<span>{{ dir.dirName }}</span>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';

	export default {
		props: [
			'dir'
		],
		methods: {
			...mapMutations({
				setCurrentDir: 'assets/SET_CURRENT_DIR'
			})
		},
	}
</script>

<style>
	.dir-item {
		border: 1px solid var(--acc-light-col)
	}
</style>