
/**
 * Tree 树
 */
export let directiveName: string = "samTreeNode";
export let instance = (): ng.IDirective => {
    return new directive();
};
export class directive implements ng.IDirective {
    constructor() {
    }
    scope=false;
    restrict = 'AE';
    replace = true;
    // controller = Controller;
    // controllerAs = "vm";
    templateUrl = function (element,attr) {
        return attr.templateurl;
    };
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
    };
}
class Controller {
    constructor() {

    }
}
