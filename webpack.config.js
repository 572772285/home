const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";
//导出配置
const getHTMLConfig=(name,title)=>({
  title: title,
  template:'./src/view/'+name+'.html',
  inject:true,
  hash:true,
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
    'list':'./src/pages/list/index.js',
    'detail':'./src/pages/detail/index.js',
    'cart':'./src/pages/cart/index.js',
    'order-confirm':'./src/pages/order-confirm/index.js',
    'user-login':'./src/pages/user-login/index.js',
    'user-register':'./src/pages/user-register/index.js',
    'result':'./src/pages/result/index.js',
    'user-center':'./src/pages/user-center/index.js',
    'user-update-password':'./src/pages/user-update-password/index.js'
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
      //配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            api:path.resolve(__dirname,'./src/api'),
            common:path.resolve(__dirname,'./src/common'),
            node_modules:path.resolve(__dirname,'./node_modules'),
            util:path.resolve(__dirname,'./src/util/'),
            user:path.resolve(__dirname,'./src/service/user/'),
            images:path.resolve(__dirname,'./src/images/'),
            service:path.resolve(__dirname,'./src/service/')
        }
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
            test: /\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/,
            use: [
              {
                loader: 'url-loader',
                options:{
                  limit:100,//图片大小限制，小于该值打包后为base64
                  name:'resource/[name].[ext]'
                }
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
          },
          {
            test:/\.tpl$/,
            use: {
                loader: 'html-loader',
            }               
          }
        ]
  },
  plugins: [
    new HtmlWebpackPlugin(getHTMLConfig('index','首页')),
    new HtmlWebpackPlugin(getHTMLConfig('list','列表页')),
    new HtmlWebpackPlugin(getHTMLConfig('detail','详情页')),
    new HtmlWebpackPlugin(getHTMLConfig('cart','购物车')),
    new HtmlWebpackPlugin(getHTMLConfig('order-confirm','结算页')),
    new HtmlWebpackPlugin(getHTMLConfig('user-login','用户登录')),
    new HtmlWebpackPlugin(getHTMLConfig('user-register','用户注册')),
    new HtmlWebpackPlugin(getHTMLConfig('result','结果提示')),
    new HtmlWebpackPlugin(getHTMLConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHTMLConfig('user-update-password','修改密码')),

  	new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename:'css/[name].css'
    })
  ],
  devServer: {
    contentBase: './dist',
    port:3002,
    historyApiFallback:true,
    //跨域代理
    proxy:{
      "/user":{
        target:"http://127.0.0.1:3001",
        changeOrigin:true
      },
      "/product":{
        target:"http://127.0.0.1:3001",
        changeOrigin:true
      },
      "/cart":{
        target:"http://127.0.0.1:3001",
        changeOrigin:true
      },
      "/order":{
        target:"http://127.0.0.1:3001",
        changeOrigin:true
      },
      "/shipping":{
        target:"http://127.0.0.1:3001",
        changeOrigin:true
      }
    }
  }
}