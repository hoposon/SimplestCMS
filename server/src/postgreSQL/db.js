const knex = require('knex');
const { pgConfig } = require('../config/pg.config')

const changeCase = require('change-case');

let pg = knex(pgConfig);

function switchCase(key, typeCase) {
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
		}
		catch(e) {
			console.log('pg.user exception: ', e)
			// !TODO - log exception
			// throw exception
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
			// !TODO - log exception
			// throw exception
			return undefined;
		}
	}

	async createUrl(url) {
		try {
			return new URL((await pg.raw('select url_id as id, url_name, owner as is_owner from app_public.create_users_urls(?, ?, ?);', Object.values(new URL(url, 'snakeCase')))).rows[0], 'camelCase')
		}
		catch(e) {
			console.log('pg.createUrl exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined;
		}
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
				this['password_hash'] = user[key]
			} else if (key === 'password_hash') {
				this['password'] = user[key]
			} else {
				this[switchCase(key, typeCase)] = user[key]
			}
		})
	}
}

class URL {
	constructor(url, typeCase) {
		Object.keys(url).forEach(key => {
			this[switchCase(key, typeCase)] = url[key]
		})
	}
}

module.exports = {
	DB,
	User
}