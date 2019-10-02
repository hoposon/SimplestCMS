import { GraphQLClient } from 'graphql-request'
import { config } from './config'

function newGrphQlClient({state}) {
	let client = undefined
	if (state.user.user && state.user.user.token) {
		client = new GraphQLClient(config.graphQLEndpoint, {
			credentials: 'omit', 
			headers: {
				authorization: `Bearer ${state.user.user.token}`,
			}})
	} else {
		client = new GraphQLClient(config.graphQLEndpoint, {credentials: 'omit'})
	}
	return client;
}


export {
	newGrphQlClient
}