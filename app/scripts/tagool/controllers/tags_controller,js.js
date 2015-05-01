/**
 * TagsController
 * @class TagsController
 * @namespace tiwun.tagool.controllers
 */
(function () {
    'use strict';

    angular.module('tiwun.tagool.controllers.TagsController', [
        'tiwun.tagool.services.TagService'
    ])
        .controller('TagsController', TagsController);

    TagsController.$inject = ['$scope', 'TagService'];

    function TagsController($scope, TagService) {
        constructor();

        /**
         * @name constructor
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.tagool.controllers.TagsController
         */
        function constructor() {

        }
    }

})();
