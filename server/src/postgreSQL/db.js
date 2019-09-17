const knex = require('knex');
const { pgConfig } = require('../config/pg.config')

const changeCase = require('change-case');

let pg = knex(pgConfig);

function switchCase(key, typeCase) {
	if (typeCase === 'snakeCase') return changeCase.snakeCase(key)
	if (typeCase === 'camelCase') return changeCase.camelCase(key)
}

function switchObjectKeysCase(obj, typeCase) {
	let temp = {};
	Object.keys(obj).forEach(key => {
		temp[switchCase(key, typeCase)] = obj[key]
	})
	return temp;
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
			let urls = await pg('users_urls').join('urls', 'users_urls.url_id', '=', 'urls.id').select('urls.id', 'urls.url_name', 'users_urls.is_owner').where('users_urls.user_id', userId)
			urls = urls.map(url => {
				return switchObjectKeysCase(url, 'camelCase')
			})
			return urls
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
		console.log('createURL >>>>>')
		try {
			return switchObjectKeysCase((await pg.raw('select url_id as id, url_name, owner as is_owner from app_public.create_users_urls(?, ?, ?);', Object.values(switchObjectKeysCase(url, 'snakeCase')))).rows[0], 'camelCase')
		}
		catch(e) {
			console.log('pg.createUrl exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined;
		}
	}

	async createDir(dir) {
		console.log('createDir >>>>>')
		try {
			// const {dirName: dir_name, parentDirId: parent_dir = null} = dir;
			return {...dir, id: (await pg('dirs').insert(switchObjectKeysCase(dir, 'snakeCase')).returning('id'))[0]}
			// return {
			// 	res: await pg('dirs').insert({dir_name, parent_dir}).returning('id'),
			// 	exception: '',
			// 	code: 'OK'
			// }
		}
		catch(e) {
			console.log('pg.createDir exception: ', e)
			// return {
			// 	exception: e,
			// 	code: 'EXCEPTION',
			// 	res: []
			// }
			return undefined;
		}
	}

	async createPage(page, url, userId) {
			
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

module.exports = {
	DB
}