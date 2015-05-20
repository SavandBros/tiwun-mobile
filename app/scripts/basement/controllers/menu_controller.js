/**
 * @name MenuController
 * @namespace tiwun.basement.controllers.MenuController
 */
(function() {
    'use strict';

    angular.module('tiwun.basement.controllers.MenuController', [
            'tiwun.account.services.AuthenticationService'
        ])
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$window', '$scope', 'AuthenticationService'];

    function MenuController($window, $scope, AuthenticationService) {
        $scope.auth = AuthenticationService;
        $scope.user = AuthenticationService.getAuthenticatedUser();

        $scope.$on('tiwun.account.service.AuthenticationService:SignedOut', function() {
            $window.location.reload(true)
        });
    }

})();
