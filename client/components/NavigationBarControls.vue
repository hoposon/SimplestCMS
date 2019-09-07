<template>
	<nav class="navigation-bar-controls navbar navbar-expand">
		<div class="navbar-nav">
			<div class="nav-item no-hover">Currently edditing:</div>
			<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{{ currentUrl ? currentUrl.urlName : 'Select site' }}
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<a class="dropdown-item" href="#" @click='createUrl()'>Add new site (url)</a>
					<a class="dropdown-item" href="#" @click='selectPage()'>Another action</a>
					<a class="dropdown-item" href="#" @click='selectPage()'>Something else here</a>
				</div>
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
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState([
			'currentUrl'
		])
	},
	methods: {
		selectPage() {

		}
	}
}
</script>

<style>
	.navigation-bar .navigation-bar-controls.navbar {
		height: 70px;
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

	.navigation-bar .navigation-bar-controls .nav-item:hover {
		color: #c69500;
		text-decoration: none;
	}

	.navigation-bar .navigation-bar-controls .nav-item.no-hover {
		margin-right: 0px;
		margin-left: 0px;
		padding-right: 0px;
	}

	.navigation-bar .navigation-bar-controls .nav-item.no-hover:hover {
		color: white;
	}

	.navigation-bar .navigation-bar-controls .navbar-nav {
		align-items: center;
	}
</style>
