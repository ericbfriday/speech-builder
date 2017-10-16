const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'firebase']);
console.log('myApp sourced');

myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');

  $mdThemingProvider
  .theme('default')
  .primaryPalette('blue')
  .accentPalette('blue')
  .warnPalette('red')
  .backgroundPalette('grey');

  $routeProvider.when('/', {
      templateUrl: 'views/home.html',
     controller: 'HomeController as hc'
  }).when('/word', {
      templateUrl: 'views/word.html',
      controller: 'WordController as wc'
  }).when('/letters', {
      templateUrl: 'views/letters.html',
      controller: 'LettersController as lc'
  }).when('/wordlist', {
      templateUrl: 'views/wordlist.html',
      controller: 'WordListController as wlc'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController as ac'      
  }).otherwise({
      redirectTo: '/'
  });
});

myApp.directive('audios', function($sce) {
  return {
    restrict: 'A',
    scope: { code:'=' },
    replace: true,
    template: '<audio ng-src="{{wc.mp3URL}}" controls></audio>',
    link: function (scope) {
        scope.$watch('code', function (newVal, oldVal) {
           if (newVal !== undefined) {
               scope.url = $sce.trustAsResourceUrl(newVal);
           }
        });
    }
  };
});