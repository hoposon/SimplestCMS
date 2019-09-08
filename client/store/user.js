import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries'

export const state = () => ({
	// userToken: undefined,
	userToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE1Njc4OTA0NDZ9.ZDFbfTYnvWamY1NxVYk6PSaWDQ1THvXTltSzkBu8i1Y"
})

export const mutations = {
	[types.SET_USER_TOKEN] (state, {userToken}) {
		state.userToken = userToken;
	}
}

export const actions = {
	async login({ state, commit }, credentials) {
		try {
			const client = newGrphQlClient({state})
			const result = await client.request(Queries.loginQuery, credentials);
			if (result && result.login && result.login.token) {
				commit(types.SET_USER_TOKEN, {userToken: result.login.token})
			} else {
				throw new Error('Internal error')
			}
			
			return result;
		} catch(e) {
			console.log('login exception >>>> ', e)
		}
	},
	validate({},{value, type, selector}) {
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