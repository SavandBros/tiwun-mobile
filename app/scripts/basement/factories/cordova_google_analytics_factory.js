/*global angular*/
'use strict';

/**
 * CordovaGoogleAnalyticsFactory
 *
 * @class CordovaGoogleAnalyticsFactory
 * @namespace tiwun.basement.factories.CordovaGoogleAnalyticsFactory
 */
function CordovaGoogleAnalyticsFactory($cordovaGoogleAnalytics, ENV) {
    if (!!window.codova) {
        $cordovaGoogleAnalytics.startTrackerWithId(ENV.googleAnalyticsID);
    }
    /**
     * trackPageView
     *
     * @method trackPageView
     * @param {String} path
     * @memberOf tiwun.basement.factories.CordovaGoogleAnalyticsFactory
     */
    function trackPageView(path) {
        if (!!window.cordova) {
            $cordovaGoogleAnalytics.trackView(path);
        }
    }

    return {
        trackPageView: trackPageView
    }
}

angular.module('tiwun.basement.factories.CordovaGoogleAnalyticsFactory', [])
    .factory('CordovaGoogleAnalyticsFactory', CordovaGoogleAnalyticsFactory);

CordovaGoogleAnalyticsFactory.$inject = ['$cordovaGoogleAnalytics', 'ENV'];
