/**
 * 过滤器
 * 导入对应的 模块后 将 模块 添加到 filterList 中即可 
 */
import * as GlobalConfig from './config';
import * as samTest from './filter/Test';                     //加载模板页 

// 模块名称
export let moduleName: string = "samsundot.filter";
//服务集合
let filterList: samInterface.IFilter[] = [
    samTest
];

//用于检查是否有重复的 
let repeat: string[] = [];
let app = angular.module(moduleName, []);
//循环注入
for (let i in filterList) {
    let val: samInterface.IFilter = filterList[i];
    if (repeat.indexOf(val.FilterName) == -1) {
        //注入
        app.filter(val.FilterName, val.instance);
        repeat.push(val.FilterName);
    } else {
        console.error("注入filter出错 有重复的filter出现", val);
    }
}
// GlobalConfig.debug ? console.debug("filter 初始化完成", repeat) : undefined;

