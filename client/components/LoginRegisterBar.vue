<template>
	<div class="navigation-bar">
		<nav class="navbar navbar-expand">
			<nuxt-link exact class="navbar-brand" to="/">Simplest CMS</nuxt-link>

			<!-- Right aligned nav items -->
			<div class="navbar-nav ml-auto d-flex justify-content-end">
				<nuxt-link v-if='userToken' exact to="/Logout" class="nav-item">Logout</nuxt-link>
				<nuxt-link v-if='!userToken' exact to="/Login" class="nav-item">Login</nuxt-link>
				<nuxt-link v-if='!userToken' exact to="/Register" class="nav-item">Register</nuxt-link>
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
			...mapState([
				'userToken'
			])
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
