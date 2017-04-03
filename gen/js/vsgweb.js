$(function () {
    $('[data-toggle="tooltip"]').tooltip();


    //    GET URL PARAMETER
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    
    var admin = getUrlParameter('admin');
    if (admin) $(".adminShow").css("display","block");


})

/* USER OPTIONS */
$("#download").click(function () {

    JSZipUtils.getBinaryContent("demo.html", function (err, data) {


        if (err) throw err;
        //var zip = new JSZip();
        //zip.file("picture.png", data);

        //var css = $("#css_result").val();
        var css = csso.minify($("#css_result").val()).css;
        //var js = $("#src-js").val();

        var zip = new JSZip();

        var vsgfolder = zip.folder("vsg-Skin-Generator");

        // vsgfolder.file("index.html", html);
        vsgfolder.file("demo.html", data);
        vsgfolder.file("vsg-skin.css", css);
        //zip.file("script.js", js);

        var content = vsgfolder.generate({
            type: "blob"
        });

        // see FileSaver.js
        saveAs(content, "vsg-Skin-Generator.zip");


    });

});

$("#minify").click(function () {

    var css = $("#css_result").val();
    var compressedCss = csso.minify(css).css;
    $("#css_result").val(compressedCss);

    //$("#css_result").val(csso.minify($("#css_result").val()).css);

});


/* JSONIFY FORM */
$("#getform").click(function (e) {

    e.preventDefault();

    var jsonify = $(".formtocss").jsonify({
        stringify: true
    });

    $("#populateform").val(jsonify);

});

$("#fillform").click(function () {

    var skinRadio = $("#chooseSkin input[type=radio]:checked").val();
    //alert(skinRadio);

    var json = $("#populateform").val();

    $(".formtocss").dejsonify(json);

    setTimeout(function () {
        reloadAll('full');
    }, 0);

});
/* JSONIFY END */
