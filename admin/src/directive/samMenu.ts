import * as GlobalConfig from '../config';
import { Lyx_Helper } from '../services/lyx_Helper';
import { Menus } from '../Basics/MainMenus';

/**
 * 菜单
 */
export let directiveName: string = "samMenu";
export let instance = ['$rootScope', ($rootScope): ng.IDirective => {
    return new directive($rootScope);
}];
export class directive implements ng.IDirective {
    static $inject = ['$rootScope'];
    constructor(
        private $rootScope: ng.IRootScopeService
    ) {
    }
    restrict = 'AE';
    replace = true;
    templateUrl = 'templates/Directive/samMenu.html';
    controller = Controller;
    controllerAs = "vm";
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {

    }
}
class Controller {
    static $inject = ['$scope', '$element', 'Lyx_Helper'];
    //菜单列表 
    Menus: any[];
    $ul: JQuery = null;
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private Lyx_Helper: Lyx_Helper
    ) {
       
    }
    openedShow($event) {
        if (this.$ul === null) {
            this.$ul = this.$element.children("ul");
        }
        if (this.$ul.length == 0) {
            return;
        }
        this.$element.hasClass("opened") ? this.$element.removeClass("opened") : this.$element.addClass("opened");
        this.$ul.first().stop().slideToggle("normal", function () { });
        // this.$element.parent().parent().hasClass("opened");
    }
}
