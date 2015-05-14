/*global angular*/
'use strict';

/**
 * Navbar Controller
 *
 * @class NavbarController
 * @namespace tiwun.basement.controllers
 */
function NavbarController($scope, AuthenticationService) {
    /**
     * Log the user out
     *
     * @method logout
     * @memberOf tiwun.basement.controllers.NavbarController
     */
    $scope.logout = function () {
        AuthenticationService.logout();
    }
}

angular.module('tiwun.basement.controllers.NavbarController', [
    'tiwun.account.services.AuthenticationService'
])
    .controller('NavbarController', NavbarController);

NavbarController.$inject = ['$scope', 'AuthenticationService'];
