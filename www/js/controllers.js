angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.destinations = Chats.destinations();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }


    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.destination = Chats.fetch($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
