<template>
	<div class="manage-content row">
		<div class="no-site d-flex justify-content-center col-12" v-if='!currentUrl'>
			<span class="m-auto">Select site to be managed</span>
		</div>
		<div v-else class="col-12">
			<div class="row">
				<PagesList />
				<Page v-if='currentPage' />
			</div>
		</div>
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
				currentUrl: state => state.urls.currentUrl,
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
		/* height: 100%; */
		/* margin-top: 672x; */
	}

	.manage-content .no-site {
		background-color: var(--main-col);
		padding: 10px;
		margin-top: 1px;
		color: var(--font-light-col);
		/* border-radius: 3px; */
		box-shadow: 0px 0px 10px 0px var(--shade-for-light-col)
	}
</style>