/**
 * TagsController
 * @class TagsController
 * @namespace tiwun.tagool.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.tagool.controllers.TagsController', [
        'tiwun.tagool.services.TagService'
    ])
        .controller('TagsController', TagsController);

    TagsController.$inject = ['$scope', '$log', 'TagService'];

    function TagsController($scope, TagService) {
        $scope.tags = [];
        $scope.pageHasNext = true;
        $scope.pageCounter = 0;


        /**
         * Load More
         *
         * @method loadMore
         * @memberOf tiwun.tagool.controllers.TagsController
         */
        $scope.loadMore = function () {
            TagService.all(++$scope.pageCounter).then(
                function (data, status, headers, config) {
                    $scope.tags = $scope.tags.concat(data.data['tags']);

                    $scope.pageHasNext = data.data.page_has_next;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function (data, status, headers, config) {
                    $log.error(data.error);
                }
            );
        };
    }
})();
