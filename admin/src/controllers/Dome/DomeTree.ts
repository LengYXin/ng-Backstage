import { Lyx_Helper } from '../../services/lyx_Helper';
import { Menus } from '../../Basics/MainMenus';

/**
 * 首页控制器
 */
export let controllersName: string = "DomeTree";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    //菜单列表 
    Menus: any;
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {
        this.Menus = Menus;
    }
    onclick(t) {
        console.log("TreeClick", t);
    }

}
