import { Lyx_Helper } from '../../services/lyx_Helper';
/**
 * 首页控制器
 */
export let controllersName: string = "DomeTable";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {

    }
    //创建 Table配置 这个类会返回  Table 指令中 的 获取数据方法 
    //Test  错误的 测试 talbe
    samTableConfig: samInterface.IsamTableConfig = new samTableConfig.Config(this.$scope, this.Lyx_Helper);
    //完整的获取数据 这个类会返回  Table 指令中 的 获取数据方法 
    samTableConfig2: samInterface.IsamTableConfig = new samTableConfig.Config2(this.$scope, this.Lyx_Helper);
    //搜索
    Search() {
        this.samTableConfig2.Paging.PagingLoadData();
    }
}
/**
* samTableConfig 配置类
*/
namespace samTableConfig {
    export class Config implements samInterface.IsamTableConfig {
        constructor(
            public $scope: ng.IScope,
            public Lyx_Helper: Lyx_Helper,
        ) {
          
        }
        Title = "我是标题";
        TableColumn = {
            thead: ["ID", "CatId", "Pic", "标题", "用户"],
            tbody: ["aid", "catid", "pic", "title", "username"]
        };
        url = 'Demo/Error';
        params = { a: "getPortalList", catid: 20, page: 1 };
        //事件集合
        onEvent = [
            // { Title: { zh: "删除", en: "Delete" }, OnEvent: null },
            // { Title: { zh: "详情", en: "Details" }, OnEvent: null }
            { Title: "删除", OnEvent: d=>{ this.onDelete(d);} },
            { Title: "详情", OnEvent: d=>{ this.onDetails(d);} },
        ];
        onDelete(data) {
            console.debug("删除", data);
        }
        onDetails(data) {
            this.$scope['TableDetails'] = data;
            let $scope = this.$scope;
            this.Lyx_Helper.ngDialog.open({
                template: 'templates/Dome/test.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }
    }
    export class Config2 implements samInterface.IsamTableConfig {
        constructor(
            public $scope: ng.IScope,
            public Lyx_Helper: Lyx_Helper,
        ) {
            //添加删除事件
            this.onEvent[0].OnEvent = (data) => {
                this.onDelete(data);
            };
            //添加详情事件
            this.onEvent[1].OnEvent = (data) => {
                this.onDetails(data);
            }
        }
        //标题
        Title = "Enterprise/List";
        //列参数
        TableColumn = {
            thead: ["EnterpriseID", "EnterpriseName", "EnterpriseKey", "CreateBy", "CreateOn", "Enabled"],
            tbody: ["EnterpriseID", "EnterpriseName", "EnterpriseKey", "CreateBy", "CreateOn", "Enabled"]
        };
        //api地址
        url = 'Enterprise/List';
        //查询条件
        params = { key: "", page_index: 1 };
        //事件集合
        onEvent = [
            // { Title: { zh: "删除", en: "Delete" }, OnEvent: null },
            // { Title: { zh: "详情", en: "Details" }, OnEvent: null }
            { Title: "删除", OnEvent: null },
            { Title: "详情", OnEvent: null },
        ];
        onDelete(data) {
            console.debug("删除", data);
        }
        onDetails(data) {
            this.$scope['TableDetails'] = data;
            let $scope = this.$scope;
            this.Lyx_Helper.ngDialog.open({
                template: 'templates/Dome/test.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }
    }
}
