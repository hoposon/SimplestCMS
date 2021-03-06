import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'
import { config } from './config.js'

export const state = () => ({
	// token: undefined,
	user: {
		email: 'dsfsdfs@fsdf.com',
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTU3MTY5MTk5NX0.4ITvMc597i9963kAvr8jW8-dB0-q3p_n-jGhpEuNu6Y",
		roles: ['admin']
	}
	// user: {}
	
})

export const getters = {
	// acl: (rootState) => (compName) => {
	// 	return config.acls[compName].find(aclRols => rootState.user.roles.find(role => aclRols === role))
	// }
	acl: (state) => (compName) => {
		return config.acls[compName].find(aclRols => state.user.roles.find(role => aclRols === role))
	}
}

export const mutations = {
	[types.SET_USER] (state, {user}) {
		state.user = user;
	}
}

export const actions = {
	async login({ state, commit }, credentials) {
		try {
			const client = newGrphQlClient({state})
			const result = await client.request(Queries.loginQuery, credentials);
			if (result && result.login && result.login.token) {
				commit(types.SET_USER, {user: result.login})
				commit(types.CHANGE_APOLLO_CLIENT, {}, { root: true })
			} else {
				throw new Error('Internal error')
			}
			
			return result;
		} catch(e) {
			console.log('login exception >>>> ', e)
			throw new Error(e.message)
		}
	},
	validate({},{value, type, selector}) {
		// !TODO - I think I should delete the type parameter
		// not sure about the type parameter - need to check if #type selects anything. I guess I added it probably necause of the text fields of a registration form
		switch (type) {
			case 'email':
				const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // eslint-disable-line no-useless-escape
				if (reg.test(value)) {
					document.querySelector('#'+(selector||type)).classList.remove('invalid')
					return true;
				} else {
					document.querySelector('#'+(selector||type)).classList.add('invalid')
					return false;
				}
			case 'password':
				if (value.length > 0) {
					document.querySelector('#'+(selector||type)).classList.remove('invalid')
					return true;
				} else {
					document.querySelector('#'+(selector||type)).classList.add('invalid')
					return false;
				}
		}
	}

}