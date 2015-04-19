/**
 * NewItemController
 * @namespace tiwun.item.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.item.controllers', [
        'tiwun.item.services',
        'tiwun.account.services'
    ])
        .controller('NewItemController', NewItemController);

    NewItemController.$inject = ['$rootScope', '$scope', 'AuthenticationService', 'ItemService'];

    /**
     * @namespace NewItemController
     */
    function NewItemController($rootScope, $scope, AuthenticationService, Item) {
        /**
         * @name submit
         * @desc Create a new Post
         * @memberOf tiwun.item.controllers.NewItemController
         */
        $scope.submit = function submit() {
            $rootScope.broadcast('item.created', {
                content: $scope.content,
                author: {
                    username: AuthenticationService.getAuthenticatedUser().username
                }
            });

            $scope.closeThisDialog();
            ItemService.create($scope.content).then(createItemSuccessFn, createItemErrorFn);

            /**
             * @name createItemSuccessFn
             * @desc Show with success message
             */
            function createItemSuccessFn(data, status, headers, config) {
                console.log('Success! Item created.');
            }

            /**
             * @name createItemErrorFn
             * @desc Propogate error event and show messageBar with error message
             */
            function createItemErrorFn(data, status, headers, config) {
                $rootScope.$broadcast('item.created.error');
                //Snackbar.error(data.error);
                console.log(data.error);
            }
        }
    }
})();
