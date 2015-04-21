/**
 * NavbarController
 * @namespace tiwun.basement.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.basement.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'AuthenticationService'];

    /**
     * @namespace NavbarController
     */
    function NavbarController($scope, AuthenticationService) {
        $scope.logout = logout;
        /**
         * @name logout
         * @desc Log the user out
         * @memberOf tiwun.basement.controllers.NavbarController
         */
        function logout() {
            AuthenticationService.logout();
        }
    }
})();
