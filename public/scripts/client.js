const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'firebase', 'md.data.table']);
console.log('myApp sourced');

myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');

  $mdThemingProvider
  .theme('default')
  .primaryPalette('indigo')
  .accentPalette('pink')
  .warnPalette('red')
  .backgroundPalette('grey');

  $routeProvider.when('/', {
      templateUrl: 'views/home.html',
     controller: 'HomeController as hc'
  }).when('/wordLookup', {
      templateUrl: 'views/wordLookup.html',
      controller: 'WordController as wc'
  }).when('/wordlist', {
      templateUrl: 'views/wordlist.html',
      controller: 'WordListController as wlc'
    }).when('/privateData', {
        templateUrl: 'views/privateData.html',
        controller: 'AuthController as ac'    
    }).when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartController as cc'  
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController as ac'    
    }).when('/reporting', {
        templateUrl: 'views/reporting.html',
        controller: 'WordController as wc'
    }).when('/thanks', {
        templateUrl: 'views/thanks.html',
        controller: 'HomeController as hc'
  }).otherwise({
      redirectTo: '/'
  });
});