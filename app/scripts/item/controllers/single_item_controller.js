/**
 * SingleItemController
 * @namespace tiwun.item.controllers
 **/
(function () {
    "use strict";

    angular.module('tiwun.item.controllers', [
        'tiwun.item.services'
    ])
        .controller('SingleItemController', SingleItemController);

    SingleItemController.$inject = ['$scope', '$stateParams', '$ionicHistory', 'ItemService'];

    /**
     * @namespace SingleItemController
     */
    function SingleItemController($scope, $stateParams, $ionicHistory, ItemService) {
        constructor();

        /**
         * @name constructor
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.item.controllers.SingleItemController
         **/
        function constructor () {
            ItemService.get($stateParams['itemId']).then(
                function (data, status, headers, config) {
                    $scope.context = data.data;
                    $scope.item = $scope.context['item'];
                },
                function (data, status, headers, config) {
                    console.log('Error on receiving item');
                    console.log(data.error);
                    $ionicHistory.goBack();
                }
            );
        }
    }
})();
