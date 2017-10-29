myApp.service('AuthService', function ($firebaseAuth, $http) {

    const sv = this;
    const auth = $firebaseAuth();
    sv.user = firebase.User; //firebase.auth().currentUser;
  
    sv.logIn = () => {
      auth.$signInWithPopup("google")
      .then((firebaseUser) => {
        console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      }).catch(function(error) {
        console.log("Authentication failed: ", error);
      });
    }; // end logIn

    // This code runs whenever the user changes authentication states
    // e.g. whevenever the user logs in or logs out
    // this is where we put most of our logic so that we don't duplicate
    // the same things in the login and the logout code
    auth.$onAuthStateChanged((firebaseUser) => {
      // firebaseUser will be null if not logged in
      if(firebaseUser) {
        // This is where we make our call to our server
        firebaseUser.getToken()
        .then((idToken) => {
          $http({
            method: 'GET',
            url: '/privateData',
            headers: {
              id_token: idToken
            }
          }).then((response) => {
            sv.secretData = response.data;
          });
        });
      } else {
        console.log('Not logged in or not authorized.');
        sv.secretData = "You are not authorized to view this content. Please log in.";
      }
    }); // end auth.$onAuthStateChanged(
  
    sv.logOut = () => {
      auth.$signOut()
      .then(() => {
        console.log('Logging the user out!');
      })
      .catch((error) => {
        console.log('error logging the user out with google!', error);
      });
    }; // end logOut

});