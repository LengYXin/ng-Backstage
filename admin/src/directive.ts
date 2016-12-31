
/**
 * 指令
 *  导入对应的 模块后 将 模块 添加到 directiveList 中即可 
 */
import * as GlobalConfig from './config';
import * as samTemplateLoader from './directive/samTemplateLoader';                     //加载模板页 
import * as samHeader from './directive/samHeader';                                     //页面 Header
import * as samMainMenu from './directive/samMainMenu';                                 //左侧菜单
import * as samMenu from './directive/samMenu';                                         //菜单项 递归 加载
import * as samTable from './directive/samTable';                                       // table 配置即用
import * as samRepeatFinish from './directive/auxiliary/samRepeatFinish';               //监控 ng-repeat 执行完成
import * as samTreeNode from './directive/samTreeNode';                                 //tree树
import * as samPaging from './directive/samPaging';                                     //分页
import * as samDateTime from './directive/samDateTime';                                 //日历


// 模块名称
export let moduleName: string = "samsundot.directive";
//服务集合
let directiveList:samInterface.IDirective[] = [
    samTemplateLoader,
    samHeader,
    samMainMenu,
    samMenu,
    samTable,
    samRepeatFinish,
    samTreeNode,
    samPaging,
    samDateTime
];

//用于检查是否有重复的 
let repeat: string[] = [];
let app = angular.module(moduleName, []);
//循环注入
for (let i in directiveList) {
    let val: samInterface.IDirective = directiveList[i];
    if (repeat.indexOf(val.directiveName) == -1) {
        //注入
        app.directive(val.directiveName, val.instance);
        repeat.push(val.directiveName);
    } else {
        console.error("注入指令出错 有重复的指令出现", val);
    }

}
// GlobalConfig.debug ? console.debug("directive 初始化完成", repeat) : undefined;
