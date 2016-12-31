/**
 * 加载数据
 * 分页
 * 单个
 */
import * as GlobalConfig from '../config';
import { Lyx_Helper } from '../services/Lyx_Helper';
import { Lyx_HTTP} from '../services/Lyx_HTTP';
import { Lyx_Storage } from '../services/Lyx_Storage';
import { Lyx_Session } from '../services/Lyx_Session';

let Storage = {
    Lyx_Storage: new Lyx_Storage(),
    Lyx_Session: new Lyx_Session()
};

/**   
 * 滚动加载数据
 */
/**
 * 配置详情类
 */
export class Lyx_LoadMore_Config {
    url: string;
    params?: any;
    handle?: boolean = true;
}
/**
 * 加载数据接口
 */
export interface ILyx_LoadMore {
    Config: Lyx_LoadMore_Config;
    Lyx_LoadMore();
    Lyx_LoadMore(index?: number);
}

/**
 * 加载分页数据
 */
export class Lyx_LoadMore implements ILyx_LoadMore {
    Config: Lyx_LoadMore_Config = {
        url: "",
        params: {},
        handle: true
    };
    /**数据列表 */
    dataList: any[] = [];
    /** 滚动加载 */
    infiniteScroll: boolean = false;
    constructor(
        public $scope: ng.IScope,
        public $rootScope: ng.IRootScopeService,
        public Lyx_Helper: Lyx_Helper,
    ) {
        this.Lyx_init();
        GlobalConfig.debug ? console.debug("Lyx_LoadMore", this) : undefined;
    }
    /**
     * 加载数据
     */
    Lyx_LoadMore(index?: number) {
        //检查参数
        this.Lyx_Testing();
        if (index == 1) {
            this.dataList = [];
            this.Config.params.page = 1;
        }
        //通知广播加载完成
        let scroll = () => {
            this.$rootScope.$broadcast('scroll.infiniteScrollComplete');
            this.$rootScope.$broadcast('scroll.refreshComplete');
        }
        //成功回调
        let success = (r: any) => {
            scroll();
            GlobalConfig.debug ? console.log('success', r) : undefined;
            if (r.success == false) {
                error(r.message);
                return r.message;
            }
            if (this.Config.params.page == 1) {
                Storage.Lyx_Storage.set(this.Config.url, r.result);
            }
            this.dataList = this.dataList.concat(r.result);
            let len = r.result && r.result.length || 0;
            if (len < this.Config.params.size || len == 0) {
                this.infiniteScroll = false;
            } else {
                setTimeout(()=>{
                    this.infiniteScroll = true;
                });
                this.Config.params.page++;
            }
            GlobalConfig.debug ? console.debug("dataList", this) : undefined;
        };
        //错误回调
        let error = (e: any) => {
            scroll();
            console.error("Lyx_LoadMore Error", e);
        };
        try {
            if (this.Config.url == null || this.Config.url.length == 0) {
                throw new Error("Config.url is null");
            }
            // 请求数据
            this.Lyx_Helper.Lyx_HTTP.get(this.Config.url, {
                params: this.Config.params
            }).success((r: any) => {
                success(r);
            }).error((e: any) => {
                error(e);
            });
            // this.chats = this.Helper.ChatsService.all();
        } catch (error) {
            console.error("Lyx_LoadMore", error);
        }
    }
    /**
     * 初始化加载数据
     */
    Lyx_init() {
        let enter = () => {
            this.Lyx_LoadMore();
        };
        this.$scope.$on("$ionicView.enter", () => {
            enter();
            enter = () => {
                console.warn("$ionicView.enter 非第一加载", this);
            };
        });
    }
    /**
     * 检查参数
     */
    Lyx_Testing() {
        if (this.Config.url.length === 0) {
            throw new Error("没有配置 Url 地址");
        }
        // console.log("检查参数",this);
        if (typeof this.Config.params.size !== "number") {
            this.Config.params.size = 20;
        }
        if (typeof this.Config.params.page !== "number") {
            this.Config.params.page = 1;
        }

    }
}
/**
 * 加载详情
 */
export class Lyx_LoadDetails {
    constructor() {

    }
}