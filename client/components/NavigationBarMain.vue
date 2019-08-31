<template>
	<div class="navigation-bar">
		<nav class="navbar navbar-expand">
			<nuxt-link exact class="navbar-brand" to="/">Simplest CMS</nuxt-link>

			<!-- Right aligned nav items -->
			<div class="navbar-nav ml-auto d-flex justify-content-end">
				<nuxt-link exact to="/Logout" class="nav-item">Logout</nuxt-link>
			</div>
		</nav>
		<NavigationBarControls />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import NavigationBarControls from '../components/NavigationBarControls';

	export default {
		components: {
			NavigationBarControls
		},
		computed: {
			...mapState([
				'userToken'
			])
		},
		methods: {
			...mapActions([
				'init'
			])
		},
		mounted() {
			if(!this.userToken) {
				// window.location.href('http://localhost:3000/login');
				this.$router.push('/login');
			} else {
				this.init();
			}
			this.init();
		}
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
	.navigation-bar .nav-item, 
	.navigation-bar .navbar-brand {
		font-size: 20px;
		margin-right: 15px;
		margin-left: 15px;
		color: white;
	}
	.navigation-bar .navbar-brand {
		font-size: 30px;
	}

	.navigation-bar .nav-item {
		 padding: 10px 20px;
	}
	
	.navigation-bar .nav-item:hover, 
	.navigation-bar .navbar-brand:hover {
		color: #FF8119;
		text-decoration: underline;
	}
</style>
