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
        console.log($stateParams['tagSlug']);
        $scope.items = [];
        $scope.pageHasNext = true;
        $scope.pageCounter = 0;


        /**
         * @name loadMore
         */
        $scope.loadMore = function() {
            TagService.tagDetail(++$scope.pageCounter, $stateParams['tagSlug']).then(
                function(data, status, headers, config) {
                    $scope.items = $scope.items.concat(data.data['tagged_classifies']);

                    $scope.pageHasNext = data.data.page_has_next;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function(data, status, headers, config) {
                    //Snackbar.error(data.error);
                    $log.error(data.error);
                }
            );
        };
    }
})();
