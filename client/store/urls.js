// import { types } from './mutations-type.js';
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries'

export const state = () => ({
	urls: []
})

export const mutations = {
	// [types.SET_CURRENT_URL] (state, {currentUrl}) {
	// 	state.currentUrl = currentUrl;
	// }
}

export const actions = {
	async createUrl({ rootState, dispatch }, {urlName}) {
		try {
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.createUrl, {urlName});
			if (result) {
				console.log('result: ', result)
				dispatch('getUrls')
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('createUrl exception >>>> ', e)
		}
		
	},
	async getUrls({ rootState }) {
		try {
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.userUrls);
			if (result) {
				console.log('result: ', result)
				// dispatch('getUrls')
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('createUrl exception >>>> ', e)
		}
	}
}

