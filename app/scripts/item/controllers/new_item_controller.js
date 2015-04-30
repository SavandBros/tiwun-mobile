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

    NewItemController.$inject = ['$rootScope', '$scope', 'AuthenticationService', 'ItemService'];

    /**
     * @namespace NewItemController
     */
    function NewItemController($rootScope, $scope, AuthenticationService, ItemService) {
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
