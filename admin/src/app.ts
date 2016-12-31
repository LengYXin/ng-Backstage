/**
 * app.ts                    启动入口  文件
 * config.ts                 全局配置文件（变量）
 * controllers.ts            控制器处理文件（无需更改 控制器配置看  #1）
 * css.ts                    样式模块 样式处理优先级 为导入顺序 
 * directive.ts              指令文件 自定义指令创建完成后需要引入模块到该文件中
 * filter.ts                 过滤器文件  配置 和指令一致
 * services.ts               服务文件    配置 和指令一致
 * urlRouter.ts              路由配置文件  
 * 
 *  #1{
 *       创建完控制器后 在 controllers文件夹中有 controller.ts 文件，该文件是用来配置控制器的文件
 *       将写好的控制器引入到该文件中  具体  查看源码 
 *   }
 * 
 * @冷勇星
 * Email： lengyx@samsundot.com
 * 
 */

import 'jquery';
import 'bootstrap';

import 'angular';
import 'angular-animate';
import 'angular-ui-router';
import 'ng-dialog';                // https://github.com/likeastore/ngDialog#api
import 'angular-toastr';           // https://github.com/Foxandxss/angular-toastr
import 'angular-loading-bar';      // https://chieffancypants.github.io/angular-loading-bar/#
import 'angular-translate';        // 全球化语言切换   http://www.ng-newsletter.com/posts/angular-translate.html  https://github.com/angular-translate/angular-translate    

import './Basics/core.min.js';     //移植的js代码  绑定到了 window.samAdminLoad下面了 在获取完 菜单后执行 samMainMenu.ts 50行
//自定义css模块
import './css';
import * as GlobalConfig from './config';                        //全局配置
import * as controllers from "./controllers";                    //控制器
import * as services from "./services";                          //服务
import * as directive from "./directive";                        //指令
import * as filter from "./filter";                              //过滤器
import * as translate from './Basics/translateConfig';           //全球化翻译
import { Lyx_Helper } from './services/lyx_Helper';              //常用服务
import { states } from "./urlRouter";                            //路由

let starter = angular.module('starter',
    [
        'ui.router',
        'ngAnimate',
        'chieffancypants.loadingBar',
        'toastr',
        'ngDialog',
        'pascalprecht.translate',
        controllers.moduleName,
        services.moduleName,
        directive.moduleName,
        filter.moduleName,
    ]);
starter.run(["$translate", "Lyx_Helper", function ($translate, Lyx_Helper: Lyx_Helper) {
    //加载本地语言配置
    $translate.use(Lyx_Helper.Lyx_Storage.get("Language"));
    Lyx_Helper.Lyx_User.GetUserContext();
}]);
starter.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    'toastrConfig',
    'cfpLoadingBarProvider',
    '$translateProvider',
    function (
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $httpProvider: ng.IHttpProvider,
        toastrConfig,
        cfpLoadingBarProvider,
        $translateProvider
    ) {
        //添加语言配置
        $translateProvider
            .translations(translate.zh.key, translate.zh.value)
            .translations(translate.en.key, translate.en.value);
        //默认选择中文
        $translateProvider.preferredLanguage(translate.zh.key);
        $translateProvider.useSanitizeValueStrategy(null);
        // 提示 框
        angular.extend(toastrConfig, {
            allowHtml: true,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: true,
            tapToDismiss: true,
            // templates: {
            //     toast: 'directives/toast/toast.html',
            //     progressbar: 'directives/progressbar/progressbar.html'
            // },
            timeOut: 1000,
            titleClass: 'toast-title',
            toastClass: 'toast',
            positionClass: 'toast-top-full-width'
        });
        $httpProvider.interceptors.push('Lyx_HttpInterceptor');
        //登录页面 不需要路由
        if (window.location.pathname === "/login.html") {

        } else {
            $urlRouterProvider.otherwise(states[0].config.url.toString());
            for (var key in states) {
                $stateProvider.state(states[key].name, states[key].config);
            }
        }

    }]);
//启动 
angular.bootstrap(document, ['starter']);

// window.addEventListener('load', (e) => {
//     setTimeout(function () {
//         let script: HTMLScriptElement = document.createElement('script');
//         script.src = "assets/js/core.min.js";
//         document.body.appendChild(script);
//     }, 1000);
// })
