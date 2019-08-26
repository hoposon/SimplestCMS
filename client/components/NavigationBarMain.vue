<template>
	<div class="navigation-bar">
		<nav class="navbar navbar-expand">
			<nuxt-link class="navbar-brand" to="/">Simplest CMS</nuxt-link>

			<!-- Right aligned nav items -->
			<div class="navbar-nav ml-auto d-flex justify-content-end">
				<nuxt-link to="/Logout" class="nav-item">Logout</nuxt-link>
			</div>
		</nav>
		<NavigationBarControls />
	</div>
</template>

<script>
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
	.navbar {
		height: 110px;
	}
	.nav-item, .navbar-brand {
		font-size: 25px;
		margin-right: 15px;
		margin-left: 15px;
		color: white;
	}
	.navbar-brand {
		font-size: 22px;
	}
	
	.nav-item:hover, .navbar-brand:hover {
		color: #FF8119;
		text-decoration: none;
	}
</style>
