(function() {
    'use strict';

    angular.module('tiwun.sushial', [
        'tiwun.sushial.services.CommentService',
        'tiwun.sushial.services.VoteService'
    ]);

    angular.module('tiwun.sushial.services.CommentService', []);
    angular.module('tiwun.sushial.services.VoteService', []);
})();
