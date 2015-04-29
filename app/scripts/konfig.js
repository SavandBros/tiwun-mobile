/**
 * Konfig
 * @namespace tiwun.konfig
 */
(function () {
    'use strict';

    angular.module('tiwun.konfig')
        .config(Konfig);

    Konfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

    function Konfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })
            .state('app.explore', {
                url: "/explore",
                views: {
                    'menuContent': {
                        controller: 'IndexController',
                        templateUrl: "templates/explore.html"
                    }
                }
            })
            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        controller: 'SearchController',
                        templateUrl: "../templates/search/search.html"
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })
            .state('app.register', {
                url: '/account/register',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/account/register.html',
                        controller: 'RegisterController'
                    }
                }
            })
            .state('app.login', {
                url: '/account/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/account/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('app.singleItem', {
                url: "/items/:itemId/",
                views: {
                    'menuContent': {
                        templateUrl: "templates/item/single_item.html",
                        controller: 'SingleItemController'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/explore');
    }
})();
