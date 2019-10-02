<template>
	<div class="navigation-bar">
		<nav class="navbar main navbar-expand">
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
	import { mapState } from 'vuex';
	import NavigationBarControls from '../components/NavigationBarControls';

	export default {
		components: {
			NavigationBarControls
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
	.navigation-bar .nav-item {
		 padding: 7px 20px;
	}
	.navigation-bar .navbar-brand {
		font-size: 30px;
	}

	.navigation-bar .navbar-brand:hover {
		color: #c69500;
		text-decoration: none;
	}
	
	.navigation-bar .main .nav-item:hover {
		color: white;
		background-color: #c69500;
		border: 1px solid #c69500;
		text-decoration: none;
		border-radius: 4px;
	}
</style>
