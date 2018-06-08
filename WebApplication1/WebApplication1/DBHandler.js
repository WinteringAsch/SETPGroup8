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

function getProject() {
    $("#projectList").html("");

    firebase.database().ref('/publicProject/').once('value', function (snapshot) {
        var num = 1;
        snapshot.forEach(function (childSnapshot) {
            var title = childSnapshot.child('title').val();
            var start_date = childSnapshot.child('startDate').val();
            var end_date = childSnapshot.child('endDate').val();
            var tag = "<tr><td>" + num + "</td><td>" + title + "</td><td>" + start_date + " ~ " + end_date + "</td></tr>"
            $("#projectList").append(tag);
            num++;
        });

    });

}

function projectAdd() {
    var projectTitle = $("#projectAdd_title").val();
    var project_start_date = $("#projectAdd_start_date").val();
    var project_end_date = $("#projectAdd_end_date").val();
   // var project_image = $("#projectAdd_fileToUpload").val();

    var newProjectRef = firebase.database().ref('publicProject').push();
    newProjectRef.set({
        title: projectTitle,
        startDate: project_start_date,
        endDate: project_end_date,
        //imageName: project_image
    });
    window.alert("추가가 완료되었습니다");
}

function hi() {
    var storageRef = firebase.storage().ref();
    storageRef.child("pp1.png").getDownloadURL().then(function (url) {
        $("#related1").attr('src', url);
    });
    storageRef.child("pp2.png").getDownloadURL().then(function (url) {
        $("#related2").attr('src', url);
    });
    storageRef.child("pp3.png").getDownloadURL().then(function (url) {
        $("#related3").attr('src', url);
    });
    storageRef.child("pp4.png").getDownloadURL().then(function (url) {
        $("#related4").attr('src', url);
    });
}