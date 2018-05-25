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
    const txtEmail = document.getElementById('Email');
    const txtPassword = document.getElementById('passwordinput');
    const btnLogin = document.getElementById('signin');
    const btnSignUp = document.getElementById('confirmsignup');
    const btnLogout = document.getElementById('btnLogout');

    //Add login event
    btnLogin.addEventListener('click', e => {
        //Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    //Add signup event
    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);

        promise
            .catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();

    });


    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            //btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
            //btnLogout.classList.add('hide');
        }

    });

}());