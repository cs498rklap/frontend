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
        when('/posts/:id', {
            templateUrl: 'partials/post/details.html',
            controller: 'PostIndividualController'
        }).
        when('/edit-post/:id', {
            templateUrl: 'partials/post/edit.html',
            controller: 'PostIndividualController'
        }).
        when('/jobs/:id', {
            templateUrl: 'partials/job/details.html',
            controller: 'JobsIndividualController'
        }).
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
