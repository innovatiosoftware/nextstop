angular.module('starter.services', [])

    .factory('Chats', function ($http, $q) {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];


        var destinations = [
            {lat: 18.235253, long: -66.031513, name: "Terminal Goyco", type: 1, color: '#' + Math.floor(Math.random() * 16777215).toString(16)},
            {lat: 18.256513, long: -66.102446, name: "Ruta Aguas Buenas", type: 2, color: '#' + Math.floor(Math.random() * 16777215).toString(16)},
            {lat: 18.256126, long: -65.968022, name: "Ruta Gurabo Carr. 181", type: 2, color: '#' + Math.floor(Math.random() * 16777215).toString(16)},
            {lat: 18.391458, long: -66.074895, name: "Ruta Centro Medico", type: 2, color: '#' + Math.floor(Math.random() * 16777215).toString(16)}
        ];


        return {
            all: function () {
                return chats;
            },
            destinations: function () {
                return destinations;
            },
            fetch: function (index) {
                return destinations[index];
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
