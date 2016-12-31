import { Lyx_Helper } from '../../services/lyx_Helper';
/**
 * 首页控制器
 */
export let controllersName: string = "DomeForme";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    dateTime: string = "";
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {

    }
    console() {
        console.log(this.dateTime);
    }
}
