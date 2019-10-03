// List.vue
<template>
	<div>
		<button v-if='root' class='link-btn' @click='showHide()'>
			<span ref="arrow" class="arrow-right small align-self-center mr-2"></span>
			{{ subUrl }}
		</button>
		<transition name='fade'>
			<div v-if='show'>
				<button v-for='page in pages' :key='page.id' :class='linksClass' class="link-btn">{{ page.pageName }}</button>
			</div>
		</transition>
	</div> 
	
</template>

<script>
	export default {
		name: 'List',
		props: [
			'subUrl',
			'pages'
		],
		data() {
			return {
				show: false
			}
		},
		computed: {
			root() {
				return this.subUrl !== '/'
			},
			linksClass() {
				return {'with-sub-url': this.root}
			}
		},
		methods: {
			showHide() {
				this.show = !this.show;
				this.$refs.arrow.classList.toggle('arrow-right')
				this.$refs.arrow.classList.toggle('arrow-down')
			}
		}
	}
</script>

<style>
	.with-sub-url {
		margin-left: 25px;
	}
	
	.fade-enter {
		opacity: 0;
		height: 0;
		overflow: hidden;
	}
	.fade-enter-active {
		transition: height 0.5s, opacity 0.7s;
	}
	.fade-enter-to {
		opacity: 1;
		height: 30px;
	}
	.fade-leave {
		opacity: 1;
		height: 30px;
	}
	.fade-leave-active {
		transition: height 0.5s, opacity 0.7s;
	}
	.fade-leave-to {
		opacity: 0;
		height: 0;
		overflow: hidden;
	}

	.small {
		border-width: 5px;
	}
</style>