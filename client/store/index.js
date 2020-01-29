import { types } from './mutations-type.js';

// import { apolloClient } from './helpers.js';

// const apollClient = apolloClient({user: {
// 	email: 'dsfsdfs@fsdf.com',
// 	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTU3MTY5MTk5NX0.4ITvMc597i9963kAvr8jW8-dB0-q3p_n-jGhpEuNu6Y",
// 	roles: ['admin']
// }})

export const state = () => ({
	ModalsState: {
		show: false,
		modalName: undefined,
		commandSent: false,
		result: '',
		params: {}
	},
	// user: {
	// 	email: 'dsfsdfs@fsdf.com',
	// 	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTU3MTY5MTk5NX0.4ITvMc597i9963kAvr8jW8-dB0-q3p_n-jGhpEuNu6Y",
	// 	roles: ['admin']
	// },
	// apolloClient: apollClient
})

export const mutations = {
	[types.SET_USER] (state, {user}) {
		state.user = user;
	},
	[types.SET_MODAL] (state, {modalName, show = false, params={}} = {}) {
		state.ModalsState = {
			show,
			modalName,
			commandSent: false,
			result: '',
			params
		}
	},
	// [types.CHANGE_APOLLO_CLIENT] (state) {
	// 	state.apolloClient = apolloClient(state)
	// },
	[types.SET_MODAL_RESULT] (state, {commandSent=true, result='inProgress'} = {}) {
		state.ModalsState.commandSent = commandSent;
		state.ModalsState.result = result;
	},
}

export const getters = {
	genCode: (state) => (name) => {
		if (name) {
			const regCode = /[^A-Za-z0-9]/g;
			return name.replace(regCode, '-')
		} else {
			return ''
		}
		
	}
}
// export const actions = {
// 	async init({commit}) {
		
// 	}
// }
