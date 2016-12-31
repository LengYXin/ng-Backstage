import { Lyx_Helper } from '../../services/lyx_Helper';

/**
 * 菜单管理控制器
 */
export let controllersName: string = "MenuManage";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    //菜单列表 
    Menus: any[];
    MenuCheckAll: boolean = false;
    current_menu:any;
    //点击创建 时 保存父节点
    CreateParentNode: any;
    //创建子节点的属性
    CreateSubPoint: any = {};
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {
        this.loadData();
    }
    loadData() {
        this.Menus = [];
        this.Lyx_Helper.Lyx_HTTP.get("sys/MenuList").success((r: any) => {
            var all = {}, tree = [];
            for (var idx in r) {
                var menu = r[idx];
                menu._idx = idx;
                all[menu.MenuId] = menu;
            }

            for (var idx in r) {
                var menu = r[idx];
                var p = (menu.ParentId && all[menu.ParentId]) ? all[menu.ParentId].Menus : tree;
                menu._p = p;
                p.push(menu);
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
                    let MenuAuths = Menus[key].MenuAuths;
                    for (let key in MenuAuths) {
                        if (MenuAuths.hasOwnProperty(key)) {
                            MenuAuths[key].checkbox = this.MenuCheckAll;
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
    popupCreate(){
        this.current_menu = {};
        this.Lyx_Helper.ngDialog.open({ scope: this.$scope, template: 'templates/Sys/MenuManage/create.html', className: 'ngdialog-theme-default' });
    }
    create(){

    }
    popupUpdate(menu){
        this.current_menu = angular.copy(menu);
        this.Lyx_Helper.ngDialog.open({ scope: this.$scope, template: 'templates/Sys/MenuManage/update.html', className: 'ngdialog-theme-default' });
    }
    update() {
        
    }
    menu_up(menu){
        var idx = menu._p.indexOf(menu);
        if (idx > 0) {
            this.Lyx_Helper.Lyx_HTTP.post("sys/MenuSetUp",{id:menu.MenuId}).success((r: any) => {
                menu._p.splice(idx,1);
                menu._p.splice(idx-1,0,menu);
            });
        }
    }
    menu_down(menu){
        var idx = menu._p.indexOf(menu);
        if (idx<menu._p.length-1) {
            this.Lyx_Helper.Lyx_HTTP.post("sys/MenuSetDown",{id:menu.MenuId}).success((r: any) => {
                menu._p.splice(idx,1);
                menu._p.splice(idx+1,0,menu);
            });            
        }        
    }
    menu_enable(menu){
        if(menu.Enabled==1)return;
        this.Lyx_Helper.Lyx_HTTP.post("sys/MenuEnable",{id:menu.MenuId}).success((r: any) => {
            menu.Enabled=1;
        });
    }
    menu_disable(menu){
        if(menu.Enabled==0)return;
        this.Lyx_Helper.Lyx_HTTP.post("sys/MenuDisable",{id:menu.MenuId}).success((r: any) => {
            menu.Enabled=0;
        });        
    }
    menu_remove(menu){
        var idx = menu._p.indexOf(menu);
        if (idx > -1) {            
            menu._p.splice(idx,1);
        }        
    }
}

