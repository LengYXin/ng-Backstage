import { Lyx_Helper } from '../../services/lyx_Helper';
/**
 * 首页控制器
 */
export let controllersName: string = "DomeDialog";
export class controllers {
    //angular 注入   
    static $inject = ['$scope', 'Lyx_Helper'];
    constructor(
        public $scope: ng.IScope,
        public Lyx_Helper: Lyx_Helper,
    ) {

    }
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
