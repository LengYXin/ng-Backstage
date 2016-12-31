/**
 * 指令
 */
import { Lyx_Helper } from '../services/lyx_Helper';

/**
 * Test指令的控制器
 */
class TestController {
    static $inject = ['$scope', '$element', 'Lyx_Helper'];

    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private Lyx_Helper: Lyx_Helper
    ) {
        // console.log("TestController", this.$element);
        // console.log("TestController", this.$scope);
        // this.$scope.$watch("$parent.t", function (a, b) {
        //     console.log("a", a);
        //     console.log("b", b);
        // });
    }
}
/**
 * Test 指令
 */
export class Test implements ng.IDirective {
    constructor() {
    }
    restrict = 'AE';
    // templateUrl = 'templates/directive/Test.html';
    // replace = false; //放在template后面才会生效
    controllerAs = "vm";
    scope = false;
    //控制器  写法 2种方案 推荐使用 第一种
    // controller = TestController;
    controller = ['$scope', '$element', 'Lyx_Helper', function (
        $scope: ng.IScope,
        $element: ng.IRootElementService,
        Lyx_Helper: Lyx_Helper
    ) {
        console.log("TestController", $scope);
    }];
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
        // console.log("Test", scope);
    }
    static instance(): ng.IDirective {
        return new Test();
    }
}
