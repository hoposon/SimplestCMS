import { types } from './mutations-type.js';
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries'

export const state = () => ({
	currentUrl: '',
	urls: []
})

export const mutations = {
	[types.SET_CURRENT_URL] (state, {currentUrl}) {
		state.currentUrl = state.urls.find(url => url.id === currentUrl);
	},
	[types.SET_USERS_URLS] (state, {urls}) {
		console.log('setting urls')
		state.urls = urls;
	}
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
	async getUrls({ commit, rootState }) {
		try {
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.userUrls);
			if (result) {
				commit(types.SET_USERS_URLS, {urls: result.urls})
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('getUrls exception >>>> ', e)
		}
	}
}

