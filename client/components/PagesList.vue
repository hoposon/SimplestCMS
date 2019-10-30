<template>
	<div class="manage-pages col-2 d-flex h-100">
		<div class="d-flex flex-column col-12">
			<h5>Manage Content</h5>
			<AddPages v-if='acl("AddPages")' />
			<div class="pages-list">
				<List v-for='(pages, subUrl) in pagesToList' :key='subUrl' :subUrl='subUrl' :pages='pages' />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from 'vuex'
	import List from './List'
	import AddPages from './AddPages'

	export default {
		components: {
			List,
			AddPages
		},
		computed: {
			pagesToList() {
				const pagesList = {};
				if (this.pages.length > 0) {
					this.pages.forEach(page => {
						let pageTemp = JSON.parse(JSON.stringify(page));
						if (page.subUrl && page.subUrl.substring(page.subUrl.length -1, page.subUrl.length) === '/') {
							pageTemp.subUrl = pageTemp.subUrl.substring(0, pageTemp.subUrl.length-1)
						}
						if (!page.subUrl || page.subUrl.substring(0,1) !== '/') {
							pageTemp.subUrl = '/' + pageTemp.subUrl;
						}
						if (!pagesList[pageTemp.subUrl]) {
							pagesList[pageTemp.subUrl] = [pageTemp]
						} else {
							pagesList[pageTemp.subUrl].push(pageTemp)
						}
					});
				}
				const pagesListOrdered = {};
				Object.keys(pagesList).sort().forEach(key => {
					pagesListOrdered[key] = pagesList[key]
				})
				console.log('pagesListOrdered >>> ', pagesListOrdered)
				return pagesListOrdered;
			},
			...mapState({
				user: state => state.user.user,
				currentUrl: state => state.urls.currentUrl,
				currentPage: state => state.pages.currentPage,
				pages: state => state.pages.pages
			})
		},
		methods: {
			acl(compName) {
				return this.$store.getters['user/acl'](compName)
			},
			...mapActions({
				getPages: 'pages/getPages'
			}),
		},
		watch: {
			currentUrl: function() {
				this.getPages();
			}
		},
		async mounted() {
			if (this.currentUrl) {
				try {
					await this.getPages();
				}
				catch(e) {
					console.log('comp getPages exception >>>> ', e)
				}
			}			
		}
	}
</script>

<style>
	.manage-pages {
		padding-left: 30px; 
		padding-right: 30px;
		margin-top: 30px;
		border-right: 1px solid var(--acc-dark-col);
	}

	.pages-list {
		height: calc(100vh - 216px);
		overflow: auto;
		/* padding-right: 50px; */
	}

	.pages-list::-webkit-scrollbar { 
		width: 0 !important 
	}

</style>