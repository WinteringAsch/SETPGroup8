﻿//DB를 컨트롤하는 함수들을 모아놓을 예정입니다

//만약 유저가 처음 로그인을 한 것이라면 디비에 넣어준다
function InitUserDB() {
    email = user.email;
    var id = email.split('@');
    
    firebase.database().ref('/users/' + id[0]).once('value', function (snapshot) { //디비에서 이미 로그인한 정보가 있는지 확인하고 처음 로그인하는 유저에 대해 디비에 초기값을 넣어줌
        if (snapshot.val() == null) {
            firebase.database().ref('/users/' + id[0]).set({
                userID: user.email
            });
        }
    });
}
//admimpage의 유저리스트를 출력하는 함수
function getUser() {
    $("#userList").html("");
   
    firebase.database().ref('/users/').once('value', function (snapshot) { //
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

//adminpage의 프로젝트리스트를 출력하는 함수
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
//adiminpage의 프로젝트추가버튼을 눌렀을 때 디비에 추가시키는 함수
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

//Related projet이미지를 보여주는 함수
function showRelatedProject() {
    var storageRef = firebase.storage().ref();
    storageRef.child("pp1.png").getDownloadURL().then(function (url) {  //각각 디비에 저장되어있는 값을 불러서 이미지출력
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

//채팅창에 채팅텍스트 출력하는 함수
function chat() {
    firebase.database().ref("chat").on('value', function (snapshot) {
        $("#chatBox").append("\n[" + snapshot.child("id").val() + "] : " + snapshot.child("text").val());
    });
}

//채팅메시지를 디비에 보내는 함수
function chatSend() {
    var id = sessionStorage.getItem('user');
    if ($("#emailbox").html() != '') {
        firebase.database().ref("chat/id").set(id);
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

//public project의 이미지를 보여주는 함수
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

//혼자그리기를 들어갔을 때 그림을 보여주는 함수
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