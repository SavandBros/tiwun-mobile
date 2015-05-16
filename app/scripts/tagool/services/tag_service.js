/**
 * TagService
 * @class TagService
 * @namespace tiwun.tagool.services
 */
(function () {
    'use strict';

    angular.module('tiwun.tagool.services.TagService', [])
        .factory('TagService', TagService);

    TagService.$inject = ['$http', 'ENV'];


    /**
     * TagService
     * @name TagService
     * @class TagService
     * @param $http
     * @memberOf: tiwun.tagool.services
     * @returns {{all: TagService.all, tagDetail: TagService.tagDetail}}
     */
    function TagService($http, ENV) {
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
                ENV.apiEndpoint + 'tags/',
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
                ENV.apiEndpoint + 'tags/tagSlug/'.replace('tagSlug', tagSlug),
                {params: {page: page_number}}
            );
        }
    }
})();
