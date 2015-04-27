/**
 * PaginationService
 * @namespace tiwun.basement.services
 */
(function () {
    'use strict';

    /**
     * @name Pagination
     * @param {object} paginationContext
     * @param {string} controllerName
     * @param $rootScope
     * @constructor
     */
    function Pagination(paginationContext, controllerName, $rootScope) {
        /**
         * @name isPaginated
         * @returns {boolean}
         */
        this.isPaginated = function() {
            return paginationContext.is_paginated;
        };

        /**
         * @name paginatedCount
         * @returns {number}
         */
        this.paginatedCount = function () {
            return paginationContext.paginated_count;
        };

        /**
         * @name pageNumber
         * @returns {number}
         */
        this.pageNumber = function () {
            return paginationContext.page_number;
        };

        /**
         * @name hasPrevious
         * @returns {boolean}
         */
        this.hasPrevious = function () {
            return paginationContext.page_has_previous;
        };

        /**
         * @name hasNext
         * @returns {boolean}
         */
        this.hasNext = function () {
            return paginationContext.page_has_next;
        };

        /**
         * @name nextPageNumber
         * @returns {number}
         */
        this.nextPageNumber = function () {
            return paginationContext.page_next_page_number;
        };

        /**
         * @name previousPageNumber
         * @returns {number}
         */
        this.previousPageNumber = function () {
            return paginationContext.page_previous_page_number;
        };

        /**
         * @name numPages
         * @returns {number}
         */
        this.numPages = function () {
            return paginationContext.page_paginator_num_pages;
        };


        this.nextPage = function () {
            if (this.hasNext()) {
                $rootScope.$broadcast(controllerName + ':pagination:next', this.nextPageNumber());
            }
        };

        this.previousPage = function () {
            if (this.hasPrevious()) {
                $rootScope.$broadcast(controllerName +':pagination:previous', this.previousPageNumber());
            }
        }
    }

    angular.module('tiwun.basement.services', [])
        .factory('PaginationService', function($rootScope) {
            return {
                Pagination: function (paginationContext, controllerName) {
                    return new Pagination(paginationContext, controllerName, $rootScope);
                }
            }
        });
})();
