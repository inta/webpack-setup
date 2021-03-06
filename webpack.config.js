const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.argv.indexOf('-p') > -1;

const extractCss = new ExtractTextPlugin({
	filename: '[name].css',
	allChunks: true
});
const extractHtml = new ExtractTextPlugin({
	filename: 'index.html'
});

const cfg = {
	context: path.resolve(__dirname, 'src'),
	resolve: {
		alias: {
			translation$: path.resolve(__dirname, 'src/js/translation.js'),
			css: path.resolve(__dirname, 'src/css'),
			img: path.resolve(__dirname, 'src/img')
		}
	},
	entry: {
		main: './js/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: path.resolve(__dirname, 'dist')
	},
	node: {
		global: !isProd,
		setImmediate: false
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {presets: ['es2015']}
				}]
			},
			{
				test: /\.css$/,
				use: extractCss.extract([
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							minimize: {safe: true}
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									require('postcss-import')(),
									require('postcss-cssnext')({
										features: {
											customProperties: {
												preserve: true,
												appendVariables: true
											}
										}
									})
								];
							}
						}
					}
				])
			},
			{
				test: /\.svg$/,
				use: [
					'svg-inline-loader',
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{removeTitle: true},
								{removeXMLNS: true},
								{removeDimensions: true}
							]
						}
					}
				]
			},
			{
				test: /\.(jpg|png)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}]
			},
			{
				test: /\.html$/,
				use: extractHtml.extract([{
					loader: 'html-loader',
					options: {
						// attrs: ['img:src', 'link:href'], // does not work?!
						minimize: true
					}
				}])
			}
		]
	},
	plugins: [
		/*new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons.js',
			minChunks: 2
		}),*/
		extractCss,
		extractHtml
	],
	devtool: 'source-map'
};

// HMR
/*if (!isProd) {
	cfg.entry.wds = 'webpack-dev-server/client?http://localhost:8080';
	cfg.entry.hot = 'webpack/hot/only-dev-server';
	cfg.output.publicPath = '/';
	cfg.plugins.push(new webpack.HotModuleReplacementPlugin());
	cfg.plugins.push(new webpack.NamedModulesPlugin());
	cfg.devServer.hot = true;
	cfg.devServer.publicPath = '/';
}*/

module.exports = cfg;
