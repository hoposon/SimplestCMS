export const contentTypes = [
	{type: 'Text content', code: 'CONTENT_STRING'},
	{type: 'Image', code: 'ASSET'},
	{type: 'Set of images', code: 'GALLERY'}
]

export class ContentString {
	constructor(id) {
		this.id = id;
		this.description = 'Text content';
		this.code = 'CONTENT_STRING';
		this.data = {
			csName: '',
			csCode: '',
			csValue: ''
		}
		this.changed = false;
	}
}

export class Asset {
	constructor(id) {
		this.id = id;
		this.description = 'Image';
		this.code = 'ASSET';
		this.data = {
			assetName: '',
			assetCode: '',
			id: ''
		}
		this.changed = false;
	}
}

export class Gallery {
	constructor(id) {
		this.id = id;
		this.description = 'Set of images';
		this.code = 'GALLERY';
		this.data = {
			galleryName: '',
			galleryCode: '',
			assets: []
		}
		this.changed = false;
	}
}