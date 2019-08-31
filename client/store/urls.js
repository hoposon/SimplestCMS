import { types } from './mutations-type.js';

export const state = () => ({
	currentUrl: undefined
})

export const mutations = () => ({
	[types.SET_CURRENT_URL] (state, {currentUrl}) {
		state.currentUrl = currentUrl;
	}
})