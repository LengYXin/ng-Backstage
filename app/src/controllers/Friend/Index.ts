import * as LoadMore from '../../Basics/lyx_LoadMore';
import { Lyx_Helper } from '../../services/lyx_Helper';
import { Lyx_TemplateLoader } from '../../services/Lyx_TemplateLoader';

/**
 * 朋友详情控制器
 */
export let controllersName: string = "Friend_Index";
export class controllers extends LoadMore.Lyx_LoadMore {
    //angular 注入   
    static $inject = ['$scope', '$ionicPopover', 'Lyx_Helper'];
    //加载数据配置项
    Config: LoadMore.Lyx_LoadMore_Config = {
        url: "http://www.phonegap100.com/appapi.php",
        params: { a: "getPortalList", catid: 20, page: 1 },
    };
    Popover: ionic.popover.IonicPopoverController;
    constructor(
        public $scope: ng.IScope,
        public $ionicPopover: ionic.popover.IonicPopoverService,
        public Lyx_Helper: Lyx_Helper,
    ) {
        super($scope, Lyx_Helper.$rootScope, Lyx_Helper);//执行父类构造函数
        $ionicPopover.fromTemplateUrl("templates/common/popover_test.html", {
            scope: $scope
        }).then(x => {
            this.Popover = x;
        });
        console.log("首页控制器");
        //打开 自定义页面
        //  this.Lyx_Helper.Lyx_CustomPage.show({url:'templates/common/popover_test.html'});
    }
}