/**
 * app启动入口
 * 以下内容为 TypeScript+guip 生成
 */
import '../css/1.css';
import '../css/2.css';
import '../css/3.css';

import { controllers } from "./controllers";
import * as services from "./services";
import * as directive from "./directive";



angular.module('starter',
    [
        'ionic',
        controllers.moduleName,
        services.moduleName,
        directive.moduleName
    ])
    // .run(function ($ionicPlatform) {
    //     $ionicPlatform.ready(function () { });
    // })
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', function (
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $ionicConfigProvider: ionic.utility.IonicConfigProvider,
        $httpProvider: ng.IHttpProvider
    ) {
        $httpProvider.interceptors.push('Lyx_HttpInterceptor');
        // 标题居中
        $ionicConfigProvider.navBar.alignTitle('center');
        /*去掉返回上一页的默认文字*/
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.icon('icon-le-arrow-left');
        $urlRouterProvider.otherwise("/Home/index");
        // Home
        $stateProvider
            .state('Home', { url: "/Home/index", templateUrl: "templates/Home/page3.html",  controller: controllers.Home.Index.controllersName })
            .state('Home_page1', { url: "/Home/1", templateUrl: "templates/Home/page1.html", })
            //机构选择
            .state('Home_mechanism', { url: "/Home/mechanism", templateUrl: "templates/Home/mechanism.html", })

            // Activity
            .state('Activity', { url: "/Activity/index", templateUrl: "templates/Activity/index.html", controllerAs: 'vm', controller: controllers.Activity.Index.controllersName })
            .state('Activity_page1', { url: "/Activity/1", templateUrl: "templates/Activity/page1.html" })
            //活动评论
            .state('Activity_comment', { url: "/Activity/activity-comment", templateUrl: "templates/Activity/activity-comment.html"})
            //活动报名
             .state('Activity_egis', { url: "/Activity/activity-egis", templateUrl: "templates/Activity/activity-egis.html"})
            
            // Donation
            .state('Donation', { url: "/Donation/index", templateUrl: "templates/Donation/index.html", controllerAs: 'vm', controller: controllers.Donation.Index.controllersName })
            .state('Donation_page1', { url: "/Donation/1", templateUrl: "templates/Donation/page1.html" })
            // 捐款
            .state('Donation_zhifu', { url: "/Donation/zhifu", templateUrl: "templates/Donation/zhifu.html" })

        // 朋友
        $stateProvider
            .state('Friend', { url: "/Home/index", templateUrl: "templates/Home/page3.html",  controller: controllers.Friend.Index.controllersName })   

        // 群组
        $stateProvider
            .state('Group', { url: "/Group/index", templateUrl: "templates/Group/index.html",  controller: controllers.Group.Index.controllersName })
            .state('Group_details', { url: "/Group/index-list", templateUrl: "templates/Group/index-list.html"})       

        // 新闻
        $stateProvider
            .state('News', { url: "/News/index", templateUrl: "templates/News/index.html",  controller: controllers.News.Index.controllersName })           
            .state('News_details', { url: "/News/news-detail", templateUrl: "templates/News/news-detail.html"})

         // 我的
        $stateProvider
            .state('User', { url: "/Personal/index", templateUrl: "templates/Personal/index.html",  controller: controllers.User.Index.controllersName })   
            //我的排行榜
            .state('User_ranking', { url: "/Personal/User_ranking", templateUrl: "templates/Personal/my-ranking-list.html"})
            //我的消息
            .state('User_message', { url: "/Personal/User_message", templateUrl: "templates/Personal/my-message.html"})
            //我喜欢的
            .state('User_like', { url: "/Personal/User_like", templateUrl: "templates/Personal/my-like.html"})
    }]);          