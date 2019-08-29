<template>
	<nav class="navigation-bar-controls navbar navbar-expand">
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Select page
			</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<a class="dropdown-item" href="#" @click='selectPage()'>Action</a>
				<a class="dropdown-item" href="#" @click='selectPage()'>Another action</a>
				<a class="dropdown-item" href="#" @click='selectPage()'>Something else here</a>
			</div>
		</div>

		<!-- Right aligned nav items -->
		<div class="navbar-nav ml-auto d-flex justify-content-end">
			<nuxt-link to="/Assets" exact class="nav-item">Assets<span class="nav-item-sep"></span></nuxt-link>
			<nuxt-link to="/ManageContent" exact class="nav-item">Manage Content</nuxt-link>
			<nuxt-link to="/AddPages" class="nav-item">Add Pages</nuxt-link>
		</div>
	</nav>
</template>

<script>
export default {
	methods: {
		selectPage() {

		}
	}
}
</script>

<style>
	.navigation-bar .navigation-bar-controls.navbar {
		height: 60px;
		background-color: #00D9FF;
	}
	
	.navigation-bar .navigation-bar-controls .nav-item, 
	.navigation-bar .navigation-bar-controls .navbar-brand, 
	.navigation-bar .navigation-bar-controls .dropdown {
		font-size: 20px;
		margin-right: 15px;
		margin-left: 15px;
		color: white;
	}
</style>
