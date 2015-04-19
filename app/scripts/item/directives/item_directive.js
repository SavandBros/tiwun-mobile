/**
 * Item
 */
(function () {
    'use strict';
    angular.module('tiwun.item.directives')
        .directives('item', item);

    /**
     * @namespace Item
     */
    function item() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf tiwun.item.directives.Item
         */
        var directive = {
            restrict: 'E',
            scope: {
                post: '='
            },
            templateUrl: 'templates/item/item.html'
        };

        return directive;
    }
})();
