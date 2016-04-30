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

    'dashboard.services',
    'dashboard.controllers',

    '720kb.datepicker'
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
        when('/jobs', {
            templateUrl: 'partials/job/list.html',
            controller: 'JobListController'
        }).
        when('/addjob', {
            templateUrl: 'partials/job/add.html',
            controller: 'JobAddController'
        }).
        when('/dashboard', {
            templateUrl: 'partials/user/dashboard.html',
            controller: 'DashboardController'
        }).
        otherwise({
            redirectTo: '/posts'
        });
}]);
