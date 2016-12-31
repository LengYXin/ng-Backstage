
/**
 * 测试过滤器
 */
export let FilterName: string = "samTest";
export let instance = ["$filter", ($filter) => {
    return new Filter($filter).carry;
}];
export class Filter {
    static $inject = ['$filter'];
    constructor(
        private $filter: ng.IFilterFilter
    ) {
        // console.log(this.$filter);
    }
    carry(input, obj) {
        console.debug("执行了 过滤器", input);
        console.debug("执行了 过滤器参数", obj);
        return input + input;
    }
}
