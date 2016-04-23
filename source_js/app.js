var app = angular.module('lap', [
    'ngRoute',

    'user.services',
    'user.controllers',

    'jobs.services',
    'jobs.controllers',

    'job.services',
    'job.controllers',

    'posts.services',
    'posts.controllers',

    'post.services',
    'post.controllers'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/posts', {
        templateUrl: 'partials/post/list.html',
        controller: 'PostsController'
    }).
    when('/addpost', {
        templateUrl: 'partials/post/add.html',
        controller: 'AddPostController'
    }).
    otherwise({
        redirectTo: '/posts'
    });
}]);
