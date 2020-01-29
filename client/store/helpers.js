import { GraphQLClient } from 'graphql-request'
import { config } from './config'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from "apollo-upload-client";


function apolloClient(user) {

	let headers = {};
	console.log('user >>>>', user)
	if (user && user.token) {
		headers = {authorization: `Bearer ${user.token}`}
		console.log('headers 1 >>>>', headers)
	}
	console.log('headers >>>>', headers)

	// HTTP connection to the API
	// const httpLink = createHttpLink({
	// 	// You should use an absolute URL here
	// 	uri: config.graphQLEndpoint,
	// 	credentials: 'omit', 
	// 	headers
	// })

	const httpLink = createUploadLink({
		// You should use an absolute URL here
		uri: config.graphQLEndpoint,
		credentials: 'omit', 
		headers
	})


	// Cache implementation
	const cache = new InMemoryCache()

	// Create the apollo client
	return new ApolloClient({
		link: httpLink,
		cache,
	})
}

function newGrphQlClient({state, headers={}}) {
	let client = undefined
	if (state.user.user && state.user.user.token) {
		client = new GraphQLClient(config.graphQLEndpoint, {
			credentials: 'omit', 
			headers: {
				...{authorization: `Bearer ${state.user.user.token}`},
				...headers
			}})
	} else {
		client = new GraphQLClient(config.graphQLEndpoint, {credentials: 'omit'})
	}
	return client;
}


export {
	newGrphQlClient,
	apolloClient
}