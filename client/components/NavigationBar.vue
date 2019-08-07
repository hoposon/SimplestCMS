<template>
	<div class="navigation-bar">
		<b-navbar type="dark" variant="dark" class="h-100">
			<!-- <nuxt-link class="col-6 navbar-brand" to="/">Simplest CMS</nuxt-link> -->
			<nuxt-link class="navbar-brand" to="/">Simplest CMS</nuxt-link>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto d-flex justify-content-end">
				<!-- <nuxt-link to="/AddContent" exact class="offset-6 col-2 text-right">Add Content</nuxt-link>
				<nuxt-link to="/AddPages" class="col-2 text-right">Add Pages</nuxt-link>
				<nuxt-link to="/Logout" class="col-2 text-right">Logout</nuxt-link> -->
				<nuxt-link to="/AddContent" exact class="nav-item">Add Content</nuxt-link>
				<nuxt-link to="/AddPages" class="nav-item">Add Pages</nuxt-link>
				<nuxt-link to="/Logout" class="nav-item">Logout</nuxt-link>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {

}
</script>

<style>
	.navigation-bar {
		height: 60px;
	}
	.nav-item, .navbar-brand {
		margin-right: 15px;
		margin-left: 15px;
	}
</style>
