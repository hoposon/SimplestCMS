<template>
	<div class="fixed-top navigation-bar">
		<nav class="navbar main d-flex align-items-center navbar-expand">
			<nuxt-link exact class="navbar-brand" to="/"><Logo /></nuxt-link>
			<!-- <nuxt-link exact class="navbar-brand" to="/">Logo</nuxt-link> -->
			
			<!-- Right aligned nav items -->
			<div class="navbar-nav ml-auto d-flex align-items-center justify-content-end">
				<div class="nav-item no-hover">Currently edditing:</div>
				<div class="nav-item dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{ currentUrl ? currentUrl.urlName : 'Select site' }}
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<button class="dropdown-item static-action" :class='{"with-data": urls.length > 0}' @click='createUrl()'>Add new site (url)</button>
						<button v-for='url in urls' :key='url.id' class="dropdown-item" @click='selectUrl(url.id)'>{{ url.urlName }}</button>
					</div>
				</div>
				<nuxt-link to="/Assets" exact class="nav-item">Assets<span class="nav-item-sep"></span></nuxt-link>
				<nuxt-link to="/ManageContent" exact class="nav-item">Manage Content<span class="nav-item-sep"></span></nuxt-link>
				<nuxt-link exact to="/Logout" class="nav-item">Logout</nuxt-link>
			</div>
		</nav>
	</div>
</template>

<script>
	
	import { mapState, mapMutations } from 'vuex';
	import Logo from '../components/assets/Logo'

	export default {
		components: {
			Logo
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
					show: true,
					params: {
						transl: 'Create URL',
						translResSuccess: 'Url added successfuly'
					}
				}
				this.showModal(options);
			},
			selectUrl(currentUrl) {
				this.setCurrentUrl({currentUrl})
				if (this.$route.path === '/') {
					this.$router.push('/ManageContent')
				}				
			},
			...mapMutations({
				showModal: 'SET_MODAL',
				setCurrentUrl: 'urls/SET_CURRENT_URL'
			})
		}
	}
</script>

<style>
	.navbar {
		padding-left: 30px;
		padding-right: 30px;
	}
	.navigation-bar .main {
		margin-top: 2px;
		height: 70px;
		background-color: var(--acc-dark-col);
		box-shadow: 0px 0px 5px 0px var(--shade-for-dark-col)
	}

	.navigation-bar .main .navbar-brand {
		margin-left: -7px;
	}

	.navigation-bar .main .nav-item {
		/* font-size: 16px; */
		margin: 0 0 0 8px;
		color: var(--font-light-col);
	}

	.navigation-bar .main .nav-item .nav-item-sep {
		margin-left: 8px;
		border-left: 1px solid var(--font-light-col);
	}

	.navigation-bar .main .nav-item.dropdown {
		margin-right: 30px;
	}

	.navigation-bar .main .nav-item.dropdown .static-action {
		color: var(--main-col);
	}

	.navigation-bar .main .nav-item.dropdown .btn {
		background-color: var(--acc-light-col);
		border: none;
    	box-shadow: 0px 0px 3px 0px var(--shade-for-dark-col);
	}

	.navbar-expand .navbar-nav .dropdown-menu {
		max-height: calc(100vh - 100px);
    	overflow-y: auto;
	}

	.navbar-expand .navbar-nav .dropdown-menu::-webkit-scrollbar { 
		width: 4px !important 
	}

	.navbar-expand .navbar-nav .dropdown-menu::-webkit-scrollbar-thumb {
		background: var(--acc-light-col);
	}

	.navbar-expand .navbar-nav .dropdown-menu::-webkit-scrollbar-track {
		background: var(--shades-light-col)
	}

</style>
