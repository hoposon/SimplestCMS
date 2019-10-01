<template>
	<nav class="navigation-bar-controls navbar navbar-expand">
		<div class="navbar-nav">
			<div class="nav-item no-hover">Currently edditing:</div>
			<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{{ currentUrl ? currentUrl.urlName : 'Select site' }}
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<a v-if='currentUrl' class="dropdown-item" href="">{{createUrl.urlName}}</a>
					<a class="dropdown-item static-action" :class='{"with-data": urls.length > 0}' href="" @click='createUrl()'>Add new site (url)</a>
					<a v-for='url in urls' :key='url.id' class="dropdown-item" href="" @click='selectUrl(url.id)'>{{ url.urlName }}</a>
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
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
		}
	},
	computed: {
		...mapState({
			currentUrl: state => state.urls.currentUrl,
			urls: state => state.urls.urls
		})
	},
	methods: {
		createUrl() {
			let options = {
				modalName: 'CreateUrlModal',
				show: true
			}
			this.showModal(options);
		},
		selectUrl(currentUrl) {
			this.setCurrentUrl({currentUrl})
			this.$router.push('/ManageContent')
		},
		...mapMutations({
			showModal: 'SET_MODAL',
			setCurrentUrl: 'urls/SET_CURRENT_URL'
		})
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

	.static-action {
		color: #c69500;
	}

	.static-action.with-data {
		border-bottom: 1px solid gray;
		padding-bottom: 10px;
		margin-bottom: 10px;
	}
</style>
