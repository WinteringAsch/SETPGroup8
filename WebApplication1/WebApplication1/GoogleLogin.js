//구글 로그인이 이루어지는 함수입니다. 앞으로 변경사항은 없을것입니다

document.write("<script src='DBHandler.js'></script>");

var user;
function Login_click() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        $("#emailbox").html(user.email + " 환영합니다");
        InitUserDB(); //유저디비
        // ...
    }).catch(function (error) {
        window.alert("Login failed");
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function Logout_click() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.alert("Log out success");
        $("#emailbox").html("");
        logstate = false;
    }).catch(function (error) {
        // An error happened.
        window.alert("Log out failed");
    });
}