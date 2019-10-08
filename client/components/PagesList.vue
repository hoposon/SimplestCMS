<template>
	<div class="pages-list col-2 d-flex flex-column">
		<div class="no-site d-flex justify-content-center" v-if='!currentUrl'>
			<span>Select site to be managed first</span>
		</div>
		<div v-else class="d-flex flex-column">
			<h5>Manage Content</h5>
			<AddPages v-if='acl("AddPages")' />
			<List v-for='(pages, subUrl) in pagesToList' :key='subUrl' :subUrl='subUrl' :pages='pages' />
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
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
				if (this.pages !== {}) {
					this.pages.forEach(page => {
						if (page.subUrl && page.subUrl.substring(page.subUrl.length -1, page.subUrl.length) === '/') {
							page.subUrl = page.subUrl.substring(0, page.subUrl.length-1)
						}
						if (!page.subUrl || page.subUrl.substring(0,1) !== '/') {
							page.subUrl = '/' + page.subUrl;
						}
						if (!pagesList[page.subUrl]) {
							pagesList[page.subUrl] = [page]
						} else {
							pagesList[page.subUrl].push(page)
						}
					});
				}
				return pagesList;
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
			})
		},
		watcher: {
			currentUrl: function() {
				console.log('current url change')
				this.getPages();
			}
		},
		mounted() {
			if (this.currentPage) {
				this.getPages();
			}			
		}
		// mounted() {
		// 	console.log('mounted >>> ', this.acl)
		// 	console.log(this.$store)
		// 	this.$store.getters['user/acl']('sfs')
		// 	// this.pagesToList()
		// }
	}
</script>

<style>
	.pages-list {
		padding-left: 30px; 
		padding-right: 30px;
		margin-top: 30px;
		border-right: 1px solid var(--acc-dark-col);
	}

	.pages-list .no-site {
		background-color: var(--main-col);
		padding: 10px;
		color: var(--font-light-col);
		border-radius: 3px;
		box-shadow: 0px 0px 10px 0px var(--shade-for-light-col)
	}

</style>