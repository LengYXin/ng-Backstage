import * as GlobalConfig from '../config';
import { Lyx_Helper } from '../services/lyx_Helper';
import { Menus } from '../Basics/MainMenus';
import * as translate from '../Basics/translateConfig';

/**
 * 左侧主菜单
 */
export let directiveName: string = "samMainMenu";
export let instance = (): ng.IDirective => {
    return new directive();
};
export class directive implements ng.IDirective {
    constructor() {
    }
    restrict = 'AE';
    scope = true;
    // transclude = true;
    replace = true;
    // controller = ["Lyx_Helper", function (Lyx_Helper: Lyx_Helper) {
    //     //菜单列表 
    //     this.Menus = Menus;
    //     // Lyx_Helper.Lyx_HTTP.get('')
    //     // console.log("samMainMenu", this);
    // }];
    controller = Controller;
    controllerAs = "vm";
    templateUrl = 'templates/Directive/samMainMenu.html';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {

    }
}
class Controller {
    static $inject = ['$scope', '$element', '$translate', 'Lyx_Helper'];
    //菜单列表 
    Menus: any;
    //获取本地设置的语言 
    Language: string = this.Lyx_Helper.Lyx_Storage.get("Language") || translate.zh.key;
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private $translate: any,
        private Lyx_Helper: Lyx_Helper
    ) {
        this.Menus = this.Lyx_Helper.Lyx_User.Menus;
        // console.log(this.Menus);
        // console.log("samMainMenu",this.$scope);
        // sys/MenuList
        // this.Lyx_Helper.Lyx_HTTP.get("sys/MenuListByUser").success((r: any) => {
        //     var all = {}, tree = [];
        //     for(var idx in r){
        //         var menu = r[idx];
        //         all[menu.MenuId] = menu;
        //     }

        //     for(var idx in r){
        //         var menu = r[idx];
        //         var p = (menu.ParentId && all[menu.ParentId])? all[menu.ParentId].Menus : tree;
        //         p.push(menu);
        //     }
        //     this.Menus = tree;
        //     this.Menus = this.Menus.concat(Menus);
        //     //执行 移植的js代码
        //     setTimeout(function () {
        //         window["samAdminLoad"]();
        //     }, 500);
        // });
    }
    //切换语言
    switchLanguage() {
        if (this.Language === translate.zh.key) {
            this.Language = translate.en.key;
        } else {
            this.Language = translate.zh.key;
        }
        this.$translate.use(this.Language);
        this.Lyx_Helper.Lyx_Storage.set("Language", this.Language);
    }
}