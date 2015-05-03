/**
 * TagsDetailController
 * @class TagsDetailController
 * @namespace tiwun.tagool.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.tagool.controllers.TagsDetailController', [
        'tiwun.tagool.services.TagService'
    ])
        .controller('TagsDetailController', TagsDetailController);

    TagsController.$inject = ['$scope', 'TagService'];

    function TagsController($scope, TagService) {
        $scope.tags = [];
        $scope.pageHasNext = true;
        $scope.pageCounter = 0;


        /**
         * @name loadMore
         */
        $scope.loadMore = function () {
            TagService.all(++$scope.pageCounter).then(
                function (data, status, headers, config) {
                    $scope.tags = $scope.tags.concat(data.data['tags']);

                    $scope.pageHasNext = data.data.page_has_next;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function (data, status, headers, config) {
                    //Snackbar.error(data.error);
                    console.log(data.error);
                }
            );
        };
    };
})();
