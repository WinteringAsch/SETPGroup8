//DB를 컨트롤하는 함수들을 모아놓을 예정입니다
function InitUserDB() {
    email = user.email;
    var id = email.split('@');
    
    firebase.database().ref('/users/' + id[0]).once('value', function (snapshot) {
        if (snapshot.val() == null) {
            firebase.database().ref('/users/' + id[0]).set({
                userID: user.email
            });
        }
    });
}

function getUser() {
    $("#userList").html("");
   
    firebase.database().ref('/users/').once('value', function (snapshot) {
        var num = 1;
        snapshot.forEach(function (childSnapshot) {
            var name = childSnapshot.key;
            var id = childSnapshot.child("userID").val();
            var tag = "<tr><td>" + num + "</td><td>" + name + "</td><td>" + id + "</td><tr>";
            $("#userList").append(tag);
            num++;
        });
    });
}