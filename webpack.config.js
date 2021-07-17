const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
	assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug/pages`
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter(fileName => fileName.endsWith('.pug'))

const plugins = [
	new CopyWebpackPlugin({
		patterns: [
			{ from: `${PATHS.src}/static`, to: '' }
		]
	}),
	...PAGES.map(
		page =>
			new HtmlWebpackPlugin({
				template: `${PAGES_DIR}/${page}`,
				filename: `./${page.replace(/\.pug/, '.html')}`,
				minify: {
					collapseWhitespace: isProd
				},
				inject: 'body'
			})
	),
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
	}),
	new CleanWebpackPlugin()
]

if (isProd) {
	plugins.push(
		new MiniCssExtractPlugin(
			{
				filename: `${PATHS.assets}css/${filename('css')}`,
			}
		),
		new ImageMinimizerPlugin({
			severityError: 'warning',
			minimizerOptions: {
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
					[
						'svgo',
						{
							plugins: [
								{
									removeViewBox: false,
								},
							],
						},
					],
				],
			},
		})
	)
}

module.exports = {
	mode: 'development',
	target: isDev ? 'web' : 'browserslist',
	devtool: isDev ? 'source-map' : false,
	devServer: {
		contentBase: PATHS.dist,
		port: 8081,
		open: 'Chrome',
		compress: true,
		overlay: {
			warnings: false,
			errors: true
		}
	},
	entry: {
		app: PATHS.src
	},
	output: {
		filename: `${PATHS.assets}js/${filename('js')}`,
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /.pug$/i,
				loader: 'pug-loader'
			},
			{
				test: /\.m?js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						]
					}
				}
			},
			{
				test: /\.(s[ac]ss|css)$/i,
				use: [
					{
						loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require("sass")
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}img/[name][ext]`
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}fonts/[name][ext]`
				}
			}
		]
	},
	resolve: {
		alias: {
			'~': PATHS.src, // Пример: background-image: url("~/assets/img/image.jpg");
			'@styles': `${PATHS.src}/pug/styles`,
			'@components': `${PATHS.src}/pug/components`,
			'@layouts': `${PATHS.src}/pug/layouts`,
			'@pages': `${PATHS.src}/pug/pages`,
			'@utils': `${PATHS.src}/pug/utils`,
		}
	},
	plugins
}