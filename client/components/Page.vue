<template>
	<div class="page col-10">
		<div class="page-header">
			<div class="d-flex col-12 justify-content-between align-items-center">
				<h5>Manage page content</h5>
				<div class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownAddContentButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Content</button>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownAddContentButton">
						<button v-for='contentType in contentTypes' :key='contentType.type' class="dropdown-item" @click='addContent(contentType.code)'>{{ contentType.type }}</button>
					</div>
				</div>
			</div>
			<div class="page-info col-12">
				<span class="current-page-heading">Current page:&nbsp;</span><span>{{currentUrl.urlName}}</span><span v-if='currentPage.subUrl'>{{currentPage.subUrl}}</span><span>/{{currentPage.pageName}}</span>
				<span class="code-heading">Page code:&nbsp;</span><span class="code">{{currentPage.pageCode}}</span>
			</div>
		</div>
		<div class="page-content">
			<ContentComponent v-for='content in pageContents' :key='content.id' :content='content' />
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { contentTypes } from '../data/contentTypes.js'

	import ContentComponent from './ContentComponent.vue'

	export default {
		components: {
			ContentComponent
		},
		data() {
			return {
				contentTypes
			}
		},
 		computed: {
			...mapState({
				currentPage: state => state.pages.currentPage,
				currentUrl: state => state.urls.currentUrl,
				pageContents: state => state.pages.pageContents
			})
		}	
	}
</script>

<style>
	.page {
		margin-top: 30px;
		padding-left: 30px;
		padding-right: 30px;
		height: calc(100vh - 100px);
	}

	.page .page-header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.page h5 {
		color: var(--main-col);
		margin-bottom: 0;
	}

	.page .code-heading {
		border-left: 1px solid var(--shades-dark-col);
		padding-left: 10px;
		margin-left: 5px;
	}

	.page .dropdown .btn {
		background-color: var(--acc-light-col);
		border: none;
		box-shadow: 0px 0px 3px 0px var(--shade-for-dark-col);
	}

	.page .page-content {
		margin-top: 70px;
	}

</style>