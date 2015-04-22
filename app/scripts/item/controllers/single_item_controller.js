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

    SingleItemController.$inject = ['$scope', '$stateParams', 'ItemService'];

    /**
     * @namespace SingleItemController
     */
    function SingleItemController($scope, $stateParams, ItemService) {
        constructor();

        /**
         * @name constructor
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.item.controllers.SingleItemController
         **/
        function constructor () {
            // TODO: Get the item or go back ;)
        }

    }

})();