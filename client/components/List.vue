// List.vue
<template>
	<div>
		<div class='list-item' @click='showHide()'>
			<span ref="arrow" class="arrow-right small align-self-center mr-2"></span>
			<span class="align-self-center">{{ subUrl }}</span>
		</div>
		<transition-group 
			name='fade'
			tag='div'
			v-bind:css="false"
			v-on:before-enter="beforeEnter"
    		v-on:enter="enter"
    		v-on:leave="leave"
		>
			<div v-for='page in pagesList' :key='page.id' class="list-item with-sub-url" @click='setCurrentPage({id: page.id})'>
				<span class="align-self-center">{{ page.pageName }}</span>
			</div>
		</transition-group>
	</div> 
	
</template>

<script>
	import { mapMutations } from 'vuex';

	export default {
		name: 'List',
		props: [
			'subUrl',
			'pages'
		],
		data() {
			return {
				show: false,
				pagesList: []
			}
		},
		methods: {
			showHide() {
				// this.show = !this.show;
				if (this.show) {
					this.pagesList = [];
					this.show = false
				} else {
					this.pagesList = this.pages;
					this.show = true
				}
				this.$refs.arrow.classList.toggle('arrow-right')
				this.$refs.arrow.classList.toggle('arrow-down')
			},
			beforeEnter(el) {
				el.style.opacity = 0;
				el.style.height = 0;
				el.style.overflow = 'hidden';
			},
			enter(el, done) {
				el.classList.add('list-transition');
				setTimeout(() => {
					el.style.opacity = 1;
					el.style.height = '35px'	
				}, 1)
			},
			leave(el, done) {
				el.style.opacity = 0;
				el.style.height = '0px'	
				setTimeout(() => {
					el.classList.remove('list-transition');
				}, 500)
			},
			...mapMutations({
				setCurrentPage: 'pages/SET_CURRENT_PAGE'
			})
		}
	}
</script>

<style>
	.with-sub-url {
		padding-left: 25px;
	}
	.small {
		border-width: 5px;
	}
	.list-item {
		display: flex;
		height: 35px;
		background-color: unset;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.list-item:hover {
		background-color: var(--list-item-hover);
	}

	.list-transition {
		transition: height 0.5s, opacity 0.5s;
	}
</style>