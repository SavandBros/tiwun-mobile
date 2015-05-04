/**
 * TagService
 * @class TagService
 * @namespace tiwun.tagool.services
 */
(function () {
    'use strict';

    angular.module('tiwun.tagool.services.TagService', [])
        .factory('TagService', TagService);

    TagService.$inject = ['$http'];


    /**
     * TagService
     * @name TagService
     * @class TagService
     * @param $http
     * @memberOf: tiwun.tagool.services
     * @returns {{all: TagService.all, tagDetail: TagService.tagDetail}}
     */
    function TagService($http) {
        var TagService = {
            all: all,
            tagDetail: tagDetail
        };

        return TagService;


        /**
         * all
         * @method all
         * @name all
         * @desc List of all tags.
         * @param {number} page_number
         * @memberOf TagService
         * @returns {Promise}
         */
        function all(page_number) {
            return $http.get(
                'https://127.0.0.1:8000/api/tags/',
                {params: {page: page_number}}
            );
        }

        /**
         * tagDetail
         * @method tagDetail
         * @name tagDetail
         * @desc Get given tag associated objects.
         * @param {number} page_number
         * @param {string} tagSlug
         * @memberOf TagService
         * @returns {Promise}
         */
        function tagDetail(page_number, tagSlug) {
            return $http.get(
                'https://127.0.0.1:8000/api/tags/tagSlug/'.replace('tagSlug', tagSlug),
                {params: {page: page_number}}
            );
        }
    }
})();
