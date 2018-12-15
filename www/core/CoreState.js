
angular.module("MainApp").config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $urlRouterProvider.otherwise("/subject1");
    $ocLazyLoadProvider.config({
        events: false,
        debug: false
    });

    $stateProvider
        .state('subject1', {
            url: "/subject1",
            templateUrl: "view/subject1/subject1.html",
            controller: 'Subject1Controller',
            controllerAs: 'THIS',
            resolve: {
                loadMyCtrl: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            "view/subject1/subject1_controller.js",
                        ]
                    });
                }
            }
        })
        .state('subject2', {
            url: "/subject2",
            templateUrl: "view/subject2/subject2.html",
            controller: 'Subject2Controller',
            controllerAs: 'THIS',
            resolve: {
                loadMyCtrl: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            "view/subject2/subject2_controller.js",
                        ]
                    });
                }
            }
        })
        .state('subject3', {
            url: "/subject3",
            templateUrl: "view/subject3/subject3.html",
            controller: 'Subject3Controller',
            controllerAs: 'THIS',
            resolve: {
                loadMyCtrl: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            "view/subject3/subject3_controller.js",
                        ]
                    });
                }
            }
        })
})
    .run(function (GlobalFunction, $uibModalStack, $rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.fromState = fromState.name;
            $uibModalStack.dismissAll();
            $rootScope.transitionState = "active"
        });


    });
