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

    NewItemController.$inject = ['$rootScope', '$scope', '$state', '$ionicHistory', 'AuthenticationService', 'ItemService'];

    /**
     * @namespace NewItemController
     */
    function NewItemController($rootScope, $scope, $state, $ionicHistory, AuthenticationService, ItemService) {
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
        $scope.create = function (form) {
            $scope.formSubmitted = true;

            if (form.$valid) {
                var item = {
                    title: form.title.$modelValue,
                    description: form.description.$modelValue,
                    tags: form.tags.$modelValue
                };

                ItemService.create(item).then(
                    function(data, status, headers, config) {
                        console.log('Item has been created');

                        $state.go('app.singleItem', {itemId: data.data.pk});
                    },
                    function(data, status, headers, config) {
                        console.log('Error happened' + data.error);
                    }
                )
            }
        };


        /**
         * Cancel
         * @name cancel
         * @desc Cancel creation of new item and go back!
         * @memberOf tiwun.item.controllers.NewItemController
         */
        $scope.cancel = function () {
            $ionicHistory.goBack();
        }
    }
})();
