/**
 * TagsDetailController
 * @class TagsDetailController
 * @namespace tiwun.tagool.controllers
 */
(function() {
    'use strict';

    angular.module('tiwun.tagool.controllers.TagsDetailController', [
            'tiwun.tagool.services.TagService'
        ])
        .controller('TagsDetailController', TagsDetailController);

    TagsDetailController.$inject = ['$scope', '$stateParams', '$log', 'TagService'];

    function TagsDetailController($scope, $stateParams, $log, TagService) {
        $scope.items = [];
        $scope.pageHasNext = true;
        $scope.pageCounter = 0;
        $scope.tagName = $stateParams.tagSlug;


        /**
         * @name loadMore
         */
        $scope.loadMore = function() {
            TagService.tagDetail($stateParams.tagSlug, ++$scope.pageCounter).then(
                function(data, status, headers, config) {
                    $scope.items = $scope.items.concat(data.data.results);

                    $scope.pageHasNext = data.data.page_has_next;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function(data, status, headers, config) {
                    $log.error(data.error);
                }
            );
        };
    }
})();
