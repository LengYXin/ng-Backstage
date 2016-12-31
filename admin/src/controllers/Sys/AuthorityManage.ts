import { Lyx_Helper } from '../../services/lyx_Helper';

/**
 * 权限管理控制器
 */
export let controllersName: string = "AuthorityManage";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    //菜单列表 
    Menus: any[];
    MenuCheckAll: boolean = false;
    constructor(
        public $scope: any,
        public Lyx_Helper: Lyx_Helper,
    ) {
        // this.loadData();
    }
    samTableConfig: samInterface.IsamTableConfig = new samTableConfig.Config(this.$scope, this.Lyx_Helper);
    loadData(role) {
        this.Menus = [];
        this.Lyx_Helper.Lyx_HTTP.get("sys/RoleMenuList?id=" + role.RoleId).success((r: any) => {
            var all = {}, tree = [];
            for (var idx in r.Menus) {
                var menu = r.Menus[idx];
                all[menu.MenuId] = menu;
            }

            for (var idx in r.Menus) {
                var menu = r.Menus[idx];
                var p = (menu.ParentId && all[menu.ParentId]) ? all[menu.ParentId].Menus : tree;
                p.push(menu);
            }

            for (var menuId in r.Auths) {
                var menu = all[menuId];
                if (menu == null) continue;
                menu.Selected = true;

                var keys = r.Auths[menuId];
                var auths = menu.Auths;

                for (var i in keys) {
                    var key = keys[i];

                    for (var j in auths) {
                        var auth = auths[j];
                        if (key == auth.Key) auth.Selected = true;
                    }
                }
            }
            this.Menus = tree;

        });
    }
    //递归全选 
    checkAll() {
        this.MenuCheckAll = !this.MenuCheckAll;
        let checkAll = (Menus) => {
            for (let key in Menus) {
                if (Menus.hasOwnProperty(key)) {
                    Menus[key].Selected = this.MenuCheckAll;
                    let MenuAuths = Menus[key].MenuAuths;
                    for (let key in MenuAuths) {
                        if (MenuAuths.hasOwnProperty(key)) {
                            MenuAuths[key].Selected = this.MenuCheckAll;
                        }
                    }
                    if (Menus[key].Menus && Menus[key].Menus.length > 0) {
                        checkAll(Menus[key].Menus);
                    } {
                    }
                }
            }
        }
        checkAll(this.Menus);

        // this.$scope.$broadcast("sam-Menu-CheckAll", this.MenuCheckAll);
    }
    save() {
        console.debug("保存", this.Menus);
    }
}

/**
* roleTableConfig 配置类
*/
namespace samTableConfig {
    export class Config implements samInterface.IsamTableConfig {
        constructor(
            //这里拿到的就是控制器的 $scope 对象 所有属性方法 方法绑定在了 vm 下面
            public $scope: { vm: controllers },
            public Lyx_Helper: Lyx_Helper,
        ) {

        };
        Title = "角色列表";
        TableColumn = {
            thead: ["RoleId", "菜单编码", "菜单名称"],
            tbody: ["RoleId", "RoleCode", "RoleName"],
            style: [{ width: "20%" }, { width: "30%" }, { width: "30%" }],//定义 列宽 样式 多余的 给操作列
        };
        url = 'Sys/RoleList';
        params = {};
        //事件集合
        onEvent = [
            { Title: "删除", OnEvent: d => { this.onDelete(d); } },
            { Title: "详情", OnEvent: d => { this.onDetails(d); } },
            { Title: "菜单权限", OnEvent: d => { this.$scope.vm.loadData(d); } },
        ];
        onDelete(data) {
            console.debug("删除", data);
        }
        onDetails(data) {
            this.$scope['TableDetails'] = data;
            let $scope = this.$scope;
            this.Lyx_Helper.ngDialog.open({
                template: 'templates/Dome/test.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }
    }
}
