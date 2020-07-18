const prod = require('./webpack.prod');
const merge = require('webpack-merge');
const components = require('./components');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(prod, {
	entry: components,
	output: {
		path: path.join(__dirname, '/dist/lib'),
		library: '@dcma/react-components',
		filename: '[name].js',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader', // 将 CSS 转化成 CommonJS 模块
					'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		})
	]
});
