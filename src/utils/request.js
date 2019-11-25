import axios from 'axios';

//api的base_url
// let baseUrl=process.env.baseURL;
let baseUrl =
    process.env.VUE_APP_TITLE === "local" // 通过判断 当前的环境变量 得知 项目 运行在 本地 或者 线上
        ? process.env.VUE_APP_PROXY // 本地 使用代理 => '/dev' 此处在 vue.config.js 中代理请求处有配置
        : process.env.VUE_APP_URL; // 线上 使用域名
axios.defaults.baseURL = baseUrl; // 将 baseurl 设置为 axios 的默认 baseURL

//创建axios实例
const service=axios.create({
    vaseURL:baseUrl,
    timeout:5000
})

//使用request拦截器对axios请求配置做统一处理 添加请求拦截器
service.interceptors.request.use(
    config => {
         config.url;
        // let code = config.code;
        // config.headers = getHeader(url, code) // 让每个请求携带自定义签名
        return config
    },
    error => {
        Promise.reject(error)
    }
);

// response 拦截器 添加响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code ===200) {
            return response.data
        }else if(res.code ===407){
            return ''
        }else {
            return Promise.reject('error')
        }
    },
    error => {
        return Promise.reject(error)
    }
)
//暴漏出去
export default service
