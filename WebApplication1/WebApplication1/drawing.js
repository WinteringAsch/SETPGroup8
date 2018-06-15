////////드로잉함수
document.write("<script src='DBHandler.js'></script>");

//Public Project 함수
function publicProjectDrawing(num) {
    $(document).ready(function () {
        var ImageSize = { width: 489, height: 369 };
        var ImageBound = { x: 0, y: 0, width: ImageSize.width, height: ImageSize.height };
        var newImage = new Image();
        
        firebase.database().ref("publicProject/" + num).on('value', function (snapshot) { //디비에 저장되어있는 값을 불러서 캔버스 백그라운드에 넣어줌
            newImage.src = snapshot.val();      // Modify this part to change file
        });

        var lc = LC.init(document.getElementById("lc-public"), { // Literally Canvas 초기화
            backgroundShapes: [LC.createShape('Image', { x:0, y:0, image: newImage })],
            imageSize: ImageSize,
            imageURLPrefix: 'LC/_assets/lc-images',
            toolbarPosition: 'bottom',
            defaultStrokeWidth: 3,
            strokeWidths: [1, 2, 3, 5, 10, 15, 20, 30]
        });


        var JSONstring;
        $('.controls.export [data-action=export-as-PNG]').click(function (e) { // 버튼을 통한 저장 함수
            window.alert("그림이 저장되었습니다");
            e.preventDefault();
            JSONstring = JSON.stringify(lc.getSnapshot({ rect: ImageBound }));
            firebase.database().ref("publicProject/" + num).set(lc.getImage({ rect: ImageBound }).toDataURL()); //디비에 저장
        });
    });

}

function publicProjectCllick(num) {
    location.href = "publicProject.html?ppnum=" + num;
}

function privateProjectClick(num) {
    location.href = "privateProject.html?pnum=" + num;
}

//Private Project 함수
function privateProjectDrawing(num) {
    $(document).ready(function () {
        var ImageSize = { width: 489, height: 369 };
        var ImageBound = { x: 0, y: 0, width: ImageSize.width, height: ImageSize.height };
        var newImage = new Image();


        var id = $("#emailbox").html().split('@');
        if (id[0] != '') { //로그인상태일때 디비에 저장된 이미지 불러오기
            firebase.database().ref("users/" + id[0]).once('value', function (snapshot) {
                if (snapshot.hasChild(num)) {
                    var temp = snapshot.child(num).val();
                    newImage.src = temp;
                } else {
                    var temp = "images/gallery/gallery" + num + ".png";
                    newImage.src = temp;
                }
            });
        } else {//비로그인상태일때는 서버 폴더의 이미지 불러오기
            var temp = "images/gallery/gallery" + num + ".png";
            newImage.src = temp;
        }

        var lc = LC.init(document.getElementById("lc-private"), { // Literally Canvas 초기화
            backgroundShapes: [LC.createShape('Image', { x: 0, y: 0, image: newImage })],
            imageSize: ImageSize,
            imageURLPrefix: 'LC/_assets/lc-images',
            toolbarPosition: 'bottom',
            defaultStrokeWidth: 3,
            strokeWidths: [1, 2, 3, 5, 10, 15, 20, 30]
        });


        var JSONstring;
        $('.controls.export [data-action=export-as-PNG]').click(function (e) { //버튼을 통한 저장 기능
            e.preventDefault();
            JSONstring = JSON.stringify(lc.getSnapshot({ rect: ImageBound }));
            var id = $("#emailbox").html().split('@');
            if (id[0] == '')
                window.alert("로그인을 안하시면 저장이 안됩니다");
            else {
                firebase.database().ref("users/"+id[0]+"/"+num).set(lc.getImage({ rect: ImageBound }).toDataURL());
                window.alert("저장 완료");
            }
        });
    });
}

function recommendColor() { //색상 추천 함수
    if ($('#inlineRadio1:checked').val()) {
        window.alert("초록색이 좋겠군요!");
    } else if ($('#inlineRadio2:checked').val()) {
        window.alert("파란색이 좋겠군요!");
    } else if ($('#inlineRadio3:checked').val()) {
        window.alert("분홍색이 좋겠군요!");
    } else if ($('#inlineRadio4:checked').val()) {
        window.alert("빨강색이 좋겠군요!");
    }

}

function customRequestSubmit() {
    window.alert("Submitted. Thank you for your interest.");
}

function initGallery(num) { //Private Project 캔버스 초기화 함수
    $(document).ready(function () {
        var ImageSize = { width: 489, height: 369 };
        var ImageBound = { x: 0, y: 0, width: ImageSize.width, height: ImageSize.height };
        var newImage = new Image();

        var id = $("#emailbox").html().split('@');
 
        var temp = "images/gallery/gallery" + num + ".png"; //로컬에 저장되어있는 기본이미지룰 덮어씌워서 이미지 초기화를 시킴
        newImage.src = temp;
        
        var lc = LC.init(document.getElementById("lc-private"), {
            backgroundShapes: [LC.createShape('Image', { x: 0, y: 0, image: newImage })],
            imageSize: ImageSize,
            imageURLPrefix: 'LC/_assets/lc-images',
            toolbarPosition: 'bottom',
            defaultStrokeWidth: 3,
            strokeWidths: [1, 2, 3, 5, 10, 15, 20, 30]
        });
        var JSONstring;
        $('.controls.export [data-action=export-as-PNG]').click(function (e) {
            e.preventDefault();
            JSONstring = JSON.stringify(lc.getSnapshot({ rect: ImageBound }));
            var id = $("#emailbox").html().split('@');
            if (id[0] == '') {

            }
            else {
                firebase.database().ref("users/" + id[0] + "/" + num).set(lc.getImage({ rect: ImageBound }).toDataURL());
            }
        });
    });
}

function initPublicProject(num) { // Public Project 캔버스 초기화 함수
    $(document).ready(function () {
        var ImageSize = { width: 489, height: 369 };
        var ImageBound = { x: 0, y: 0, width: ImageSize.width, height: ImageSize.height };
        var newImage = new Image();

        var str = "images/sample" + num + ".png";
        newImage.src = str; 

        var lc = LC.init(document.getElementById("lc-public"), {
            backgroundShapes: [LC.createShape('Image', { x: 0, y: 0, image: newImage })],
            imageSize: ImageSize,
            imageURLPrefix: 'LC/_assets/lc-images',
            toolbarPosition: 'bottom',
            defaultStrokeWidth: 3,
            strokeWidths: [1, 2, 3, 5, 10, 15, 20, 30]
        });


        var JSONstring;
        $('.controls.export [data-action=export-as-PNG]').click(function (e) {
            e.preventDefault();
            JSONstring = JSON.stringify(lc.getSnapshot({ rect: ImageBound }));
            firebase.database().ref("publicProject/" + num).set(lc.getImage({ rect: ImageBound }).toDataURL());
        });
    });

}