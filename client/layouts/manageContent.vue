<template>
  	<div class="container-fixed">
		<NavigationBar />
		<div class="content row">
			<ControllsBar />
			<nuxt />
		</div>
  	</div>
</template>

<script>
	import NavigationBar from '../components/NavigationBar'
	import ControllsBar from '../components/ContollsBar'
	export default {
		components: {
			NavigationBar,
			ControllsBar
		}
	}
</script>

<style>
	html {
		font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
			Roboto, 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
	}

	.row {
		padding: 0;
		margin: 0;
	}

	/* .left-bar {
		position: absolute;
		top: 60px;
		left: 0;
		bottom: 0;
		display: flex;
		padding: 20px 20px 0 20px;
		border-right: 1px solid gray;
	} */

</style>
