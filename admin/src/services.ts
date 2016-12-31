/**
 * 服务
 * 导入对应的 模块后 将 模块 添加到 servicesList 中即可 
 * Lyx 开头都为自定义服务
 */
import * as GlobalConfig from './config';
import * as Lyx_Helper from './services/Lyx_Helper';                                 //常用的服务都在这里
import * as Lyx_HTTP from './services/Lyx_HTTP';                                     //封装的$http
import * as Lyx_Storage from './services/Lyx_Storage';                               //本地存储
import * as Lyx_Session from './services/Lyx_Session';                               //session 存储
// import * as Lyx_Native from './services/Lyx_Native';                              // Native
import * as Lyx_HttpInterceptor from './services/Lyx_HttpInterceptor';               //请求拦截
import * as Lyx_TemplateLoader from './services/Lyx_TemplateLoader';                 //加载模板页
import * as Lyx_User from './services/Lyx_User';                                      //User

// import * as Lyx_CustomPage from './services/Lyx_CustomPage';                        
// 模块名称
export let moduleName: string = "samsundot.services";
//服务集合
let servicesList:samInterface.IServices[] = [
    Lyx_Helper,
    Lyx_HTTP,
    Lyx_Storage,
    Lyx_Session,
    // Lyx_Native,
    Lyx_HttpInterceptor,
    Lyx_TemplateLoader,
    Lyx_User,
    // Lyx_CustomPage
];


//用于检查是否有重复的 
let repeat: string[] = [];
let app = angular.module(moduleName, []);
//循环注入
for (let i in servicesList) {
    let val: samInterface.IServices = servicesList[i];
    if (repeat.indexOf(val.servicesName) == -1) {
        //注入
        app.service(val.servicesName, val.services);
        repeat.push(val.servicesName);
    } else {
        console.error("注入服务出错 有重复的服务出现", val);
    }

}
// GlobalConfig.debug ? console.debug("services 初始化完成", repeat) : undefined;

