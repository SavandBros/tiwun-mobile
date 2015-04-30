/**
 * NewItemController
 * @namespace tiwun.item.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.item.controllers.NewItemController', [
        'tiwun.item.services.ItemService',
        'tiwun.account.services.AuthenticationService'
    ])
        .controller('NewItemController', NewItemController);

    NewItemController.$inject = ['$rootScope', '$scope', '$state', 'AuthenticationService', 'ItemService'];

    /**
     * @namespace NewItemController
     */
    function NewItemController($rootScope, $scope, $state,  AuthenticationService, ItemService) {
        constructor();

        $scope.auth = AuthenticationService;

        function constructor() {
            if (!AuthenticationService.isAuthenticated()) {
                $state.go('app.login');
            }
        }

        /**
         * @name create
         * @desc Create a new Item
         * @memberOf tiwun.item.controllers.NewItemController
         */
        $scope.create = function () {
            // TODO: send item to ItemService.create() ;)
        }
    }
})();
