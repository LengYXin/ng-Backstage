import { Lyx_Helper } from '../../services/lyx_Helper';
/**
 * 首页控制器
 */
export let controllersName: string = "Login";
export class controllers {
    //angular 注入   
    static $inject = ['Lyx_Helper'];
    constructor(
        public Lyx_Helper: Lyx_Helper,
    ) {
        console.log("Login控制器");
    }
    uid: string = "";
    pwd: string = "";
    Login() {
        console.log("Login",this.uid);
        console.log("Login",this.pwd);
        this.Lyx_Helper.Lyx_User.Login(this.uid, this.pwd);
    }
}
