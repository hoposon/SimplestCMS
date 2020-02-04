const { GraphQLServer } = require('graphql-yoga');
const express = require('express');
const { DB } = require('./src/postgreSQL/db');

const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');

// (async function () {
// 	console.log(await db.pages());
// })();

// (async function () {
// 	// console.log(await db.createDir({dirName: 'root', parentDirId: 5454554}, '', 444));
// 	console.log(await db.createDir({dirName: 'root'}, '', 444));
// })();

// (async function () {
// 	const user = {
// 		email: 'lukas.test@test.com',
// 		nickName: 'hop',
// 		firstName: 'lukas',
// 		lastName: 'houf',
// 		passwordHash: 'heslohesl0'
// 	}
// 	console.log(await db.createUser(user));
// })();

// (async function () {
// 	console.log(await db.user('lukas.test@test.com'));
// })();


const resolvers = {
	Query,
	Mutation
}

const server = new GraphQLServer({
	typeDefs: './src/config/schema.graphql',
	resolvers,
	context: request => {
		return {
			...request,
			db: new DB()
		}
	},
})

server.express.use("/", express.static("assets"));

server.start(() => console.log(`Server is running on http://localhost:4000`))