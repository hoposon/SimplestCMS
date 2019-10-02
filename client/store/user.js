import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'
import { config } from './config.js'

export const state = () => ({
	// token: undefined,
	user: {
		email: 'dsfsdfs@fsdf.com',
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE1Njc4OTA0NDZ9.ZDFbfTYnvWamY1NxVYk6PSaWDQ1THvXTltSzkBu8i1Y",
		roles: ['admin']
	}
	// user: {}
	
})

export const getters = {
	
	acl: (state) => (compName) => {
		return config.acls[compName].find(aclRols => state.user.roles.find(role => aclRols === role))
	}
		
	// config.acls[compName].find(aclRols => state.user.roles.find(role => aclRols === role))
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