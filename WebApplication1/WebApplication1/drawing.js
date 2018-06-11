////////드로잉함수
document.write("<script src='DBHandler.js'></script>");

function publicProjectDrawing(num) {
    window.alert(num);
    $(document).ready(function () {
        var ImageSize = { width: 489, height: 369 };
        var ImageBound = { x: 0, y: 0, width: ImageSize.width, height: ImageSize.height };
        var newImage = new Image();
        firebase.database().ref("publicProject/" + num).on('value', function (snapshot) {
            newImage.src = snapshot.val();      // Modify this part to change file
        });

        var lc = LC.init(document.getElementById("lc-public" + num), {
            backgroundShapes: [LC.createShape('Image', { x:0, y:0, image: newImage })],
            imageSize: ImageSize,
            imageURLPrefix: 'LC/_assets/lc-images',
            toolbarPosition: 'bottom',
            defaultStrokeWidth: 3,
            strokeWidths: [1, 2, 3, 5, 10, 15, 20, 30]
        });

        //lc.saveShape(LC.createShape('Image', { x: 0, y: 0, image: newImage })); // 그림의 일부로 배경

        var JSONstring;
        $('.controls.export [data-action=export-as-PNG]').click(function (e) {
            e.preventDefault();
            JSONstring = JSON.stringify(lc.getSnapshot({ rect: ImageBound }));
            firebase.database().ref("publicProject/" + num).set(lc.getImage({ rect: ImageBound }).toDataURL());
        });
        $('.controls.export [data-action=import-as-PNG]').click(function (e) {
            e.preventDefault();
            lc.loadSnapshot(JSON.parse(JSONstring));
        });
    });

}

function publicProjectCllick(num) {
    location.href = "publicProject.html?ppnum=" + num;
}


