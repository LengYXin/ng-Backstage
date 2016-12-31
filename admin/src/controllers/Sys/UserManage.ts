import { Lyx_Helper } from '../../services/lyx_Helper';

/**
 * 用户管理控制器
 */
export let controllersName: string = "UserManage";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    //用户列表 
    data: any[];
    key: string;
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {
        this.loadData();
    }
    samTableConfig: samInterface.IsamTableConfig = new samTableConfig.Config(this.$scope, this.Lyx_Helper);        //搜索
    Search() {
        this.samTableConfig.Paging.PagingLoadData();
    }
    loadData() {
        this.data = [];
        this.Lyx_Helper.Lyx_HTTP.get("sys/UserList").success((r: any) => {            
            this.data = r;
        });
    }
}

/**
* userTableConfig 配置类
*/
namespace samTableConfig {
    export class Config implements samInterface.IsamTableConfig {
        constructor(
            //这里拿到的就是控制器的 $scope 对象 所有属性方法 方法绑定在了 vm 下面
            public $scope: ng.IScope,
            public Lyx_Helper: Lyx_Helper,
        ) {
          
        };
        Title = "用户列表";
        TableColumn = {
            thead: ["UserId", "姓名", "邮件","电话"],
            tbody: ["UserId", "CEmpName", "Email","Mobile"],
            style: [{ width: "20%" }, { width: "20%" }, { width: "30%" }, { width: "30%" }],//定义 列宽 样式 多余的 给操作列
        };
        url = 'Sys/UserList';
        params = { key: "", page_index: 1};
        //事件集合
        onEvent = [
            { Title: "删除", OnEvent: d => { this.onDelete(d); } },                        
        ];
        onDelete(data) {
            console.debug("删除", data);
        }        
    }
}
