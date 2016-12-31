
/**
 * Tree 树
 */
export let directiveName: string = "samDateTime";
export let instance = (): ng.IDirective => {
    return new directive();
};
export class directive implements ng.IDirective {
    constructor() {
    }
    restrict = 'AE';
    require = "ngModel";
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: any, ctrl: any) {
        $('#datetimepicker9')["datetimepicker"]({
            onGenerate: function (ct) {
                $(this).find('.xdsoft_date.xdsoft_weekend')
                    .addClass('xdsoft_disabled');
            },
            weekends: ['01.01.2014', '02.01.2014', '03.01.2014', '04.01.2014', '05.01.2014', '06.01.2014'],
            timepicker: false
        });
        console.log(ctrl);
        // var unregister = scope.$watch(function () {

        //     // $(element).append("<input  style='border:none;width:100%;height:100%' " +
        //     //     "value='" + ctrl.$modelValue + "'>");
        //     $(element).append(`<input type="text"  class="form-control input-sm" placeholder="选择日期" value='${ctrl.$modelValue}'>`);

        //     element.on('change', function () {
        //         scope.$apply(function () {
        //             ctrl.$setViewValue($("#date-" + attrs.dateid).val());
        //         });
        //     });

        //     element.on('click', function () {
        //         element.find("input")["datetimepicker"]({
        //             format: attrs.format || 'Y/m/d h:i',
        //             onClose: function () {
        //                 element.change();
        //             }
        //         });
        //     });
        //     element.click();
        //     return ctrl.$modelValue;
        // }, initialize);
        // function initialize(value) {
        //     ctrl.$setViewValue(value);
        //     unregister();
        // }
    };
}
class Controller {
    constructor() {

    }
}
