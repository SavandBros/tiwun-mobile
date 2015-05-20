/*global angular*/
'use strict';

/**
 * Tag Service
 *
 * @name TagService
 * @class TagService
 * @param {Object} $http
 * @param {Object} ENV
 * @memberOf: tiwun.tagool.services
 * @returns {{all: TagService.all, tagDetail: TagService.tagDetail}}
 */
function TagService($http, ENV) {
    /**
     * all
     * Getting All of tags
     *
     * @method all
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
     * Getting one single tag detail page, which is full of items ;)
     *
     * @method tagDetail
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

    return {
        all:all,

        tagDetail: tagDetail
    }
}

angular.module('tiwun.tagool.services.TagService', [])
    .factory('TagService', TagService);

TagService.$inject = ['$http', 'ENV'];
