<template>
	<div class="navigation-bar">
		<nav class="navbar navbar-expand-lg">
			<nuxt-link exact class="navbar-brand" to="/">Simplest CMS</nuxt-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#loginRegisterBarContent" aria-controls="loginRegisterBarContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon">X</span>
			</button>

			<!-- Right aligned nav items -->
			<div class="collapse navbar-collapse" id="loginRegisterBarContent">
				<div class="navbar-nav ml-auto d-flex justify-content-end">
					<nuxt-link v-if='userToken' exact to="/logout" class="nav-item">Logout</nuxt-link>
					<nuxt-link v-if='!userToken' exact to="/login" class="nav-item">Login</nuxt-link>
					<nuxt-link v-if='!userToken' exact to="/register" class="nav-item">Register</nuxt-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		components: {
		},
		computed: {
			...mapState({
				userToken: state => state.user.userToken
			})
		},
		// methods: {
		// 	...mapActions([
		// 		'init'
		// 	])
		// }
	}
</script>

<style>
	.navigation-bar {
		height: 220px;
		background-color: #0099B3;
	}
	.navigation-bar .navbar {
		height: 110px;
	}
</style>
