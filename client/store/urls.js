import { types } from './mutations-type.js';
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries'

export const state = () => ({
	currentUrl: '',
	urlsInitialized: false,
	urls: []
})

export const mutations = {
	[types.SET_CURRENT_URL] (state, {currentUrl}={}) { //currentUrl = url id
		if (!currentUrl) {
			state.currentUrl = state.urls[0]
		} else {
			state.currentUrl = state.urls.find(url => url.id === currentUrl);
		}
	},
	[types.SET_USERS_URLS] (state, {urls}) {
		state.urls = urls;
		state.urlsInitialized = true;
	}
}

export const actions = {
	async createUrl({ rootState, dispatch }, {urlName}) {
		try {
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.createUrl, {urlName});
			if (result) {
				console.log('result: ', result)
				dispatch('getUrls', result.createUrl.id)
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('createUrl exception >>>> ', e)
			throw new Error(e)
		}
		
	},
	async getUrls({ commit, rootState }, createdUrl=null) {
		try {
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.userUrls);
			if (result) {
				commit(types.SET_USERS_URLS, {urls: result.urls})
				if (result.urls.length == 1) {
					commit(types.SET_CURRENT_URL);
				} else if (createdUrl) {
					commit(types.SET_CURRENT_URL, {currentUrl: createdUrl});
				}
			} else {
				throw new Error('Internal error')
			}
		} catch(e) {
			console.log('getUrls exception >>>> ', e)
		}
	}
}

