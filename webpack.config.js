const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack')
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve('./dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        

    ],
    stats: {
        modules: false, //简化终端输出
        colors: true, // 打包时使用不同的颜色区分信息
        entrypoints: false, // 打包时不显示入口模块信息
        children: false, // 打包时不显示子模块信息
    },
    resolve: { // 控制模块解析过程
        modules: ["node_modules"], // 默认模块查找路径
        extensions: [".js", ".json", '.ts'], // 设置补全后缀名
        alias: { // 配置路径别名
            "@": path.resolve(__dirname, "src"),
            "_": __dirname
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/, //正则表达式，匹配模块的路径
                use: ['ts-loader'] //匹配到了之后，使用哪些加载器
            }, //规则1
        ], 
    },
    devServer: {
        port: 8000,
        // open: true,
        // proxy: { //代理规则
        //     "/api": { //有此规则的会在前面加上下面的内容
        //         target: "http://open.duyiedu.com",
        //         changeOrigin: true //更改请求头中的host和origin
        //     }
        // }
    },
    externals:{
         jquery:'$'
    }

}