/**
 * SingleItemController
 * @namespace tiwun.item.controllers
 **/
(function () {
    "use strict";

    angular.module('tiwun.item.controllers.SingleItemController', [
        'tiwun.item.services.ItemService',
        'tiwun.sushial.services.CommentService',
        'tiwun.account.services.AuthenticationService'
    ])
        .controller('SingleItemController', SingleItemController);

    SingleItemController.$inject = ['$scope', '$stateParams', '$ionicHistory', 'ItemService', 'CommentService', 'AuthenticationService'];

    /**
     * @namespace SingleItemController
     */
    function SingleItemController($scope, $stateParams, $ionicHistory, ItemService, CommentService, AuthenticationService) {
        constructor();

        /**
         * @name constructor
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf tiwun.item.controllers.SingleItemController
         **/
        function constructor() {
            ItemService.get($stateParams['itemId']).then(
                function (data, status, headers, config) {
                    $scope.context = data.data;
                    $scope.item = $scope.context['item'];

                    $scope.item.comments = [
                        {
                            user_name: "Amir Mehdi",
                            user_img: "http://goo.gl/sXexCe",
                            content: "This is awesome, I iz verry gut in commenting."
                        },
                        {user_name: "Alireza", user_img: "http://goo.gl/5nqX1I", content: "Like Like like... <3"},
                        {user_name: "Hassan", user_img: "http://goo.gl/mQ9r38", content: "Cool :)"},
                        {
                            user_name: "Mohhamad Ali",
                            user_img: "http://goo.gl/hMUWto",
                            content: "Best product NEVER ! XD LMAO"
                        },
                        {
                            user_name: "Gholam Reza",
                            user_img: "http://goo.gl/wpb2MF",
                            content: "Here's the last comment you'll ever see stupid fucker!"
                        }
                    ];

                    // CommentService.filterByObject(1, $scope.item.pk).then(
                    //     function(data, status, headers, config){
                    //         $scope.item.comments = data.data;
                    //     },
                    //     function(data, status, headers, config){
                    //         console.log("[error] on getting comments!");
                    //         console.log(data.error);
                    //     }
                    // );
                },
                function (data, status, headers, config) {
                    console.log('Error on receiving item');
                    console.log(data.error);
                    $ionicHistory.goBack();
                }
            );
        }
        $scope.addComment = function(form, comment) {
            $scope.auth = AuthenticationService;
            var user = $scope.auth.getAuthenticatedUser();

            if ($scope.auth.isAuthenticated()) {
                console.log(form, comment);
                CommentService.create(1, $scope.item.pk, user.pk, comment.text).then(
                    function (data, status, headers, config) {
                        console.log(data.data);
                    },
                    function (data, status, headers, config) {
                        console.log('commenting error');
                        console.log(data.error)
                    }
                );
            }
        }
    }
})();
