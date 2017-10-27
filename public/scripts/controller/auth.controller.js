myApp.controller("AuthController", function($firebaseAuth, $http) {
    console.log('In AuthController!');
    
    const auth = $firebaseAuth();
    const self = this;
  
    // This code runs whenever the user logs in
    self.logIn = () => {
      auth.$signInWithPopup("google").then((firebaseUser) => {
        console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      }).catch(function(error) {
        console.log("Authentication failed: ", error);
      });
    };

    // This code runs whenever the user changes authentication states
    // e.g. whevenever the user logs in or logs out
    // this is where we put most of our logic so that we don't duplicate
    // the same things in the login and the logout code
    auth.$onAuthStateChanged((firebaseUser) => {
      // firebaseUser will be null if not logged in
      if(firebaseUser) {
        // This is where we make our call to our server
        firebaseUser.getToken().then((idToken) => {
          $http({
            method: 'GET',
            url: '/privateData',
            headers: {
              id_token: idToken
            }
          }).then((response) => {
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
      auth.$signOut().then(function(){
        console.log('Logging the user out!');
      // });
      // new sign out method below.
      // firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('log out successful!');
      }).catch((error) => {
        // An error happened.
        console.log('error logging the user out with google!', error);
      });
    };
  });
  