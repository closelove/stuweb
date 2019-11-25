const path = require("path");

// 获取根目录
function resolve(dir) {
    return path.join(__dirname, dir);
}

/**
 * 全局配置
 */
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    // 基本路径
    publicPath: "./",
    // 输出文件目录
    outputDir: "dist",
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: "static",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 如果机器有超过1个内核，则在默认情况下为生产构建中的babel&ts使用线程加载器
    parallel: require("os").cpus().length > 1,
    // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
    // pwa 插件相关配置 s
    pwa: {},
    // webpack配置
    chainWebpack: config => {
        // 别名配置 可进行 链式操作
        config.resolve.alias
            .set("@", resolve("src"))
            .set("views", resolve("src/views"));
    },

    //调整 webpack 配置
    configureWebpack: config => {
        // 入口文件
        config.entry = "./src/main.js";
        // 生产 & 测试环境
        let pluginsPro = [
            new CompressionPlugin({
                //文件开启Gzip，也可以通过服务端(如：nginx)
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
                threshold: 8192,
                minRatio: 0.8
            })
        ];
        // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
        if (process.env.NODE_ENV !== "development") {
            config.plugins = [...config.plugins, ...pluginsPro];
        }
    },
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: true, // 是否 自动打开浏览器 在项目启动的时候
        host: "",
        port: 8080, // 端口
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            "/dev": {
                target: process.env.VUE_APP_URL, // 代理请求的地址
                changeOrigin: true,
                pathRewrite: {
                    "^/dev": ""
                }
            },
            "/api": {
                target: process.env.VUE_APP_URL,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    // 第三方插件配置
    pluginOptions: {}
};
