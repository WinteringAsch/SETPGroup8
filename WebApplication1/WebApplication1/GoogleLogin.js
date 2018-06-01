(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCXArk4doKAhkI2nTJ5mvJq--6Oak1Pbk0",
        authDomain: "coloride1.firebaseapp.com",
        databaseURL: "https://coloride1.firebaseio.com",
        projectId: "coloride1",
        storageBucket: "coloride1.appspot.com",
        messagingSenderId: "380923923080"
    };
    firebase.initializeApp(config);

    //Get elements
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');
    var provider = new firebase.auth.GoogleAuthProvider();


    //database test
    var database = firebase.database();

    //Add login event
    btnLogin.addEventListener('click', e => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            window.alert(user.email);
     
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            window.alert("Sign-out successful.");
        }).catch(function (error) {
            // An error happened.
            window.alert("An error happened");
        });

    });

    
}());