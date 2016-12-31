// 定义接口 
import samInterface = Interface;

declare module 'samInterface' {
    export = Interface;
}

declare namespace Interface {
    /**
     *  // 控制器接口
     */
    interface IController {
        controllersName: string;
        controllers: any;
    }
    /**
     *  //指令
     */
    interface IDirective {
        directiveName: string;
        instance: any;
        directive: any;
    }
    /**
     * //过滤器
     */
    interface IFilter {
        FilterName: string;
        instance: any;
        Filter: any;
    }
    /**
     * 服务
     * 
     */
    interface IServices {
        servicesName: string;
        services: any;
    }
    /**
     * 分页
     */
    interface IPaging {
        //加载数据的配置 
        PagingConfig: { url: string, list: any, params: any, pageCount: number };
        //加载数据的方法
        PagingLoadData(index?: number, Callback?: Function): void;
    }

    /**
     * IsamTableConfig 配置接口
     */
    interface IsamTableConfig {
        /**
         * 标题
         */
        Title: string;
        /**
            * 表格参数
            */
        TableColumn: {
            thead: string[];//列标题头
            tbody: string[];//列值
            style?: any[];//列样式
        };
        /**
         * 地址
         */
        url: string;
        /**
         * 参数
         */
        params?: Object;
        /**
         * 返回 Table 执行 函数和参数
         */
        Paging?: IPaging;
        /**
         * 事件集合
         */
        onEvent?: { Title: string, OnEvent: Function }[];
    }

}