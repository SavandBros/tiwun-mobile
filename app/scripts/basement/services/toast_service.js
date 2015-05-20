/*global angular*/
'use strict';

/**
 * ToastService
 *
 * Requires the Toast plugin: https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin
 * And Ionic Framework: http://ionicframework.com
 * ngCordova is used here, but easily removed: http://ngcordova.com/
 *
 * When running in Cordova, show the native toast. Outside of Cordova, show an Ionic Popup for the same period of time.
 * Uses the API for the Toast plugin - message, duration, position.
 * Differences are that: Ionic Popup ignores position, and doesn't allow doing anything while it shows.
 *
 * @class ToastService
 * @param {Object} $rootScope
 * @param {Object} $timeout
 * @param {Object} $ionicPopup
 * @param {Object} $cordovaToast
 * @param {Object} gettextCatalog
 * @namespace tiwun.basement.services.ToastService
 */
function ToastService($rootScope, $timeout, $ionicPopup, $cordovaToast, gettextCatalog) {
    /**
     * Show message
     *
     * @method show
     * @param {String} message
     * @param {String} duration
     * @param {String} position
     * @memberOf tiwun.basement.services.ToastService
     */
    function show(message, duration, position) {
        message = message || gettextCatalog.getString('There was a problem...');
        duration = duration || 'short';
        position = position || 'top';


        if (!!window.cordova) {
            // User the Cordova Toast plugin
            $cordovaToast.show(message, duration, position);
        } else {
            if (duration === 'short') {
                duration = 2000;
            } else {
                duration = 5000;
            }

            var toastPopup = $ionicPopup.show({
                template: '<div class=\'toast\'>' + message + '</div>',
                scope: $rootScope,
                buttons: []
            });

            $timeout(function() {
                toastPopup.close();
            }, duration);
        }
    }

    return {
        show: show
    };
}

angular.module('tiwun.basement.services.ToastService', ['ngCordova'])
    .factory('ToastService', ToastService);

ToastService.$inject = ['$rootScope', '$timeout', '$ionicPopup', '$cordovaToast', 'gettextCatalog'];
