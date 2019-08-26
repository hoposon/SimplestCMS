const knex = require('knex');
const { pgConfig } = require('../config/pg.config')

const changeCase = require('change-case');

let pg = knex(pgConfig);

function switchCase(key, typeCase) {
	// return changeCase[typeCase](key)
	// console.log('changeCase.snakeCase(key) >>>> ', changeCase.snakeCase(key))
	if (typeCase === 'snakeCase') return changeCase.snakeCase(key)
	if (typeCase === 'camelCase') return changeCase.camelCase(key)
}

class DB {
	constructor() {

	}

	// select
	async user({email}) {
		try {
			return new User((await pg.select().from('users').where('email', email))[0], 'camelCase');
			// return {
			// 	res: new User(user[0], 'camelCase'),
			// 	exception: '',
			// 	code: 'OK'
			// }
		}
		catch(e) {
			console.log('pg.user exception: ', e)
			// return {
			// 	exception: e,
			// 	code: 'EXCEPTION',
			// 	res: []
			// }
			return undefined
		}
	}

	async userUrls(userId) {
		try {
			return {
				res: await pg.select().from('user_urls').where('user_id', userId),
				exception: '',
				code: 'OK'
			}
		}
		catch(e) {
			console.log('pg.userUrls exception: ', e)
			return {
				exception: e,
				code: 'EXCEPTION',
				res: []
			}
		}
	}

	async pages(urlId, userId) {
		try {
			return {
				res: await pg.select().from('pages').where('url_id', urlId),
				exception: '',
				code: 'OK'
			}
		}
		catch(e) {
			console.log('pg.pages exception: ', e)
			return {
				exception: e,
				code: 'EXCEPTION',
				res: []
			}
		}
	}

	async pageById(pageId, userId) {
		try {
			return {
				res: await pg.select().from('pages').where(),
				exception: '',
				code: 'OK'
			}
		}
		catch(e) {
			console.log('pg.pageById exception: ', e)
			return {
				exception: e,
				code: 'EXCEPTION',
				res: []
			}
		}
	}

	async pageByCode(pageCode, userId) {

	}

	async dirs(url, userId) {

	}

	async dirAssets(dirId, url, userId) {

	}

	async assetUsed(assetId, url, userId) {

	}

	// create
	async createUser(user) {
		try {
			return {...user, id: (await pg('users').insert(new User(user, 'snakeCase')).returning('id'))[0]}
		}
		catch(e) {
			console.log('pg.createUser exception: ', e)
			// log({
			// 	exception: e,
			// 	code: 'EXCEPTION',
			// 	res: []
			// });
			return undefined;
		}
	}

	async createUrl(url, userId) {

	}

	async createPage(page, url, userId) {
			
	}

	async createDir(dir, url, userId) {
		try {
			const {dirName: dir_name, parentDirId: parent_dir = null} = dir;
			return {
				res: await pg('dirs').insert({dir_name, parent_dir}).returning('id'),
				exception: '',
				code: 'OK'
			}
		}
		catch(e) {
			console.log('pg.createDir exception: ', e)
			return {
				exception: e,
				code: 'EXCEPTION',
				res: []
			}
		}
	}

	// update
	async updatePage(page, userId) {

	}

	// delete
	async deleteDir(dirId, url, userId) {

	}

	async deleteAsset(assetId, url, userId) {

	}
}

class User {
	constructor(user, typeCase) {
		Object.keys(user).forEach(key => {
			if (key === 'password') {
				this[switchCase('password_hash', typeCase)] = user[key]
			} else if (key === 'passwor_hash') {
				this[switchCase('password', typeCase)] = user[key]
			} else {
				this[switchCase(key, typeCase)] = user[key]
			}
		})
	}
}

module.exports = {
	DB,
	User
}