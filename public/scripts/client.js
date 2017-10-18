const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'firebase']);
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
      // /letters NO LONGER NEEDED AS FUNCTIONALITY HAS BEEN
      // MERGED WITH WORD LIST
//   }).when('/letters', {
//       templateUrl: 'views/letters.html',
//       controller: 'LettersController as lc'
  }).when('/wordlist', {
      templateUrl: 'views/wordlist.html',
      controller: 'WordListController as wlc'
    }).when('/privateData', {
        templateUrl: 'views/privateData.html',
        controller: 'AuthController as ac'    
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController as ac'    
    // }).when('/reporting', {
    //     templateUrl: 'views/reporting.html',
    //     controller: 'ReportingController as rc'
    }).when('/thanks', {
        templateUrl: 'views/thanks.html',
        controller: 'HomeController as hc'
  }).otherwise({
      redirectTo: '/'
  });
});