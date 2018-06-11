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

function showRelatedProject() {
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

function chat() {
    firebase.database().ref("chat").on('value', function (snapshot) {
        $("#chatBox").append("\n[" + snapshot.child("id").val() + "] : " + snapshot.child("text").val());
    });
}

function chatSend() {
    if ($("#emailbox").html() != '') {
        firebase.database().ref("chat/id").set(user.email);
        var text = $("#chatInput").val();
        $("#chatInput").val('');
        firebase.database().ref("chat/text").set(text);
    } else {
        firebase.database().ref("chat/id").set("비로그인");
        var text = $("#chatInput").val();
        $("#chatInput").val('');
        firebase.database().ref("chat/text").set(text);
    }
}

function showPublicProject() {
    var storageRef = firebase.storage().ref();

    firebase.database().ref().on('value', function (snapshot) {
        $("#publicProject1").attr('src', snapshot.child("publicProject/1").val());
    });
    firebase.database().ref().on('value', function (snapshot) {
        $("#publicProject2").attr('src', snapshot.child("publicProject/2").val());
    });
    firebase.database().ref().on('value', function (snapshot) {
        $("#publicProject3").attr('src', snapshot.child("publicProject/3").val());
    });
    firebase.database().ref().on('value', function (snapshot) {
        $("#publicProject4").attr('src', snapshot.child("publicProject/4").val());
    });

}

function showGalleryImages() {
    $("#gallery1").attr('src', "images/gallery/gallery1.png");
    $("#gallery2").attr('src', "images/gallery/gallery2.png");
    $("#gallery3").attr('src', "images/gallery/gallery3.png");
    $("#gallery4").attr('src', "images/gallery/gallery4.png");
    $("#gallery5").attr('src', "images/gallery/gallery5.png");
    $("#gallery6").attr('src', "images/gallery/gallery6.png");
    $("#gallery7").attr('src', "images/gallery/gallery7.png");
    $("#gallery8").attr('src', "images/gallery/gallery8.png");
    $("#gallery9").attr('src', "images/gallery/gallery9.png");
    $("#gallery10").attr('src', "images/gallery/gallery10.png");
    $("#gallery11").attr('src', "images/gallery/gallery11.png");
    $("#gallery12").attr('src', "images/gallery/gallery12.png");

}