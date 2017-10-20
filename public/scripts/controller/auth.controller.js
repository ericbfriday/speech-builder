myApp.controller("AuthController", function($firebaseAuth, $http) {
    console.log('In AuthController!');
    
    var auth = $firebaseAuth();
    var self = this;
  
    // This code runs whenever the user logs in
    self.logIn = function(){
      auth.$signInWithPopup("google").then(function(firebaseUser) {
        console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      }).catch(function(error) {
        console.log("Authentication failed: ", error);
      });
    };
  
    // This code runs whenever the user changes authentication states
    // e.g. whevenever the user logs in or logs out
    // this is where we put most of our logic so that we don't duplicate
    // the same things in the login and the logout code
    auth.$onAuthStateChanged(function(firebaseUser){
      // firebaseUser will be null if not logged in
      if(firebaseUser) {
        // This is where we make our call to our server
        firebaseUser.getToken().then(function(idToken){
          $http({
            method: 'GET',
            url: '/privateData',
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            self.secretData = response.data;
          });
        });
      } else {
        console.log('Not logged in or not authorized.');
        self.secretData = "You are not authorized to view this content. Please log in.";
      }
    });
  
    // This code runs when the user logs out
    self.logOut = function(){
      // OG sign out method below.
      // auth.$signOut().then(function(){
      //   console.log('Logging the user out!');
      // });
      self.deleteAllCookies();
      // new sign out method below.
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('log out successful!');
      }).catch(function(error) {
        // An error happened.
        console.log('error logging the user out with google!', error);
      });
    };

    self.deleteAllCookies = function () {
      var cookies = document.cookie.split(";");
  
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
  }
  });
  