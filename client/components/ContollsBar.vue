<template>
	<div class="left-bar col-2">
		<div v-if='menuType === "AddPages"'>
			<div class="submenu-title"><a href='#'>Pages</a></div>
			<div class="submenu-links">
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
			</div>
			<div class="submenu-add-button"><a href='#'>Add page</a></div>
		</div>
		<div v-else>
			<div class="submenu-title"><a href='#'>Add pages content<span class="arrow-down"></span></a></div>
			<div class="submenu-links">
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
				<a href='#'>test</a>
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
		border-right: 1px solid #FF7D13;
		/* background-color: #FF7D13; */
		padding-top: 20px;
		margin-top: 5px;
	}
	.submenu-title {
		display: flex;
	 	padding: 0px 0 10px 15px;
		font-size: 20px;
		border-bottom: 1px solid #FF7D13;
	}
	.submenu-title a {
		color: #00b4d3;
	}
	.submenu-title a:hover {
	 	text-decoration: none;
		color: #FF7D13;
	}

	/* .submenu-title a:hover .arrow-down::before {
		 color: red;
	} */

	.submenu-links a {
		display: flex;
		align-items: center;
		height: 45px;
		padding: 0 40px;
		color: black;
		border-bottom: 1px solid #f8f8f8;
	}

	.submenu-links a:hover {
		/* background-color: #000e6a;
		color: white; */
		text-decoration: none;
		font-size: 25px;
		color: #FF8119;
	}

	.arrow-down, .arrow-up {
		position: relative;
	}
	.arrow-down::after {
		position: absolute;
		top: 5px;
		right: -59px;
		width: 0px;
		height: 0px;
		border-top: 16px solid #FF7D13;
		border-right: 15px solid transparent;
		border-bottom: 16px solid transparent;
		border-left: 15px solid transparent;
		content: "";
		display: inline-block;
	}
	.arrow-up::after {
		position: absolute;
		top: 3px;
		right: -59px;
		width: 0px;
		height: 0px;
		border-top: 16px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 16px solid #FF7D13;
		border-left: 15px solid transparent;
		content: "";
		display: inline-block;
	}
	.arrow-down::before {
		position: absolute;
		top: 9px;
		right: -59px;
		width: 0px;
		height: 0px;
		border-top: 16px solid #00b4d3;
		border-right: 15px solid transparent;
		border-bottom: 16px solid transparent;
		border-left: 15px solid transparent;
		content: "";
		display: inline-block;
	}
	.arrow-up::before {
		position: absolute;
		top: 0px;
		right: -59px;
		width: 0px;
		height: 0px;
		border-top: 6px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 6px solid #00b4d3;
		border-left: 5px solid transparent;
		content: "";
		display: inline-block;
	}

</style>
