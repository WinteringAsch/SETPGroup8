////////드로잉함수
document.write("<script src='DBHandler.js'></script>");

function publicProjectDrawing() {
    
    $(document).ready(function () {
        var lc = LC.init(document.getElementById("lc"), {
            imageURLPrefix: 'LC/_assets/lc-images',
            toolbarPosition: 'bottom',
            defaultStrokeWidth: 2,
            strokeWidths: [1, 2, 3, 20, 30]
        });
        var newImage = new Image()
        newImage.src = "https://firebasestorage.googleapis.com/v0/b/coloride1.appspot.com/o/pp1.png?alt=media&token=f130971e-5725-4563-b996-25f4e0974560"; // Modify this part to change file
        lc.saveShape(LC.createShape('Image', { x: 10, y: 10, image: newImage }));
        var JSONstring;
        $('.controls.export [data-action=export-as-JSON]').click(function (e) {
            e.preventDefault();
            JSONstring = JSON.stringify(lc.getSnapshot());
            alert(JSON.stringify(lc.getSnapshot()));
        });
        $('.controls.export [data-action=import-as-JSON]').click(function (e) {
            e.preventDefault();
            lc.loadSnapshot(JSON.parse(JSONstring));
        });
    });

}