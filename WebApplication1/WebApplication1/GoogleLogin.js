//구글 로그인이 이루어지는 함수입니다. 앞으로 변경사항은 없을것입니다

document.write("<script src='DBHandler.js'></script>");


function Login_click() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        $("#emailbox").html(user.email + " 환영합니다"); //페이지 상단 이메일 출력
        sessionStorage.setItem('user', user.email); //로그인받은정보 유지를 위해 세션에 아이디 입력
        InitUserDB(); //유저디비
        // ...
    }).catch(function (error) {
        //window.alert("Login failed");
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
        $("#emailbox").html(""); //페이지 상단에 이메일텍스트 삭제
        logstate = false;
        sessionStorage.removeItem('user'); //로그아웃시 세션에서도 아이디 삭제
    }).catch(function (error) {
        // An error happened.
        window.alert("Log out failed");
    });
}