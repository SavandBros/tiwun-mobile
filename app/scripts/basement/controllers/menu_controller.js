/*global angular*/
'use strict';

/**
 * Menu Controller
 *
 * @class MenuController
 * @namespace tiwun.basement.controllers.MenuController
 */
function MenuController($window, $scope, AuthenticationService) {
    $scope.auth = AuthenticationService;

    $scope.$on('tiwun.account.service.AuthenticationService:SignedOut', function () {
        $window.location.reload(true)
    });
}

angular.module('tiwun.basement.controllers.MenuController', [
    'tiwun.account.services.AuthenticationService'
])
    .controller('MenuController', MenuController);

MenuController.$inject = ['$window', '$scope', 'AuthenticationService'];
