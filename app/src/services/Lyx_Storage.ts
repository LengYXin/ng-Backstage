
/**
 * 本地存储
 */
import * as GlobalConfig from '../config';

export let servicesName: string = "Lyx_Storage";
export {services as Lyx_Storage};
export class services {
    set(k: string, v: any) {
        if (v == null) {
            // throw new Error('_Storage Data cannot NUll');
            console.error("_Storage Data cannot NUll");
        }
        return window.localStorage.setItem(k, JSON.stringify(v));
    }
    get(k) {
        return JSON.parse(window.localStorage.getItem(k));
    }
    remove(k) {
        if (k)
            return window.localStorage.removeItem(k);
        else
            return window.localStorage.clear();
    }
}
