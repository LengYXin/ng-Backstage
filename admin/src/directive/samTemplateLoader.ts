/**
 * 自定义模板加载器指令
 */
export let directiveName:string="samTemplateLoader";
export let instance=(): ng.IDirective=>{
 return new directive();
};
export class directive implements ng.IDirective {
    constructor() {
    }
    restrict = 'E';
    transclude = true;
    replace = true;
    controller = [function () { }];
    template = '<div class="samTemplateLoader" ng-transclude></div>';
}
