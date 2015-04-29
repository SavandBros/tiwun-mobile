(function () {
    "use strict";

    angular.module('tiwun.basement', [
        'tiwun.basement.controllers.IndexController',
        'tiwun.basement.controllers.NavbarController',
        'tiwun.basement.services.PaginationService'
    ]);


    angular.module('tiwun.basement.controllers.IndexController', []);
    angular.module('tiwun.basement.controllers.NavbarController', []);
    angular.module('tiwun.basement.services.PaginationService', []);
})();
