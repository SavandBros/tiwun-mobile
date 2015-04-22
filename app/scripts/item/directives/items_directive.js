/**
 * Items
 * @namespace tiwun.items.directive
 */
(function () {
    "use strict";

    angular.module('tiwun.item.directives', [
        'tiwun.item.controllers'
    ])
        .directive('items', items);

    /**
     * @namespace Items
     */
    function items() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf tiwun.item.directives.Items
         */
        var directive = {
            controller: 'ItemController',
            restrict: 'E',
            scope: {
                items: '='
            },
            templateUrl: 'templates/items/items.html'
        };

        return directive;
    }
})();
