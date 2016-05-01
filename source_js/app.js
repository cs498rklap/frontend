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
        when('/', {
          templateUrl: 'partials/home.html',
          access: {restricted: true}
        }).
        when('/login', {
          templateUrl: 'partials/user/login.html',
          controller: 'loginController',
          access: {restricted: false}
        }).
        when('/logout', {
          controller: 'logoutController',
          access: {restricted: true}
        }).
        when('/register', {
          templateUrl: 'partials/user/register.html',
          controller: 'registerController',
          access: {restricted: false}
        }).
        when('/one', {
          template: '<h1>This is page one!</h1>',
          access: {restricted: true}
        }).
        when('/two', {
          template: '<h1>This is page two!</h1>',
          access: {restricted: false}
        }).
        when('/posts/:id', {
            templateUrl: 'partials/post/details.html',
            controller: 'PostIndividualController',
            access: {restricted: true}
        }).
        when('/edit-post/:id', {
            templateUrl: 'partials/post/edit.html',
            controller: 'PostIndividualController',
            access: {restricted: true}
        }).
        when('/jobs/:id', {
            templateUrl: 'partials/job/details.html',
            controller: 'JobsIndividualController',
            access: {restricted: true}
        }).
        when('/posts', {
            templateUrl: 'partials/post/list.html',
            controller: 'PostsController',
            access: {restricted: true}
        }).
        when('/addpost', {
            templateUrl: 'partials/post/add.html',
            controller: 'AddPostController',
            access: {restricted: true}
        }).
        when('/jobs', {
            templateUrl: 'partials/job/list.html',
            controller: 'JobListController',
            access: {restricted: true}
        }).
        when('/addjob', {
            templateUrl: 'partials/job/add.html',
            controller: 'JobAddController',
            access: {restricted: true}
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      console.log(next);
      AuthService.getUserStatus()
      .then(function(){
        if (!AuthService.isLoggedIn() && next.access.restricted){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
//
// app.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart',
//     function (event, next, current) {
//     if (AuthService.isLoggedIn() === false) {
//       $location.path('/login');
//     }
//   });
// });
