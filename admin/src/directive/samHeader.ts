/**
 * <!-- start: Header -->
 * 标题栏
 */
export let directiveName: string = "samHeader";
export let instance = (): ng.IDirective => {
    return new directive();
};
export class directive implements ng.IDirective {
    constructor() {
    }
    restrict = 'AE';
    // transclude = true;
    replace = true;
    controller = [function () {

    }];
    templateUrl = 'templates/Directive/samHeader.html';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
        element.find("#main-menu-toggle").click(function () { $("body").hasClass("sidebar-hide") ? $("body").removeClass("sidebar-hide") : $("body").addClass("sidebar-hide") });
    }
}
