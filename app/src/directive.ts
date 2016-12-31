
/**
 * 指令
 *  导入对应的 模块后 将 模块 添加到 directiveList 中即可 
 */
import * as samTemplateLoader from './directive/samTemplateLoader';

interface IDirective {
    directiveName: string;
    instance(): ng.IDirective;
    directive: any;
}
// 模块名称
export let moduleName: string = "samsundot.directive";

//服务集合
let directiveList: IDirective[] = [
    samTemplateLoader,
];
//用于检查是否有重复的 
let repeat: string[] = [];
let app = angular.module(moduleName, []);
//循环注入
for (let i in directiveList) {
    let val: IDirective = directiveList[i];
    if (repeat.indexOf(val.directiveName) == -1) {
        //注入
        app.directive(val.directiveName, val.instance);
        repeat.push(val.directiveName);
    } else {
        console.error("注入指令出错 有重复的指令出现", val);
    }

}
// angular.module(moduleName, [])
//     // .directive('directiveTest', Test.instance)
//     .directive('samTemplateLoader', samTemplateLoader.instance)
//     ;