/**
 * IndexController
 * @namespace tiwun.basement.controllers
 */
(function () {
    "use strict";

    angular('tiwun.basement.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'AuthenticationService', 'ItemService', 'Snackbar'];

    /**
     * @namespace IndexController
     */
    function IndexController($scope, AuthenticationService, ItemService, Snackbar) {
        $scope.isAuthenticated = AuthenticationService.isAuthenticated();
        $scope.items = [];

        constructor();

        /**
         * @name constructor
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.basement.controllers.IndexController
         */
        function constructor() {
            ItemService.all().then(itemsSuccessFn, itemsErrorFn);

            $scope.$on('item.created',function(event, item) {
                $scope.items.unshift(item);
            });

            $scope.$on('item.created.error', function() {
                $scope.items.shift();
            });

            /**
             * @name itemsSuccessFn
             * @desc Update thoughts array on view
             */
            function itemsSuccessFn(data, status, headers, config) {
                $scope.items = data.data;
            }

            /**
             * @name itemsErrorFn
             * @desc Show snackbar with error
             */
            function itemsErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();
