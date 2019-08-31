import { types } from './mutations-type.js';

export const state = () => ({
	userToken: undefined
})

export const mutations = () => ({
	[types.SET_USER_TOKEN] (state, {userToken}) {
		state.userToken = userToken;
	}
})