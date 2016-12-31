
/**************************************
   ******      自定义弹窗
  ************************************/
import { Lyx_TemplateLoader } from './Lyx_TemplateLoader';
export let servicesName: string = "Lyx_CustomPage";
export {services as Lyx_CustomPage};
export class services {
    static $inject = ['$rootScope', '$compile', '$timeout', '$ionicBackdrop', 'Lyx_TemplateLoader'];
    container: HTMLDivElement;
    Node: Element;
    scope: ng.IScope;
    containerScope: any = {};
    constructor(
        private $rootScope: ng.IRootScopeService,
        private $compile: ng.ICompileService,
        private $timeout: ng.ITimeoutService,
        private $ionicBackdrop: ionic.backdrop.IonicBackdropService,
        private Lyx_TemplateLoader: Lyx_TemplateLoader
    ) {
        this.init();
    }
    //初始化
    init() {
        this.container = document.createElement('div');
        this.container.setAttribute("data-CustomPage", "");
        this.container.style.position = "absolute";
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.zIndex = "12";
        this.container.style.visibility = "hidden";
        document.body.appendChild(this.container);
    }
    /**
     * 显示 弹窗框
     * obj {
     *    url:页面地址,
     *    scope：$scope,
     *    Animate：默认true 开启关闭动画
     *    AmEntrances：默认rubberBand  进入动画
     *    AmExitx：默认 zoomOutUp  退出动画
     *    backdropclick:背景点击事件  默认为 关闭弹框
     *    filter:默认false  滤镜效果
     * }
     */
    show(obj: {
        url: string,
        scope?: ng.IScope,
    }
    ) {
        this.$ionicBackdrop.retain();
        this.container.style.visibility = "visible";
        if (!obj.url) { return console.error("url is null"); }
        //查看是否有对应的节点 
        var node = this.container.querySelector("[url='" + obj.url + "']");
        //没有作用域创建一个新的作用域
        obj.scope ? this.scope = obj.scope : this.scope = this.$rootScope.$new(true);
        //动画
        // obj.AmEntrances ? this.AmEntrances = obj.AmEntrances : this.AmEntrances = "rubberBand";
        // obj.AmExitx ? this.AmExitx = obj.AmExitx : this.AmExitx = "zoomOutUp";
        // obj.Animate == null ? void (0) : this.Animate = obj.Animate;
        // this.Animation(this.AmEntrances);
        //滤镜效果
        // obj.filter ? this.backFilter.show() : void (0);
        //创建弹框 逻辑  当 url 没改变  scope 改变后，删除 对应的节点 从新创建
        if (this.containerScope[obj.url] && this.containerScope[obj.url] == this.scope.$id) {
            node.setAttribute("data-Custombomb", "show");
            this.Node = node;
        } else {
            //scope  发生变化  删除 节点从新创建 
            node != null ? this.container.removeChild(node) : void (0);
            this.Lyx_TemplateLoader.load(obj.url).then(templateString => {
                let body = this.$compile(`<sam-template-loader url='${obj.url}' data-Custombomb='show'>${templateString}</sam-template-loader`)(this.scope)[0];
                // console.log(body);
                this.container.appendChild(body);
                this.$timeout(() => {
                    this.Node = this.container.querySelector(`[url='${obj.url}']`);
                    // console.log(this.Node);
                    // this.hide();
                }, 500);
            });
        }
        this.containerScope[obj.url] = this.scope.$id;
    }
    hide() {
        this.$ionicBackdrop.release();
        this.container.style.visibility = "hidden";
        this.Node == null ? void (0) : this.Node.setAttribute("data-Custombomb", "hide");
        // this.Animation(this.AmExitx, function () {

        // });
    }
    Animation() {
        // if (this.Animate) {
        //     //动画
        //     this.container.classList.add(am);
        //     this.container.classList.add("animated");
        //     this.container.addEventListener('webkitAnimationEnd', function webkitAnimationEnd() {
        //         _this.body.className = "";
        //         Callback && Callback();
        //         _this.body.removeEventListener("webkitAnimationEnd", webkitAnimationEnd, false);
        //     }, false);
        // } else {
        //     Callback && Callback();
        // }
    }
}
