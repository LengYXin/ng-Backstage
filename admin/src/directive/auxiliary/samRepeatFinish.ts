/**
 * 监听ng-repeat渲染完成
 */
export let directiveName: string = "samRepeatFinish";
export let instance = (): ng.IDirective => {
    return new directive();
};
export class directive implements ng.IDirective {
    constructor() {
    }
    link(scope: any, element: ng.IRootElementService, attrs: any) {
        if (scope.$last == true) {
           scope.$eval(attrs.samRepeatFinish)
        }
    }
}
