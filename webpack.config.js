const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";
//导出配置
const getHTMLConfig=(name)=>({
  title: 'KMALL-'+name,
  template:'./src/view/'+name+'.html',
  filename: name+'.html',
  chunks:['common',name]
})
module.exports = {
	//模式
    mode:'development',
	// mode:'production',
	//指定入口文件
	entry:{
    'common':'./src/common/index.js',
    'index':'./src/pages/index/index.js',
    'user-login':'./src/pages/user-login/index.js'
  },	
  //配置额外模块
  
	//指定出口
  output:{
		//出口文件名称
		filename:'js/[name].js',
    publicPath: publicPath,
		//出口文件存储路径
		path:path.resolve(__dirname,'dist')
	},
	//配置loader
    module: {
        rules: [
        	//处理css文档的loader
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                }
              },
              "css-loader"
            ]
          },
          //处理图片loader
    	    {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader'
              }
            ]
        	},
          {
            test:/\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env','es2015','stage-3'],            
                }
            }               
          }              
        ]
  },
  plugins: [
  	new HtmlWebpackPlugin(getHTMLConfig('index')),
    new HtmlWebpackPlugin(getHTMLConfig('user-login')),

  	new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename:'css/[name].css'
    })
  ],
  devServer: {
    contentBase: './dist',
    port:3002,
    historyApiFallback:true
  }
}