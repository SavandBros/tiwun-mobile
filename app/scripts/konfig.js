/**
 * Konfig
 * @namespace tiwun.konfig
 */
(function() {
    'use strict';

    angular.module('tiwun.konfig.Konfig')
        .config(Konfig);

    Konfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

    function Konfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $httpProvider.interceptors.push('AuthenticationInterceptorService');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                controller: 'MenuController',
                templateUrl: 'templates/menu.html'
            })
            .state('app.explore', {
                url: '/explore',
                views: {
                    'menuContent': {
                        controller: 'IndexController',
                        templateUrl: 'templates/explore.html'
                    }
                }
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        controller: 'SearchController',
                        templateUrl: 'templates/search/search.html'
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
            .state('app.userProfile', {
                url: '/account/user-profile/:userId/',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/account/user_profile.html',
                        controller: 'UserProfileController'
                    }
                }
            })
            .state('app.userSettings', {
                url: '/account/user-profile/settings/:userId/',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/account/user_settings.html',
                        controller: 'UserSettingsController'
                    }
                }
            })
            .state('app.newItem', {
                url: '/items/new/',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/item/item_post.html',
                        controller: 'NewItemController'
                    }
                }
            })
            .state('app.singleItem', {
                url: '/items/:itemId/',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/item/single_item.html',
                        controller: 'SingleItemController'
                    }
                }
            })
            .state('app.tagList', {
                url: '/tags/',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tagool/tag_list.html',
                        controller: 'TagsController'
                    }
                }
            })
            .state('app.tagDetail', {
                url: '/tags/:tagSlug/',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tagool/tag_detail.html',
                        controller: 'TagsDetailController'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/explore');
    }
})();
