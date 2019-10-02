<template>
  	<div v-if='!token' class="container-fixed">
		<LoginRegisterBar />
    	<nuxt />
  	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import LoginRegisterBar from '../components/LoginRegisterBar'

	export default {
		components: {
			LoginRegisterBar
		},
		computed: {
			...mapState({
				token: state => state.user.user.token
			})
		},
		mounted() {
			if (this.token) {
				this.$router.push('/');
			}
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

	.row {
		padding: 0;
		margin: 0;
	}

</style>
