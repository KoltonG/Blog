'use strict';
/************************/
/******** MODULE ********/
/************************/
var app = angular.module('blog', ['ui.router', 'ngResource']);


/************************/
/******** CONFIG ********/
/************************/
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider',
function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
  $compileProvider.debugInfoEnabled(false);
  // Fix url ui router issue
  $locationProvider.html5Mode(true);
  // Routes
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: '/Blog/partials/blog.html',
      controller: 'blogLandingController'
    })
    .state('blog-article', {
      url: '/articles/:articleName',
      // TODO this should be changed
      templateUrl: '/Blog/partials/?.html',
      controller: 'blogArticleController'
    });

  $urlRouterProvider.otherwise('/');
}]);