<template>
	<div class="row">
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