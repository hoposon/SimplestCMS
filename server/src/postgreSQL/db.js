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

class test {

}

class DB {
	constructor() {

	}

	// select
	async user({email}) {
		try {
			let user = new User((await pg.select().from('users').where('email', email))[0], 'camelCase');
			let roles = await pg('user_roles').join('roles', 'user_roles.role_id', '=', 'roles.id').select('roles.role_name').where('user_roles.user_id', user.id);
			roles = roles.map(role => {
				return role.role_name
			})
			user.roles = roles
			return user
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
			console.log(urls)
			return urls
		}
		catch(e) {
			console.log('pg.userUrls exception: ', e)
			// return {
			// 	exception: e,
			// 	code: 'EXCEPTION',
			// 	res: []
			// }
			return undefined
		}
	}

	async pages(urlId, userId) {
		try {
			console.log(urlId)
			console.log(userId)
			// let pages = await pg.select().from('pages').where({'pages.user_id': userId, 'pages.url_id': urlId})
			// let pages = await pg('pages').join('users_urls', 'users_urls.url_id', '=', 'pages.url_id').select('pages.*').where({'users_urls.url_id': urlId, 'users_urls.user_id': userId})
			let pages = await pg('pages').join('users_urls', 'users_urls.url_id', '=', 'pages.url_id').select('pages.*').where({'users_urls.url_id': urlId, 'users_urls.user_id': userId})
			pages = pages.map(page => {
				return switchObjectKeysCase(page, 'camelCase')
			})
			console.log(pages)
			return pages
		}
		catch(e) {
			console.log('pg.pages exception: ', e)
			return undefined
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
			console.log(Object.values(switchObjectKeysCase(url, 'snakeCase')))
			return switchObjectKeysCase((await pg.raw('select url_id as id, url_name, owner as is_owner from app_public.create_users_urls(?, ?, ?);', Object.values(switchObjectKeysCase(url, 'snakeCase')))).rows[0], 'camelCase')
		}
		catch(e) {
			console.log('pg.createUrl exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined;
		}
	}

	async createPage(page, userId) {
		console.log('createPage >>>>>', page)
		try {
			const newPage = {...page, id: (await pg.raw('select * from app_public.create_pages(?, ?, ?, ?, ?);', Object.values({pageName: page.pageName, pageCode: page.pageCode, urlId: parseInt(page.urlId), subUrl: page.subUrl, user_id: userId}))).rows[0]['create_pages']}
			// console.log(newPage)
			return newPage
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