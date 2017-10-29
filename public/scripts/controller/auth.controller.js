myApp.controller("AuthController", function($firebaseAuth, $http, AuthService) {
    console.log('In AuthController!');
    
    const vm = this;
    vm.loggedIn = false;
  

    vm.logIn = () => {
      AuthService.logIn();
    };

    vm.logOut = () => {
      AuthService.logOut();
    };
  });
  