import * as LoadMore from '../../Basics/lyx_LoadMore';
import { Lyx_Helper } from '../../services/lyx_Helper';
import { Lyx_TemplateLoader } from '../../services/Lyx_TemplateLoader';

/**
 * 首页控制器
 */
export let controllersName: string = "Home_Index";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {
        this.Lyx_Helper.Lyx_HTTP.get("/demo/get").success(function (r) {
            console.log(r);
        });
    }
    //创建 Table配置
    clickToOpen(type: number) {
        switch (type) {
            case 1:
                this.Lyx_Helper.ngDialog.open({ template: 'templates/Home/test.html', className: 'ngdialog-theme-default' });
                break;
            case 2:
                this.Lyx_Helper.toastr.success('Hello world!', 'Toastr fun!');
                break;
            case 3:
                this.Lyx_Helper.toastr.info('Hello world!', 'Toastr fun!');
                break;
            case 4:
                this.Lyx_Helper.toastr.warning('Hello world!', 'Toastr fun!');
                break;
            case 5:
                this.Lyx_Helper.toastr.error('Hello world!', 'Toastr fun!');
                break;
            default:
                break;
        }
    }
}
