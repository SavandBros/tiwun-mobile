/**
 * PaginationService
 * @namespace tiwun.basement.services
 */
(function () {
    'use strict';

    angular.module('tiwun.basement.services', [])
        .factory('PaginationService', PaginationService);


    /**
     * @name PaginationService
     * @param paginationContext
     * @param $rootScope
     * @return {PaginationService}
     * @constructor
     */
    function PaginationService(paginationContext, $rootScope) {
        var PaginationService = {
            isPaginated: isPaginated,
            paginatedCount: paginatedCount,
            pageNumber: pageNumber,
            hasPrevious: hasPrevious,
            hasNext: hasNext,
            nextPageNumber: nextPageNumber,
            previousPageNumber: previousPageNumber,
            numPages: numPages,
            nextPage: nextPage,
        };

        return PaginationService;


        /**
         * @name isPaginated
         * @returns {boolean}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function isPaginated() {
            return paginationContext.is_paginated;
        }

        /**
         * @name paginatedCount
         * @returns {number}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function paginatedCount() {
            return paginationContext.paginated_count;
        }

        /**
         * @name pageNumber
         * @returns {number}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function pageNumber() {
            return paginationContext.page_number;
        }

        /**
         * @name hasPrevious
         * @returns {boolean}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function hasPrevious() {
            return paginationContext.page_has_previous;
        }

        /**
         * @name hasNext
         * @returns {boolean}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function hasNext() {
            return paginationContext.page_has_next;
        }

        /**
         * @name nextPageNumber
         * @returns {number}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function nextPageNumber() {
            return paginationContext.page_next_page_number;
        }

        /**
         * @name previousPageNumber
         * @returns {number}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function previousPageNumber() {
            return paginationContext.page_previous_page_number;
        }

        /**
         * @name numPages
         * @returns {number}
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function numPages() {
            return paginationContext.page_paginator_num_pages;
        }


        /**
         * @name nextPage
         * @memberOf tiwun.basement.controllers.PaginationService
         */
        function nextPage () {
            if (hasNext()) {
                $rootScope.$broadcast('pagination:next', nextPageNumber());
            }
        }

    }
})();
