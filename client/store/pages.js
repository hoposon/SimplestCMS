import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'
import { ContentString, Asset, Gallery } from '../data/contentTypes'

export const state = () => ({
	currentPage: '',
	pages: [],
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
		state.pages.forEach(page => {
			state.pagesContents[page.pageCode] = [];
		})
	},
	[types.ADD_CONTENT] (state, {contentType}) {
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
		state.pageContents.push(content);
		state.pagesContents[state.currentPage.pageCode] = state.pageContents;
	}
}

export const actions = {
	async createPage({ rootState, dispatch, rootGetters }, {pageName, subUrl}) {
		try {
			const client = newGrphQlClient({state: rootState})
			const page =  {pageName, pageCode: rootGetters.genCode(pageName), urlId: parseInt(rootState.urls.currentUrl.id), subUrl};
			const result = await client.request(Queries.createPage, {page});
			if (result && result.createPage) {
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
			if (!rootState.urls.currentUrl) throw new Error('Url not selected')
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.urlsPages, {urlId: parseInt(rootState.urls.currentUrl.id)});
			if (result && result.pages) {
				commit(types.SET_PAGES, {pages: result.pages})
				if (id) {
					commit(types.SET_CURRENT_PAGE, {id});
				}
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('getPages exception >>>> ', e)
			throw new Error(e)
		}
	}
}