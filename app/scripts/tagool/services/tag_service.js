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
            ENV.apiEndpoint + 'tagool/tags/'
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
    function tagDetail(tagSlug, pageNumber) {
        return $http.get(
            ENV.apiEndpoint + 'tagool/tags/' + tagSlug + '/'
        );
    }

    return {
        all: all,
        tagDetail: tagDetail
    }
}

angular.module('tiwun.tagool.services.TagService', [])
    .factory('TagService', TagService);

TagService.$inject = ['$http', 'ENV'];
