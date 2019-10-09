import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'
// import { config } from './config.js'

export const state = () => ({
	currentPage: '',
	pages: []
})

export const mutations = {
	[types.SET_CURRENT_PAGE] (state, {id}) {
		state.currentPage = state.pages.find(page => page.id === id);
	},
	[types.SET_PAGES] (state, {pages}) {
		state.pages = pages;
	}
}

export const actions = {
	async createPage({ rootState, dispatch, commit }, {pageName, subUrl}) {
		try {
			const regCode = /[^A-Za-z0-9]/g;
			const client = newGrphQlClient({state: rootState})
			const page =  {pageName, pageCode: pageName.replace(regCode, '-'), urlId: parseInt(rootState.urls.currentUrl.id), subUrl};
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