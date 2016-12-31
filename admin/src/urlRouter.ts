/**
 * 路由模块
 * 第一个路由为默认 404 导航模块
 */
import { controllers } from "./controllers";
export let states: { name?: string, config: ng.ui.IState }[];
states =
    [
      
        /**-------------------------Dome------------------------- **/
        {
            name: "DomeForme", config: {
                url: "/DomeForme", templateUrl: "templates/Dome/DomeForme.html",
                controller: controllers.Dome.DomeForme.controllersName, controllerAs: 'vm'
            }
        },
        {
            name: "DomeDialog", config: {
                url: "/DomeDialog", templateUrl: "templates/Dome/DomeDialog.html",
                controller: controllers.Dome.DomeDialog.controllersName, controllerAs: 'vm'
            }
        },
        {
            name: "DomeTable", config: {
                url: "/DomeTable", templateUrl: "templates/Dome/DomeTable.html",
                controller: controllers.Dome.DomeTable.controllersName, controllerAs: 'vm'
            }
        },
         {
            name: "DomeTree", config: {
                url: "/DomeTree", templateUrl: "templates/Dome/DomeTree.html",
                controller: controllers.Dome.DomeTree.controllersName, controllerAs: 'vm'
            }
        },
        /**-------------------------Sys------------------------- **/
        {
            name: "MenuManage", config: {
                url: "/MenuManage", templateUrl: "templates/Sys/MenuManage/Index.html",
                controller: controllers.Sys.MenuManage.controllersName, controllerAs: 'vm'
            }
        },
         {
            name: "AuthorityManage", config: {
                url: "/AuthorityManage", templateUrl: "templates/Sys/AuthorityManage/Index.html",
                controller: controllers.Sys.AuthorityManage.controllersName, controllerAs: 'vm'
            }
        },
         {
            name: "UserManage", config: {
                url: "/UserManage", templateUrl: "templates/Sys/UserManage/Index.html",
                controller: controllers.Sys.UserManage.controllersName, controllerAs: 'vm'
            }
        },        
    ];