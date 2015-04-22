/**
 * ItemsController
 * @namespace tiwun.item.controllers
 **/
(function () {
    'use strict';

    angular.module('tiwun.item.controllers')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['$scope'];

    /**
     * @namespace ItemsController
     */
    function ItemsController($scope) {
        var columns = [];

        constructor();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.item.controllers.ItemsControllers
         **/
        function constructor() {
            $scope.$watchCollection(function () {
                return $scope.items;
            }, render);
            $scope.$watch(function () {
                return $(window).width()
            }, render);
        }

        /**
         * @name calculateNumberOfColumns
         * @desc Calculate number of columns based on screen width
         * @returns {Number} The number of columns containing Posts
         * @memberOf tiwun.items.controllers.ItemControllers
         */
        function calculateNumberOfColumns() {
            var width = $(window).width;

            if (width >= 1200) {
                return 4;
            } else if (width >= 992) {
                return 3;
            } else if (width >= 768) {
                return 2;
            } else {
                return 1;
            }
        }

        /**
         * @name approximateShortestColumn
         * @desc An algorithm for approximating which column is shortest
         * @returns The index of the shortest column
         * @memberOf tiwun.items.controllers.ItemsControllers
         */
        function approximateShortestColumn() {
            var scores = columns.map(columnMapFn);

            return scores.indexOf(Math.min.apply(this, scores));

            /**
             * @name columnMapFn
             * @desc A map function for scoring column heights
             * @returns The approximately normalized height of a given column
             */
            function columnMapFn(column) {
                var length = column.map(function (element) {
                    return element.content.length;
                });

                return length.reduce(sum, 0) * column.length;
            }

            /**
             * @name sum
             * @desc Sums two numbers
             * @params {Number} m The first number to be summed
             * @params {Number} n The second number to be summed
             * @returns The sum of two numbers
             */
            function sum(m, n) {
                return m + n;
            }
        }

        /**
         * @name render
         * @desc Renders Posts into columns of approximately equal height
         * @param {Array} current The current value of `vm.posts`
         * @param {Array} original The value of `vm.posts` before it was updated
         * @memberOf tiwun.item.controllers.ItemsControllers
         */
        function render(current, original) {
            if (current !== original) {
                columns = [];

                for (var i = 0; i < calculateNumberOfColumns(); ++i) {
                    columns.push([]);
                }

                for (var j = 0; j < current.length; ++j) {
                    var column = approximateShortestColumn();
                    columns[column].push(current[i]);
                }
            }
        }
    }
})();