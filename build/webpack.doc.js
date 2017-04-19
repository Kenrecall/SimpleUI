var path = require('path'); //根路径
var webpack = require('webpack'); //webpack模块
var HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack html 打包模块

var node_modules = path.resolve(__dirname, '../node_modules'); //node包模块
var basepath = __dirname + '/../doc/src/'; //源码路径

var config = {
    entry:{
        "index" : [basepath+'app.js'], //入口文件
        "common":['vue', 'vue-router'],  //vue全家桶公共引入
        "polyfill": ['babel-polyfill'], //补全es6原生对象
    },
    output: {
        path: path.join(__dirname,'../doc/dist/'), //构建目录
        //filename: '[name].[chunkhash:8].js' //文件名规则 [name]表示 和 入口一致
        filename: '[name].js'
    },
    module: {
        //  preLoaders: [
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: 'eslint-loader'
        //     },
        // ],
        loaders: [
            {  //对大于6000字节 的图片采取base64处理
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=6000'
            },{
                test: /\.css$/,  //css 加载器
                loader: 'style-loader!css-loader'
            },{
                test: /\.js$/, //js 加载器
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'] //转换 es6编码为 es5
                }
            }, {
                test: /\.vue$/,  //vue 模板加载器
                loader: 'vue-loader'
            },
            { test: /\.less$/, loaders: [ 'style', 'css', 'less' ] }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            'util' : __dirname+ '/../src/utils/util.js',
            'vue' : path.resolve(node_modules, 'vue/dist/vue.common.js')
        }
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            util:__dirname + '/../src/utils/util.js',
         }),
        //  new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        //     debug: false,
        //     options: {
        //         context: __dirname
        //     }
        // }),
        //将公共代码抽离出来合并为一个文件
        new webpack.optimize.CommonsChunkPlugin({name:['common'],minChunks:Infinity}),

        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            //favicon:'src/favicon.ico', //favicon路径
            filename:'index.html',    //生成的html存放路径，相对于 path
            template:basepath + 'index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            //hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        })
    ]
};

module.exports = config;

