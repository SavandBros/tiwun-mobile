/**
 * Tiwun Mobile Application
 * @name app
 * @namespace tiwun
 */
(function() {
    'use strict';

    angular.module('tiwun.konfig.Konfig', []);

    angular.module('tiwun', [
        'ionic',
        'angular.filter',
        'markdown',
        'gettext',
        'ngSanitize',
        'tiwun.ngkonstant',
        'tiwun.konfig.Konfig',
        'tiwun.basement',
        'tiwun.account',
        'tiwun.item',
        'tiwun.search',
        'tiwun.tagool'
    ]);

    angular.module('tiwun')
        .run(RunForrestRun);

    RunForrestRun.$inject = ['$window', '$ionicPlatform', 'gettextCatalog', 'AnalyticsProvider'];

    function RunForrestRun($window, $ionicPlatform, gettextCatalog, AnalyticsProvider) {
        var translation = $window.localStorage.getItem('translation');

        if (!translation) {
            translation = 'en';
            $window.localStorage.setItem('translation', translation)
        }

        AnalyticsProvider.init();

        gettextCatalog.setCurrentLanguage(translation);

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }
})();
