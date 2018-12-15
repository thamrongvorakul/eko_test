var app = angular.module('MainApp');


app.directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'navbar.html',
        controller: function ($scope, $state) {
            var THIS = this;
            $scope.userprofile = JSON.parse(sessionStorage.getItem('Userprofile'));

            $scope.goState = function (url) {
                $state.go(url, {}, { reload: true })
            };

        },
        controllerAs: 'nav'
    };
})
