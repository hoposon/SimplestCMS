<template>
	<div class="navigation-bar">
		<nav class="navbar main d-flex align-items-center navbar-expand">
			<nuxt-link exact class="navbar-brand" to="/"><Logo /></nuxt-link>
			
			<!-- Right aligned nav items -->
			<div class="navbar-nav ml-auto d-flex align-items-center justify-content-end">
				<div class="nav-item no-hover">Currently edditing:</div>
				<div class="nav-item dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{ currentUrl ? currentUrl.urlName : 'Select site' }}
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<button class="dropdown-item static-action" :class='{"with-data": urls.length > 0}' @click='createUrl()'>Add new site (url)</button>
						<button v-for='url in urls' :key='url.id' class="dropdown-item ttttt" @click='selectUrl(url.id)'>{{ url.urlName }}</button>
					</div>
				</div>
				<nuxt-link to="/Assets" exact class="nav-item">Assets<span class="nav-item-sep"></span></nuxt-link>
				<nuxt-link to="/ManageContent" exact class="nav-item">Manage Content</nuxt-link>
				<nuxt-link exact to="/Logout" class="nav-item">Logout</nuxt-link>
			</div>
		</nav>
		<!-- <NavigationBarControls /> -->
	</div>
</template>

<script>
	
	// import NavigationBarControls from '../components/NavigationBarControls';
	import { mapState, mapMutations } from 'vuex';
	import Logo from '../components/assets/Logo'

	export default {
		components: {
			Logo
			// NavigationBarControls
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
	.navbar {
		padding-left: 30px;
		padding-right: 30px;
	}
	.navigation-bar .main {
		height: 70px;
		background-color: var(--bg-color-dark);
	}

	.navigation-bar .main .nav-item {
		/* font-size: 16px; */
		margin: 0 10px;
		color: var(--font-light-col);
	}

	.navigation-bar .main .nav-item.dropdown .btn {
		background-color: var(--acs-col);
		/* border: 2px solid; */
		border-color: var(--main-col);
		/* border-color: var(--bg-color-dark); */
	}
</style>
