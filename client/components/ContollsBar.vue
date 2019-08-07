<template>
	<div class="left-bar col-2">
		<div v-if='menuType === "AddPages"'>
			<div class="submenu-title"><a href='#'>Pages</a></div>
			<div class="submenu-links">
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
			</div>
			<div class="submenu-add-button"><a href='#'>Add page</a></div>
		</div>
		<div v-else>
			<div class="submenu-title"><a href='#'>Add pages content</a></div>
			<div class="submenu-links">
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
				<div><a href='#'>test</a></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		menuType() {
			return this.$route.path.replace(/\//g,'')
		}
	}
}
</script>

<style>
	.left-bar {
		border-right: 1px solid gray;
	}
	.submenu-title {
	 	padding: 10px 0 10px 15px;
	}
	.submenu-links {
		padding: 0 0 0 25px
	}
</style>
