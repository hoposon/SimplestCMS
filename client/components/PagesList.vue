<template>
	<div class="pages-list col-2">
		<div>Pages</div>
		<List v-for='(pages, subUrl) in pagesToList' :key='subUrl' :subUrl='subUrl' :pages='pages' />
	</div>
</template>

<script>
	import List from './List'

	export default {
		components: {
			List
		},
		data() {
			return {
				pages: [
					{
						id: 1,
						pageName: 'navigation bar',
						pageCode: 'navbar',
						urlId: 14,
						subUrl: ''
					},
					{
						id: 2,
						pageName: 'page 1',
						pageCode: 'page-1',
						urlId: 14,
						subUrl: '/page1'
					},
					{
						id: 3,
						pageName: 'page 2',
						pageCode: 'page-2',
						urlId: 14,
						subUrl: '/page2'
					},
					{
						id: 4,
						pageName: 'page 3',
						pageCode: 'page-3',
						urlId: 14,
						subUrl: '/page2/page3'
					},
					{
						id: 5,
						pageName: 'page 4',
						pageCode: 'page-4',
						urlId: 14,
						subUrl: ''
					},
					{
						id: 6,
						pageName: 'footer',
						pageCode: 'footer',
						urlId: 14,
						subUrl: ''
					},
					{
						id: 7,
						pageName: 'footer1',
						pageCode: 'footer1',
						urlId: 14,
						subUrl: '/'
					}
				],
			}
		},
		computed: {
			pagesToList() {
				const pagesList = {};
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
				return pagesList;
			}
		},
		// mounted() {
		// 	this.pagesToList()
		// }
	}
</script>

<style>
	.pages-list {
		border-right: 1px solid gray;
	}
</style>