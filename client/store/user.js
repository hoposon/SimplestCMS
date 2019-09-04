import { types } from './mutations-type.js'
import { GraphQLClient } from 'graphql-request'
import { config } from './config'
import { Queries } from './graphQueries'

export const state = () => ({
	userToken: undefined,
	// client: new GraphQLClient(config.graphQLEndpoint, {})
})

export const mutations = {
	[types.SET_USER_TOKEN] (state, {userToken}) {
		state.userToken = userToken;
	}
}

export const actions = {
	async login({commit, state}, credentials) {
		try {
			const client= new GraphQLClient(config.graphQLEndpoint, {credentials: 'omit'})
			let result = await client.request(Queries.loginQuery, credentials);
			commit(types.SET_USER_TOKEN, {userToken: result.login.token})
			return result;
		}
		catch(e) {
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
				break;
			case 'password':
				if (value.length > 0) {
					document.querySelector('#'+(selector||type)).classList.remove('invalid')
					return true;
				} else {
					document.querySelector('#'+(selector||type)).classList.add('invalid')
					return false;
				}
				break;
		}
	}

}