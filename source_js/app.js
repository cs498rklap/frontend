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
    'post.controllers',

    '720kb.datepicker'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/jobs', {
        templateUrl: 'partials/job/list.html',
        controller: 'JobListController'
    }).
    when('/jobs/add', {
        templateUrl: 'partials/job/add.html',
        controller: 'JobAddController'
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
