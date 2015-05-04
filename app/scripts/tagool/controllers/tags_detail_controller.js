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

    TagsDetailController.$inject = ['$scope', '$stateParams', 'TagService'];

    function TagsDetailController($scope, $stateParams, TagService) {
        console.log($stateParams['tagSlug']);
        $scope.items = [];
        $scope.pageHasNext = true;
        $scope.pageCounter = 0;


        /**
         * @name loadMore
         */
        $scope.loadMore = function () {
            TagService.tagDetail(++$scope.pageCounter, $stateParams['tagSlug']).then(
                function (data, status, headers, config) {
                    $scope.items = $scope.items.concat(data.data['tagged_classifies']);

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
