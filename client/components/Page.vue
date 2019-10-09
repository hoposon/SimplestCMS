<template>
	<div class="page col-9">
		<h5>Current Page</h5>
		<div>
			<div class="page-info mt-2">
				<span>{{currentUrl.urlName}}</span><span v-if='currentPage.subUrl'>{{currentPage.subUrl}}</span><span>/{{currentPage.pageName}}</span>
			</div>
			<div>
				<span>Page code:&nbsp;</span><span class="code">{{currentPage.pageCode}}</span>
			</div>
		</div>
		<div class="d-flex justify-content-center mt-3">
			<button class="btn-custom col-2">Add Content</button>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState({
				currentPage: state => state.pages.currentPage,
				currentUrl: state => state.urls.currentUrl
			})
		}	
	}
</script>

<style>
	.page {
		margin-top: 30px;
		margin-left: 30px;
		padding-left:0;
		padding-right:0;
	}

	.page h5 {
		color: var(--main-col)
	}

	.page .page-info {
		width: auto;
	}

	.page .code {
		color: var(--acc-light-col)
	}
</style>