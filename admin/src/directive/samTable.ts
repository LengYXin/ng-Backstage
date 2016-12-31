import * as GlobalConfig from '../config';
import { Lyx_Helper } from '../services/lyx_Helper';
/**
 * Table
 * 表格
 */
export let directiveName: string = "samTable";
export let instance = ['$rootScope', ($rootScope): ng.IDirective => {
    return new directive($rootScope);
}];
export class directive implements ng.IDirective {
    static $inject = ['$rootScope'];
    constructor(
        private $rootScope: ng.IRootScopeService
    ) {
    }
    scope = {
        samTableConfig: "="
    };
    restrict = 'AE';
    transclude = {
        "samTableSearch":"?samTableSearch"
    };
    replace = true;
    controller = Controller;
    controllerAs = "vm";
    // link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
    //    console.log("samTable",scope);
    // }
    templateUrl = 'templates/Directive/samTable.html'
}
//实现 分页 指令  所需要的 属性和方法 
class Controller implements samInterface.IPaging {
    static $inject = ['$scope', '$element', 'Lyx_Helper'];
    constructor(
        private $scope: any,
        private $element: ng.IRootElementService,
        private Lyx_Helper: Lyx_Helper
    ) {
        this.samTableConfig = $scope.samTableConfig;
        //把 当前 指令下的 获取数据的 参数以及方法 放人 上层 $scope对象中 提供调用
        this.samTableConfig.Paging = {
            PagingConfig: this.PagingConfig,
            PagingLoadData: () => {
                this.PagingLoadData();
            }
        }
        //给 loadDataConfig 赋值 
        this.PagingConfig.url = this.samTableConfig.url;
        this.PagingConfig.params = this.samTableConfig.params;
        this.PagingLoadData();
    }
    PagingConfig = { url: "", list: null, params: null, pageCount: 1, LoadingHints: "加载中" };
    Show: boolean = true;
    TableShow: boolean = true;
    samTableConfig: samInterface.IsamTableConfig;
    PagingLoadData() {
        this.PagingConfig.LoadingHints = "加载中";
        // this.loadDataConfig.pageCount = 1;
        this.Lyx_Helper.Lyx_HTTP.getTest(this.PagingConfig.url, {
            params: this.PagingConfig.params
        }).success((r: any) => {
            this.PagingConfig.list = r;
            this.PagingConfig.pageCount = 20;
        }).error(e => {
            this.PagingConfig.LoadingHints = e;
        });
    }
    //关闭
    close() {
        this.Show = false;
    }
    //显示隐藏表格
    hideTable() {
        this.TableShow = !this.TableShow;
    }
}
