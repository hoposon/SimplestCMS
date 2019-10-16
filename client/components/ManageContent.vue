<template>
	<div class="manage-content row">
		<PagesList />
		<!-- <div>Here {{currentPage}}</div> -->
		<Page v-if='currentPage' />
		<!-- <Page /> -->
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	import PagesList from './PagesList';
	import Page from './Page';

	export default {
		components: {
			PagesList,
			Page
		},
		computed: {
			...mapState({
				currentPage: state => state.pages.currentPage
			})
		}
	}
</script>

<style>
	.manage-content {
		position: fixed;
		top: 72px;
		left: 0;
		right: 0;
		height: 100%;
		/* margin-top: 672x; */
	}
</style>