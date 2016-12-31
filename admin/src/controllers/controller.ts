
//控制器接口，用来检测 所写的控制器是否符合规则 
/**
 *----------------------------------------------------- Dome 部分控制器-----------------------------------------------------
 */
import * as DomeTable from './Dome/DomeTable';
import * as DomeDialog from './Dome/DomeDialog';
import * as DomeTree from './Dome/DomeTree';
import * as DomeForme from './Dome/DomeForme';

export let Dome:
  {
    //定义的 类型 检测控制器是否合法 也可以使用简单的写法 但是 不适合开发
    DomeTable: samInterface.IController,
    DomeDialog: samInterface.IController,
    DomeTree: samInterface.IController,
    DomeForme: samInterface.IController,
  } =
  {
    DomeTable: DomeTable,
    DomeDialog: DomeDialog,
    DomeTree: DomeTree,
    DomeForme: DomeForme
  };
// 简单的写法
// export let Dome =
//   {
//     Index: Dome_Index
//   };
/**
 * -----------------------------------------------------Login 部分控制器-----------------------------------------------------
 */
import * as Login_Index from './Login/Index';
export let Login:
  {
    Login: samInterface.IController
  } =
  {
    Login: Login_Index
  };
/**
 * -----------------------------------------------------Home 部分控制器-----------------------------------------------------
 */
import * as Home_Index from './Home/Index';
export let Home:
  {
    Index: samInterface.IController
  } =
  {
    Index: Home_Index
  };
/**
 * -----------------------------------------------------活动 部分控制器-----------------------------------------------------
 */
import * as Activity_Index from './Activity/Index';
export let Activity:
  {
    Index: samInterface.IController

  } =
  {
    Index: Activity_Index,
  };

/**
 * -----------------------------------------------------捐赠 部分控制器-----------------------------------------------------
 */
import * as Donation_Index from './Donation/Index';
export let Donation:
  {
    Index: samInterface.IController
  } =
  {
    Index: Donation_Index,
  };

/**
 * -----------------------------------------------------Sys 部分控制器-----------------------------------------------------
 */
import * as MenuManage from './Sys/MenuManage';
import * as AuthorityManage from './Sys/AuthorityManage';
import * as UserManage from './Sys/UserManage';
export let Sys:
  {
    MenuManage: samInterface.IController,
    AuthorityManage: samInterface.IController,
    UserManage: samInterface.IController
  } =
  {
    MenuManage: MenuManage,
    AuthorityManage: AuthorityManage,
    UserManage: UserManage
  };
