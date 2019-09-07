// import { types } from './mutations-type.js';

export const state = () => ({
	ModalsState: {
		show: false,
		modalName: undefined,
		commandSent: false,
		result: '',
		// params: {}
	},
})

// export const mutations = {
// 	[types.SET_AUTH_HEADER] (state, {userToken}) {
// 		state.gQLClient.headers = {
// 			authorization: `Bearer ${userToken}`
// 		}
// 	}
// }

// export const actions = {
// 	async init({commit}) {
		
// 	}
// }
