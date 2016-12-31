
/**
 * 控制器 模块
 * 导入对应的 模块后 将 模块 添加到 controllerList 中即可 
 * */
import * as GlobalConfig from './config';
import * as controller from './controllers/controller';

export let moduleName: string = "samsundot.controllers";
export let controllers = controller;

//用于检查是否有重复的 控制器
let repeat: string[] = [];
let app = angular.module(moduleName, []);
//循环注入控制器

for (let key in controller) {
  if (controller.hasOwnProperty(key)) {
    let contr = controller[key];
    for (let key in contr) {
      if (contr.hasOwnProperty(key)) {
        let val: samInterface.IController = contr[key];
        // console.log(val);
        if (repeat.indexOf(val.controllersName) == -1) {
          //注入控制器
          app.controller(val.controllersName, val.controllers);
          repeat.push(val.controllersName);
        } else {
          console.error("注入控制器出错 有重复的控制器出现", val);
        }
      }
    }
  }
}


