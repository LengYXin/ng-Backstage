import * as LoadMore from '../../Basics/lyx_LoadMore';
import { Lyx_Helper } from '../../services/lyx_Helper';
import { Lyx_TemplateLoader } from '../../services/Lyx_TemplateLoader';

/**
 * 首页控制器
 */
export let controllersName: string = "Home_Index";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', '$ionicPopover', 'Lyx_Helper'];
    Whole: Whole = new Whole(this.$scope, this.Lyx_Helper);
    Activity: Activity = new Activity(this.$scope, this.Lyx_Helper);
    Donation: Donation = new Donation(this.$scope, this.Lyx_Helper);
    constructor(
        public $scope: ng.IScope,
        public $ionicPopover: ionic.popover.IonicPopoverService,
        public Lyx_Helper: Lyx_Helper,
    ) {
        console.log("哈haha啊a ");
        console.log(this);
        this.init(this.Whole);
        //打开 自定义页面
        //  this.Lyx_Helper.Lyx_CustomPage.show({url:'templates/common/popover_test.html'});
    }
    //初始化 $scope.vm 指针 启动  点击切换时调用
    init(vm: LoadMore.Lyx_LoadMore) {
        this.$scope['vm'] = vm;
        this.$scope['vm']['switch'] = x => {
            this.switch(x);
        };
        console.log(this.$scope);
    }
    //切换  vm  指针
    switch(type: string) {
        switch (type) {
            case 'Whole':
                this.init(this.Whole);
                break;
            case 'Activity':
                this.init(this.Activity);
                break;
            case 'Donation':
                this.init(this.Donation);
                break;
            default:
                this.init(this.Whole);
                break;
        }
    }
    // loadMore() {
    //     this.$scope.$broadcast('scroll.infiniteScrollComplete');
    //     this.$scope.$broadcast('scroll.refreshComplete');
    // }
}
/**
 * Whole  全部
 */
class Whole extends LoadMore.Lyx_LoadMore {
    TYPE: string = "Whole"
    //加载数据配置项
    Config: LoadMore.Lyx_LoadMore_Config = {
        url: "http://www.phonegap100.com/appapi.php",
        params: { a: "getPortalList", catid: 20, page: 1 },
    };
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {
        super($scope, Lyx_Helper.$rootScope, Lyx_Helper);//执行父类构造函数
        console.debug("New Whole", this);
    }
}
/**
 * Activity  活动
 */
class Activity extends LoadMore.Lyx_LoadMore {
    TYPE: string = "Activity"
    //加载数据配置项
    Config: LoadMore.Lyx_LoadMore_Config = {
        url: "http://www.phonegap100.com/appapi.php",
        params: { a: "getPortalList", catid: 20, page: 2 },
    };
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {
        super($scope, Lyx_Helper.$rootScope, Lyx_Helper);//执行父类构造函数
        console.debug("New Activity", this);

    }
}
/**
 * Donation  捐赠
 */
class Donation extends LoadMore.Lyx_LoadMore {
    TYPE: string = "Donation"
    //加载数据配置项
    Config: LoadMore.Lyx_LoadMore_Config = {
        url: "http://www.phonegap100.com/appapi.php",
        params: { a: "getPortalList", catid: 20, page: 3 },
    };
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {
        super($scope, Lyx_Helper.$rootScope, Lyx_Helper);//执行父类构造函数
        console.debug("New Donation", this);

    }
}