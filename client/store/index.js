import { types } from './mutations-type.js';

export const state = () => ({
	ModalsState: {
		show: false,
		modalName: undefined,
		commandSent: false,
		result: '',
		params: {}
	},
})

export const mutations = {
	[types.SET_MODAL] (state, {modalName, show = false, params={}} = {}) {
		state.ModalsState = {
			show,
			modalName,
			commandSent: false,
			result: '',
			params
		}
	},
	[types.SET_MODAL_RESULT] (state, {commandSent=true, result='inProgress'} = {}) {
		state.ModalsState.commandSent = commandSent;
		state.ModalsState.result = result;
	},
}

// export const actions = {
// 	async init({commit}) {
		
// 	}
// }
