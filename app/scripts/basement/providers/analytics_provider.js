/*global angular*/
'use strict';

/**
 * AnalyticsProvider
 *
 * @class AnalyticsProvider
 * @namespace tiwun.basement.providers.AnalyticsProvider
 */
function AnalyticsProvider() {
    var analyticFactoryModuleNames = [
        'LogAnalyticsFactory',
        'CordovaGoogleAnalyticsFactory'
    ];

    this.$get = function($injector, $rootScope, $location) {
        var service = {};
        /**
         * init
         *
         * Just dummy function so that it's instantiated on app creation
         *
         * @method init
         * @memberOf tiwun.basement.providers.AnalyticsProvider
         * @returns {undefined}
         */
        service.init = function() {

        };
        /**
         * analyticFactories
         *
         * Keeping Analytic Factories
         *
         * @type {Array}
         */
        var analyticFactories = [];


        // Fill up the analyticFactories <3
        angular.forEach(analyticFactoryModuleNames, function(moduleName) {
            analyticFactories.push($injector.get(moduleName));
        });
        /**
         * trackPageView
         *
         * Track page view for each analytic factory that is available.
         *
         * @method trackPageView
         * @param {String} path
         * @memberOf tiwun.basement.providers.AnalyticsProvider
         */
        service.trackPageView = function(path) {
            angular.forEach(analyticFactories, function(analyticFactory) {
                if (path) {
                    analyticFactory.trackPageView(path);
                }
            });
        };

        $rootScope.$on('$stateChangeSuccess', function() {
            service.trackPageView($location.path());
        });

        return service;
    }
}


angular.module('tiwun.basement.providers.AnalyticsProvider', [])
    .provider('AnalyticsProvider', AnalyticsProvider);

AnalyticsProvider.$inject = [];
