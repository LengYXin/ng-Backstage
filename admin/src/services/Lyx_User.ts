
import { Lyx_HTTP } from './Lyx_HTTP';
import { Menus } from '../Basics/MainMenus';
/**
 * UserContext
 */
import * as GlobalConfig from '../config';
export let servicesName: string = "Lyx_User";
export { services as Lyx_User };
export class services {
    static $inject = ['Lyx_HTTP'];
    constructor(
        private Lyx_HTTP: Lyx_HTTP,
    ) {

    }
    //菜单列表 使用 object 类型 数据被保存到内存中 将 菜单列表的 Menus 指向 Menus即可
    Menus: { list: any[] } = { list: [] };
    //用户上下文
    UserContext: {
        MenuList?: any[],
        Roles?: any,
        UserInfo?: {
            CEmpName: any,
            EEmpName: any,
            Email: any,
            Enabled: any,
            EnterpriseID: any,
            ITCode: any,
            Mobile: any,
            PWD: any,
            Roles: any,
            UserId: any,
            UserType: any,
        }
    } = {};
    //处理用户菜单 
    HandleUserMenuList(r) {
        var all = {}, tree = [];
        for (var idx in r) {
            var menu = r[idx];
            all[menu.MenuId] = menu;
        }

        for (var idx in r) {
            var menu = r[idx];
            var p = (menu.ParentId && all[menu.ParentId]) ? all[menu.ParentId].Menus : tree;
            p.push(menu);
        }
        this.Menus.list = tree;
        this.Menus.list = this.Menus.list.concat(Menus);
        //执行 移植的js代码
        setTimeout(function () {
            window["samAdminLoad"]();
        }, 500);
    }
    Login(uid: string, pwd: string) {
        console.debug("Login");
        this.Lyx_HTTP.post("sys/login", { uid: uid, pwd: pwd }).success(r => {
            window.location.href = "index.html";
        }).error(e => {

        });
    }
    //获取用户数据处理 逻辑
    GetUserContext() {
        console.debug("GetUserContext");
        this.Lyx_HTTP.get("sys/UserContext").success(r => {
            console.debug("获取用户信息", r);
            this.UserContext = r;
            this.HandleUserMenuList(this.UserContext.MenuList);
        }).error(e => {
            console.log(e);
            if (window.location.pathname != "/login.html")
                window.location.href = "/login.html";
        });
    }
    Logout() {
        console.debug("sys/logout");
        this.Lyx_HTTP.get("").success(r => {
            console.log(r);
        }).error(e => {
            console.log(e);
        });
    }
}