const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
// const { feed } = require('./resolvers/Query.js');
// const { signup,	login, post } = require('./resolvers/Mutation.js');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')


const resolvers = {
	Query,
	Mutation,
	Subscription,
	User,
	Link,
	Vote
}


const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	// resolvers: {
	// 	feed,
	// 	signup,	
	// 	login, 
	// 	post
	// },
	resolvers,
	context: request => {
		return {
			...request,
			prisma,
		}
	},
})
server.start(() => console.log(`Server is running on http://localhost:4000`))






// const resolvers = {
// 	Query: {
// 	  	info: () => `This is the API of a Hackernews Clone`,
// 	  	// 2
// 		// feed: () => links,
// 	  	feed: (root, args, context, info) => {
// 			return context.prisma.links()
// 		},
// 		// link: (id) => links.find(link => link.id === id)
// 	},
// 	Mutation: {
		
// 		post: (root, args, context) => {
// 			return context.prisma.createLink({
// 				url: args.url,
// 				description: args.description,
// 			})
// 		}


// 		// post: (parent, args) => {
// 		//     const link = {
// 		// 		id: `link-${idCount++}`,
// 		// 		description: args.description,
// 		// 		url: args.url,
// 		// 	}
// 		// 	links.push(link)
// 		// 	return link
// 		// },
// 		// updateLink: (parent, args) => {
// 		// 	let link = {
// 		// 		id: args.id,
// 		// 		description: args.description,
// 		// 		url: args.url
// 		// 	}
// 		// 	links.map(l => {
// 		// 		if (l.id === args.id) {
// 		// 			l.url = link.url;
// 		// 			l.description = link.description;
// 		// 		}
// 		// 	});
// 		// 	// links.forEach((value, key) => {
// 		// 	// 	if (value.id === link.id) {
// 		// 	// 		links.splice(key, 1, link);
// 		// 	// 		return;
// 		// 	// 	}
// 		// 	// })
// 		// 	return link
// 		// },
// 		// updateLink: (parent, {id, url, description}) => {
// 		// 	let link = {id,	description, url}
// 		// 	links.map(l => {
// 		// 		if (l.id === id) {
// 		// 			l.url = link.url;
// 		// 			l.description = link.description;
// 		// 		}
// 		// 	});
// 		// 	return link
// 		// },
// 		// deleteLink: (parent, args) =>  {
// 		// 	const index = links.findIndex(link => link.id === args.id);
// 		// 	console.log(index)
// 		// 	if (index !== -1) {
// 		// 		console.log(links)
// 		// 		let link = links.splice(index,1)
// 		// 		console.log(link)
// 		// 		console.log(links)
// 		// 		return link[0]
// 		// 	}
// 		// }
// 	},
//   }