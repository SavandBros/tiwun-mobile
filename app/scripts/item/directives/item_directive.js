/*global angular*/
'use strict';

/**
 * @class tiwun.item.directives.ItemDirective
 * @namespace tiwun.item.directives.ItemDirective
 * @returns {{restrict: string, scope: {scope: string}, templateUrl: string}}
 */
function ItemDirective() {
    return {
        restrict: 'E',
        scope: {
            item: '=',
            image: '=',
            upVote: '&',
            downVote: '&'
        },
        templateUrl: 'templates/item/directives/item_directive.html'
    }
}

angular.module('tiwun.item.directives.ItemDirective', [])
    .directive('item', ItemDirective);
