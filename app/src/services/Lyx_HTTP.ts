
/**
 * HTTP服务
 */
import * as GlobalConfig from '../config';
export let servicesName: string = "Lyx_HTTP";
export {services as Lyx_HTTP};
export class services {
    static $inject = ['$http'];
    constructor(
        private $http: ng.IHttpService
    ) {
        // console.log("Lyx_HTTP", this);
    }
    // get 请求
    get<T>(url: string, config?: ng.IRequestShortcutConfig) {
        GlobalConfig.debug ? console.debug("Get请求", url + JSON.stringify(config && config.params && config.params)) : undefined;
        return this.$http.get<T>(url, config);
    }
    // post 请求
    post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig) {
        GlobalConfig.debug ? console.debug("Post请求", url + JSON.stringify(config.params)) : undefined;
        return this.$http.post<T>(url, data, config);
    }
}
/**
 * Http 请求返回 类型
 */
export interface Lyx_HTTPRequest {
    result: any;
    message: string;
    success: boolean;
}