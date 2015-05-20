/*global angular*/
'use strict';

/**
 * Tags Controller
 *
 * @class TagsController
 * @param {Object} $scope
 * @param {Object} $log
 * @param {TagService} TagService
 * @namespace tiwun.tagool.controllers
 */
function TagsController($scope, $log, TagService) {
    $scope.tags = [];
    $scope.pageHasNext = true;
    $scope.pageCounter = 0;


    /**
     * Load More
     *
     * @method loadMore
     * @memberOf tiwun.tagool.controllers.TagsController
     */
    $scope.loadMore = function() {
        TagService.all(++$scope.pageCounter).then(
            function(data, status, headers, config) {
                $scope.tags = $scope.tags.concat(data.data.tags);

                $scope.pageHasNext = data.data.page_has_next;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            },
            function(data, status, headers, config) {
                $log.error(data.error);
            }
        );
    };
}

angular.module('tiwun.tagool.controllers.TagsController', [
        'tiwun.tagool.services.TagService'
    ])
    .controller('TagsController', TagsController);

TagsController.$inject = ['$scope', '$log', 'TagService'];
