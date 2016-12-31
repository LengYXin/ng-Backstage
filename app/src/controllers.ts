/**
 * 控制器 模块
 * 导入对应的 模块后 将 模块 添加到 controllerList 中即可 
 * */
import { Home } from './controllers/Home';
import { Activity } from './controllers/Activity';
import { Donation } from './controllers/Donation';
import { IController } from './controllers/Icontroller';
import { Friend } from './controllers/Friend';
import { User } from './controllers/User';
import { Group } from './controllers/Group';
import { News } from './controllers/News';

export let controllers = {
  moduleName: "samsundot.controllers",
  Home: Home,
  Activity: Activity,
  Donation: Donation,
  Friend: Friend,
  User: User,
  Group: Group,
  News: News,
};
//控制器集合
let controllerList = [
  Home,
  Activity,
  Donation,
  Friend,
  User,
  Group,
  News
];
//用于检查是否有重复的 控制器
let repeat: string[] = [];
let app = angular.module(controllers.moduleName, []);
//循环注入控制器
for (let i in controllerList) {
  let cons = controllerList[i];
  for (let key in cons) {
    if (cons.hasOwnProperty(key)) {
      let val: IController = cons[key];
      if (repeat.indexOf(val.controllersName) == -1) {
        //注入控制器
        app.controller(val.controllersName, val.controllers);
        repeat.push(val.controllersName);
      } else {
        console.error("注入控制器出错 有重复的控制器出现", val.controllersName);
      }
    }
  }
}

// 模块名称
// angular.module(controllers.moduleName, [])
//   .controller(Home.Index.controllersName, Home.Index.controllers)//首页
//   .controller(Activity.Index.controllersName, Activity.Index.controllers)//活动
//   .controller(Donation.Index.controllersName, Donation.Index.controllers)//捐赠
//   ;