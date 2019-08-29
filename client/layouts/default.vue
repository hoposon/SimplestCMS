<template>
  	<div>
		<NavigationBarMain />
    	<nuxt />
  	</div>
</template>

<script>
	import NavigationBarMain from '../components/NavigationBarMain'
	export default {
		components: {
			NavigationBarMain
		}
	}
</script>

<style>

	html {
		font-family: Roboto, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
		}

	.content {
		background-color: #ebebeb;
	}
</style>