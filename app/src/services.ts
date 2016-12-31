/**
 * 服务
 * 导入对应的 模块后 将 模块 添加到 servicesList 中即可 
 */
import * as Lyx_Helper from './services/Lyx_Helper';
import * as Lyx_HTTP from './services/Lyx_HTTP';
import * as Lyx_Storage from './services/Lyx_Storage';
import * as Lyx_Session from './services/Lyx_Session';
import * as Lyx_Native from './services/Lyx_Native';
import * as Lyx_HttpInterceptor from './services/Lyx_HttpInterceptor';
import * as Lyx_TemplateLoader from './services/Lyx_TemplateLoader';
import * as Lyx_CustomPage from './services/Lyx_CustomPage';
interface IServices {
    servicesName: string;
    services: any;
}
// 模块名称
export let moduleName: string = "samsundot.services";
//服务集合
let servicesList: IServices[] = [
    Lyx_Helper,
    Lyx_HTTP,
    Lyx_Storage,
    Lyx_Session,
    Lyx_Native,
    Lyx_HttpInterceptor,
    Lyx_TemplateLoader,
    Lyx_CustomPage
];
//用于检查是否有重复的 
let repeat: string[] = [];
let app = angular.module(moduleName, []);
//循环注入
for (let i in servicesList) {
    let val: IServices = servicesList[i];
    if (repeat.indexOf(val.servicesName) == -1) {
        //注入
        app.service(val.servicesName, val.services);
        repeat.push(val.servicesName);
    } else {
        console.error("注入服务出错 有重复的服务出现", val);
    }

}
// let app = angular.module(moduleName, [])
//     .service('Lyx_Helper', Lyx_Helper.services)//服务综合
//     .service('Lyx_Storage', Lyx_Storage.services)//本地存储
//     .service('Lyx_Session', Lyx_Session.services)//session存储
//     .service('Lyx_HTTP', Lyx_HTTP.services)//http
//     .service('Lyx_Native', Lyx_Native.services)//和原生交互
//     .service('Lyx_HttpInterceptor', Lyx_HttpInterceptor.services)//请求拦截
//     .service("Lyx_TemplateLoader", Lyx_TemplateLoader.services)//加载模板
//     .service("Lyx_CustomPage", Lyx_CustomPage.services)//自定义页面

//     ;