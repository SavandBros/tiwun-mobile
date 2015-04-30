/**
 * @name MenuController
 * @namespace tiwun.basement.controllers.MenuController
 */
(function () {
    'use strict';

    angular.module('tiwun.basement.controllers.MenuController', [
        'tiwun.account.services.AuthenticationService'
    ])
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', 'AuthenticationService'];

    function MenuController($scope, AuthenticationService) {
        $scope.auth = AuthenticationService;
    }

})();
