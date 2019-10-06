import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'
import { config } from './config.js'

export const state = () => ({
	currentPage: '',
	pages: []
})

export const mutations = {
	[types.SET_CURRENT_PAGE] (state, {page}) {
		state.currentPage = page;
	},
	[types.SET_PAGES] (state, {pages}) {
		state.pages = pages;
	}
}

export const actions = {
	async createPage({ rootState, dispatch }, {pageName, subUrl}) {
		try {
			const regCode = /[^A-Za-z0-9]/g;
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.createPage, {pageName, pafeCode: pageName.replace(regCode, '-'), urlId: rootState.urls.currentUrl.id, subUrl});
			if (result) {
				console.log('result: ', result)
				// dispatch('getUrls')
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('createUrl exception >>>> ', e)
		}
		
	},
}