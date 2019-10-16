<template>
	<TextContent v-if='content.contentTypeCode==="CONTENT_STRINGS"' :content="content" />
	<ImageContent v-else-if='content.contentTypeCode==="ASSET"' :content="content" />
	<GalleryContent v-else :content="content" />	
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