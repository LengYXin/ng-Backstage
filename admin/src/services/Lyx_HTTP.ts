
/**
 * HTTP服务
 */
import * as GlobalConfig from '../config';
export let servicesName: string = "Lyx_HTTP";
export { services as Lyx_HTTP };
export class services {
    static $inject = ['$http', 'toastr', 'cfpLoadingBar'];
    constructor(
        private $http: ng.IHttpService,
        private toastr: any,
        private cfpLoadingBar: any,//进度条
    ) {
        // console.log("Lyx_HTTP", this);
    }
    // get 请求
    get<T>(url: string, config?: ng.IRequestShortcutConfig) {
        this.cfpLoadingBar.start();
        GlobalConfig.debug ? console.debug("Get请求", url + JSON.stringify(config && config.params && config.params)) : undefined;
        let urlStr: string;
        if (url.indexOf("http://") === -1) {
            urlStr = GlobalConfig.apiMainUrl + url;
        } else {
            urlStr = url;
        }

        return new HttpSuccess(this.$http.get<T>(urlStr, config), this.toastr, this.cfpLoadingBar);
    }
    // post 请求
    post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig) {
        this.cfpLoadingBar.start();
        GlobalConfig.debug ? console.debug("Post请求", url + JSON.stringify(config.params)) : undefined;
        let urlStr: string;
        if (url.indexOf("http://") === -1) {
            urlStr = GlobalConfig.apiMainUrl + url;
        } else {
            urlStr = url;
        }
        return new HttpSuccess(this.$http.post<T>(urlStr, data, config), this.toastr, this.cfpLoadingBar);
    }
    //测试 使用
    getTest<T>(url: string, config?: ng.IRequestShortcutConfig) {
        this.cfpLoadingBar.start();
        GlobalConfig.debug ? console.debug("Get请求", url + JSON.stringify(config && config.params && config.params)) : undefined;
        let urlStr: string;
        if (url.indexOf("http://") === -1) {
            urlStr = GlobalConfig.apiMainUrl + url;
        } else {
            urlStr = url;
        }
        return new HttpSuccess(this.$http.get<T>(urlStr, config), this.toastr, this.cfpLoadingBar);
    }
}
/**
 * HTTP请求 处理类
 * ng  接口  interface IHttpPromiseCallback<T> {
 *      (data: T, status: number, headers: IHttpHeadersGetter, config: IRequestConfig): void;
 *   }
 *  
 */
class HttpSuccess<T> {
    constructor(
        private http: ng.IHttpPromise<T>,
        private toastr: any,//弹框组件
        private cfpLoadingBar: any,//进度条
    ) {

    }
    //错误回调
    errorCallback: Function = function (r) {

    }
    //处理成功请求 对状态吗 统一管理
    success(callback) {
        // console.debug("object",typeof callback);
        this.http.success((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
            this.cfpLoadingBar.complete();
            switch (status) {
                case 200:
                    //状态吗为 200的情况下 为成功
                    if (data.code === 200) {
                        callback(data.data);
                    } else {
                        this.errorCallback(data.data);
                        this.toastr.error(`${data.data}`, 'API Error', { timeOut: 3000 });
                        console.error("API Error", data);
                    }
                    break;
                default:
                    this.toastr.error(`
                    <br/>
                    <p>装填吗=${status}</p>
                    <p>请求地址=${config.url}</p>
                    <p>参数=${JSON.stringify(config.params)}</p>
                    `, '访问出错！！！', { timeOut: 3000 });
                    console.error("访问出错", status);
                    break;
            }

        });
        return this;
    }
    error(callback) {
        this.errorCallback = callback;
        this.http.error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
            this.toastr.error(`
                    <br/>
                    <p>装填吗=${status}</p>
                    <p>请求地址=${config.url}</p>
                    <p>参数=${JSON.stringify(config.params)}</p>
                    `, '访问出错！！！', { timeOut: 3000 });
            this.cfpLoadingBar.complete();
            callback(data);
        });
        return this;
    }
}
/**
 * Http 请求返回 类型
 */
interface HTTPRequest {
    code: number;
    data: any;
}