const webpack = require('webpack')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
	  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
	//   { rel: "stylesheet", type: "text/css", href:'/css/bootstrap.min.css' }
	],
	script: [
		
		{
		  src: "/js/jquery.min.js",
		  type: "text/javascript"
		},
		{
			src: "/js/popper.min.js",
		  	type: "text/javascript"
		},
		{
			src: "/js/bootstrap.min.js",
			type: "text/javascript"
		},
		// {
		// 	src: '/js/popper.min.js',
		// 	type: "text/javascript"
		// }
		// {
		// 	src: "/js/bootstrap.bundle.min.js",
		// 	type: "text/javascript"
		// },
		
	]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
	'bootstrap/dist/css/bootstrap.css',
	'~assets/css/colors.css',
	'~assets/css/main.css',
	'~assets/css/nuxt.css'
	
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
	// 'bootstrap-vue/nuxt',
	// normal bootstrap
	// 'jquery',
	// 'bootstrap',
    // Doc: https://axios.nuxtjs.org/usage
	'@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {

	plugins: [
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'Popper': 'popper.js'
        }),
	 ]
		// transpile: ['bootstrap']
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
	// 	// if (ctx.isDev && ctx.isClient) {
	// 	// 	config.module.rules.push({
	// 	// 		test: /\.vue$/,
	// 	// 		loader: 'vue-loader'
	// 	// 	});
	// 	// 	config.module.rules.push({
	// 	// 		test: /\.styl(us)?$/,
	// 	// 		use: [
	// 	// 			'vue-style-loader',
	// 	// 			'css-loader',
	// 	// 			'stylus-loader'
	// 	// 		]
	// 	// 	});
	// 	// }
	// }

    // plugins: [
    //   // set shortcuts as global for bootstrap
    //   new webpack.ProvidePlugin({
    //     // $: 'jquery',
    //     // jQuery: 'jquery',
	// 	// 'window.jQuery': 'jquery',
	// 	$: require.resolve('jquery'),
	// 	jQuery: require.resolve('jquery')
	//   }),
	// //   new webpack.ProvidePlugin({
	// // 	bootstrap: 'bootstrap'
    // //   })
	// ],
	
	// analyze: true,

  }
}
