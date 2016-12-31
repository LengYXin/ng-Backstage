
/**
 * Session 存储
 */
import * as GlobalConfig from '../config';
export let servicesName: string = "Lyx_Session";
export {services as Lyx_Session};
export class services {
    set(k: string, v: any) {
        if (v == null) {
            // throw new Error('_Storage Data cannot NUll');
            console.error("_Session Data cannot NUll");
        }
        return window.sessionStorage.setItem(k, JSON.stringify(v));
    }
    get(k) {
        return JSON.parse(window.sessionStorage.getItem(k));
    }
    remove(k) {
        if (k)
            return window.sessionStorage.removeItem(k);
        else
            return window.sessionStorage.clear();
    }
}