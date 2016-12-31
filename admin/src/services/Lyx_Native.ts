
/**************************************
   ****** 和 Native交互
  ************************************/
/**
 * Lyx_Native
 */
export let servicesName: string = "Lyx_Native";
export {services as Lyx_Native};
export class services {
    Ios: {
        callHandler: any,
        registerHandler: any,
    };
    constructor() {
        // console.log(ionic.Platform.isIOS());
        if (ionic.Platform.isIOS()) {
            this.setupWebViewJavascriptBridge(x => {
                this.Ios.callHandler = x.callHandler;
                this.Ios.registerHandler = x.registerHandler;
            });
        }
    }
    setupWebViewJavascriptBridge(callback) {
        if (window["WebViewJavascriptBridge"]) { return callback(window["WebViewJavascriptBridge"]); }
        if (window['WVJBCallbacks']) { return window['WVJBCallbacks'].push(callback); }
        window['WVJBCallbacks'] = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        try {
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
        } catch (e) { }
    }
    /**
     * 执行Native 事件
     */
    NativeEvent(EventName: string, args) {
        try {
            if (ionic.Platform.isIOS()) {
                this.Ios.callHandler(EventName, args);
            }
            if (ionic.Platform.isAndroid()) {
                if (window["android"]) {
                    window['android'][EventName](angular.toJson(args));
                }
            }
        } catch (error) {
            console.error(error);
        }

    }
}