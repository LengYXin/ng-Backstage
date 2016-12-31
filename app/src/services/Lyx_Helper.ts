
/**************************************
   ******       Lyx_Helper  所以 自定义服务 综合类
  ************************************/
import * as GlobalConfig from '../config';
import { Lyx_HTTP } from './Lyx_HTTP';
import { Lyx_Storage} from './Lyx_Storage';
import { Lyx_Session } from './Lyx_Session';
import { Lyx_Native } from './Lyx_Native';
import { Lyx_CustomPage } from './Lyx_CustomPage';

export let servicesName: string = "Lyx_Helper";
export {services as Lyx_Helper};
export class services {
    static $inject = ['$rootScope', '$stateParams', 'Lyx_Storage', 'Lyx_Session', 'Lyx_HTTP', 'Lyx_Native', 'Lyx_CustomPage'];
    constructor(
        public $rootScope: ng.IRootScopeService,
        public $stateParams: ng.ui.IStateParamsService,
        public Lyx_Storage: Lyx_Storage,
        public Lyx_Session: Lyx_Session,
        public Lyx_HTTP: Lyx_HTTP,
        public Lyx_Native: Lyx_Native,
        public Lyx_CustomPage: Lyx_CustomPage,
    ) {
        GlobalConfig.debug ? console.debug("Lyx_Helper", this) : undefined;
    }
}