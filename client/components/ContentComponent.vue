<template>
	<div>
		<TextContent v-if='content.code==="CONTENT_STRING"' :content="content" />
		<ImageContent v-else-if='content.code==="ASSET"' :content="content" />
		<GalleryContent v-else-if='content.code==="GALLERY"' :content="content" />
	</div>	
</template>

<script>
	import TextContent from './TextContent.vue';
	import ImageContent from './ImageContent.vue';
	import GalleryContent from './GalleryContent.vue';

	export default {
		components: {
			TextContent,
			ImageContent,
			GalleryContent
		},
		props: [
			'content'
		]
		
	}
</script>