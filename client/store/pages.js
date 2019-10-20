import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'
import { ContentString, Asset, Gallery } from '../data/contentTypes'

export const state = () => ({
	currentPage: '',
	pages: [],
	// pagesContents: {},
	pagesContents: {},
	pageContents: [],
	contentIds: 1
})

export const mutations = {
	[types.SET_CURRENT_PAGE] (state, {id}) {
		state.currentPage = state.pages.find(page => page.id === id);
		state.pageContents = state.pagesContents[state.currentPage.pageCode];
	},
	[types.SET_PAGES] (state, {pages}) {
		state.pages = pages;

		// init pagesContents
		// let pagesContents = {}
		// state.pages.forEach(page => {
		// 	pagesContents[page.pageCode] = {id: state.contentIds++, contents: []};
		// })
		// state.pagesContents = pagesContents;
		state.pages.forEach(page => {
			state.pagesContents[page.pageCode] = [];
		})
	},
	[types.ADD_CONTENT] (state, {contentType}) {
		// console.log(contentType)
		let content = '';
		switch(contentType) {
			case 'CONTENT_STRING':
				content = new ContentString(state.contentIds++)
				break;
			case 'ASSET':
				content = new Asset(state.contentIds++)
				break;
			case 'GALLERY':
				content = new Gallery(state.contentIds++)
				break;
		}
		// if (state.pagesContents[state.currentPage.pageCode]) {
		// 	state.pagesContents[state.currentPage.pageCode].push(content)
		// } else {
		// 	state.pagesContents[state.currentPage.pageCode] = [];
		// 	state.pagesContents[state.currentPage.pageCode].push(content)
		// }
		// let tempContents = JSON.parse(JSON.stringify(state.pagesContents[state.currentPage.pageCode]))
		// tempContents.push(content)
		// // state.pagesContents[state.currentPage.pageCode].push(content)
		// console.log(JSON.stringify(state.pagesContents))
		
		// delete state.pagesContents[state.currentPage.pageCode];
		// state.pagesContents[state.currentPage.pageCode] = tempContents
		// console.log(state.pagesContents)
		// state.pagesContents[state.currentPage.pageCode].contents.push(content);
		// state.pagesContents[state.currentPage.pageCode].id = state.contentIds++;
		state.pageContents.push(content);
		state.pagesContents[state.currentPage.pageCode] = state.pageContents;
	}
}

export const actions = {
	async createPage({ rootState, dispatch, rootGetters }, {pageName, subUrl}) {
		try {
			// const regCode = /[^A-Za-z0-9]/g;
			const client = newGrphQlClient({state: rootState})
			const page =  {pageName, pageCode: rootGetters.genCode(pageName), urlId: parseInt(rootState.urls.currentUrl.id), subUrl};
			const result = await client.request(Queries.createPage, {page});
			if (result && result.createPage) {
				// console.log('result: ', result)
				dispatch('getPages', {id: result.createPage.id})
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('createPage exception >>>> ', e)
			throw new Error('Internal error')
		}
		
	},
	async getPages({ commit, rootState }, {id=false}={}) {
		try {
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.urlsPages, {urlId: parseInt(rootState.urls.currentUrl.id)});
			if (result) {
				commit(types.SET_PAGES, {pages: result.pages})
				if (id) {
					commit(types.SET_CURRENT_PAGE, {id});
				}
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('getPages exception >>>> ', e)
		}
	}
}