/**** CALL fortoCSS PLUGIN ****/
//        $(".formtocss").formtoCSS({
//            target: '.vsg-player',
//            targetShow: true,
//            addcss: morecss, // add more css from #addcss hidden textarea
//            output: '#css_result'
//        });

var h = window.innerHeight - 110;
if (h) $('#vsg-scroll').css("height", h);


/*******************************/
/* BOOTSTRAP COLOR PICKER - https://mjolnic.com/bootstrap-colorpicker */
jQuery(function ($) {


    // Create skins prebuild select
    var stringified = JSON.stringify(getskins);
    console.log(stringified);
    stringified = stringified.replace(/:skip/g, "")

    var jsonObject = JSON.parse(stringified);

    $.each(jsonObject, function (i, item) {

        if (i === 0) $("#skinselect").append('<option selected value="VSG">PREBUILD SKINS</option>');

        $("#skinselect").append('<option value="' + item.skin + '">' + item.skin + '</option>');

    });
    /*****************/


    $('#skinselect').on('change', function () {
        //alert(this.value); // or $(this).val()

        var selected = this.value;

        var stringified = JSON.stringify(getskins);

        //stringified = stringified.replace(":skip", "");	
        stringified = stringified.replace(/skin:skip/g, "skin")

        //console.log(stringified);

        var jsonObject = JSON.parse(stringified);

        $.each(jsonObject, function (i, item) {
            //alert(item.skin);
            //alert([item.skin:skip]);

            if ((item.skin === selected)) {

                //alert(selected);

                setTimeout(function () {
                    $(".formtocss").dejsonify(item);
                    //$("#populateform").val(JSON.stringify(item));
                }, 0);

                setTimeout(function () {
                    reloadAll('full');
                }, 100);
                console.log(item);

            }


        });


    });
    

    //            // CODE MIRROR
    //            var readOnlyCodeMirror = CodeMirror.fromTextArea(document.getElementById('css_result'), {
    //                mode: "css",
    //                theme: "dracula",
    //                lineNumbers: true
    //            });

    /****************/



    $('#vsg-reset').click(function () {
        //alert(this.id);

        var resetAll = confirm("Are you sure you want to reset all form?");

        if (resetAll) {

            //var json = '{"skin:skip":"Reset","vsg-skins:skip":"default",".vjs-control-bar2[background-color]":"#000000",".vjs-control-bar[background-color]:important":"",".vjs-control-bar[color]":"",".vjs-play-progress| .vjs-volume-level[background-color]":"",".vjs-control-bar[font-size]:px":"10",".vjs-big-play-button[background-color]":"","@hover .vjs-big-play-button|.vjs-big-play-button@focus|.vjs-big-play-button@active[background-color]":"",".vjs-big-play-button[font-size]:em":"3",".vjs-big-play-button[border-radius]:percent":"12",".vjs-big-play-button[height]:emimportant":"1.7",".vjs-big-play-button[line-height]:emimportant":"1.7",".vjs-big-play-button[margin-top]:emimportant":"-0.85","radius:skip":"1.7",".vjs-loading-spinner[border-color]":"","customcss:skip":""}';

            //$(".formtocss").dejsonify(json);
            // reloadAll('full');

            //console.log(getskins);

            $('#skinselect').selectpicker('val', 'Reset');

            var stringified = JSON.stringify(getskins);
            stringified = stringified.replace(/skin:skip/g, "skin")

            //console.log(stringified);

            var jsonObject = JSON.parse(stringified);


            $.each(jsonObject, function (i, item) {
                //alert(item.skin);
                //alert([item.skin:skip]);

                if ((item.skin === 'Reset')) {

                    setTimeout(function () {
                        $(".formtocss").dejsonify(item);
                        //$("#populateform").val(JSON.stringify(item));
                    }, 0);

                    setTimeout(function () {
                        reloadAll('full');
                    }, 100);
                    console.log(item);

                }

            });


        }


    });


    /* BOOTSTRAP SLIDER - http://seiyria.com/bootstrap-slider */

    //$('.slider').slider(); // initialize All, bug
    $('.slider').slider();


    $("#vsg-buttonsize").slider();
    $("#vsg-buttonsize").on("slide", function (slideEvt) {
        $("#vsg-buttonsizeVal").text(slideEvt.value);
        //$(".video-js .vjs-control-bar").css("font-size", slideEvt.value + "px");

    });

    $("#vsg-buttonRadius").slider();
    $("#vsg-buttonRadius").on("slide", function (slideEvt) {
        $("#vsg-buttonRadiusVal").text(slideEvt.value);
        //$(".video-js .vjs-control-bar").css("font-size", slideEvt.value + "px");
    });

    $("#vsg-big-play-size").slider();
    $("#vsg-big-play-size").on("slide", function (slideEvt) {
        $("#vsg-big-play-sizeVal").text(slideEvt.value);
        //$(".video-js .vjs-control-bar").css("font-size", slideEvt.value + "px");
    });


    $("#vsg-big-play-height").slider();
    $("#vsg-big-play-height").on("slide", function (slideEvt) {
        $("#vsg-big-play-heightVal").text(slideEvt.value);
        $("#vsg-big-play-height-hidden,#vsg-big-play-line-height-hidden").val(slideEvt.value);
        var playTop = slideEvt.value / 2
        $("#vsg-big-play-top-hidden").val('-' + playTop);
        //$(".video-js .vjs-control-bar").css("font-size", slideEvt.value + "px");
    });

    $("#buttonSpace").slider();
    $("#buttonSpace").on("slide", function (slideEvt) {
        $("#buttonSpaceVal").text(slideEvt.value);
        //$(".video-js .vjs-control-bar").css("font-size", slideEvt.value + "px");
    });

    /***************/

    /* Control - BOOTSTRAP COLOR PICKER */

    $('input[type="color"]').each(function (i) {
        var colorid = $(this).attr('data-colorid')
        $(this).wrapAll('<div id="' + colorid + '" class="bs-colorpicker input-group colorpicker-component"></div>').attr("type", "text").after('<span class="input-group-addon"><i></i></span>');
    });

    //$('.bs-colorpicker').colorpicker();

    $('.bs-colorpicker:not(#vsg-cont-color)').colorpicker().on('changeColor', function (e) {
        //$(this).keyup
        $(".formtocss input:first").keyup();
    });


    $('#vsg-cont-color').colorpicker().on('changeColor', function (e) {
        //$(this).keyup
        $("#cont-bcolor").val(e.color.toHex());
        $(".formtocss input:first").keyup();
        //$(".video-js .vjs-control-bar").css("background-color", e.color.toHex()).css("background-color", e.color);
        //$(".video-js .vjs-control-bar").css("background-color", e.color.toHex()); // Brownser compatibility
        //$(".video-js .vjs-control-bar").css("background-color", e.color);
    });

    $('#vsg-progress').colorpicker().on('changeColor', function (e) {
        $(".formtocss input:first").keyup();
    });

    //$(".formtocss input:first").keyup();


});
// jQuery functions $


/* VIDEOJS */
// declare object for video
var vgsPlayer;
videojs("vid1").ready(function () {
    vgsPlayer = this;
});

/* Flush videojs html */
//        var oldPlayer = document.getElementById('vid1');
//        videojs(oldPlayer).dispose();

jQuery(document).ready(function ($) {


    //            videojs("vid1").ready(function() {
    //                var myPlayer = this;
    //                myPlayer.on("pause", function() {
    //                    myPlayer.bigPlayButton.show();
    //                });
    //                myPlayer.on("play", function() {
    //                    myPlayer.bigPlayButton.hide();
    //                });
    //            });


    /*******************/
    $('#chooseSkin input:radio').on('change', function () {
        //$('#chooseSkin input[type=radio]').on('change', function() {

        var radioval = $(this).val();
        //alert(radioval);

        switch (radioval) {
            case 'vsg':
                //$('.video-js').toggleClass("vsg-player");
                //$('.video-js').addClass("vsg-player");
                //loadformtocss()
                break;
            case 'default':
                //$('.video-js').removeClass("vsg-player");
                //loadformtocss()
                break;
            case 'last':
                alert("Store in cookies and variable");
                break;
        }
    });


    /* Show Poster on end - Do not work with Youtube - if not youtube url */
    //            var vid = videojs("vid1");
    //            vid.on("ended", function() {
    //                    vid.posterImage.show();
    //                    vid.bigPlayButton.show();
    //                    vid.currentTime(0);
    //                })
    /**************************************/

    //$('.video-js').toggleClass("vsg-player");
    //$(document).find(".video-js").toggleClass("vsg-player");

    //                $('.video-js').toggleClass("vsg-player");
    //
    //                setTimeout(
    //                    function() {
    //                        $(document).find(".vsg-player").removeClass("vsg-player");
    //                        //$('.video-js').toggleClass("vsg-player");
    //                    }, 1000);

    /* ADD REMOVE STYLE HEADER */

    //                var style = $("<style />", {
    //                    id: 'myStyleTag',
    //                    type: 'text/css',
    //                    html: "#my_element_" + MaxElements + " {" + xCSSCode + "}"
    //                }).appendTo("head");

    //style.remove();
    // or
    //$('#myStyleTag').remove();

    /***************************************************************/

    $("#vsg-loadvideo").submit(function (e) {
        e.preventDefault();

        var vidURL = $("#vsg-vurl").val();

        vsgLoadVideo(vidURL.trim());

    });

    $('#vidlink a').on('click', function (e) {
        e.preventDefault();
        var vidlink = $(this).attr('href');
        vsgLoadVideo(vidlink);
        $('#vsg-vurl').val(vidlink);
    });
    
    
            var bothcss = ".video-js .vjs-menu-button-inline.vjs-slider-active,.video-js .vjs-menu-button-inline:focus,.video-js .vjs-menu-button-inline:hover,.video-js.vjs-no-flex .vjs-menu-button-inline{width:10em}.video-js .vjs-controls-disabled .vjs-big-play-button{display:none!important}.video-js .vjs-control{width:3em}.video-js .vjs-menu-button-inline:before{width:1.5em}.vjs-menu-button-inline .vjs-menu{left:3em}.vjs-paused.vjs-has-started.video-js .vjs-big-play-button,.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button{display:block}.video-js .vjs-load-progress div,.vjs-seeking .vjs-big-play-button,.vjs-waiting .vjs-big-play-button{display:none!important}.video-js .vjs-mouse-display:after,.video-js .vjs-play-progress:after{padding:0 .4em .3em}  .video-js.vjs-ended .vjs-loading-spinner {display: none;} .video-js.vjs-ended .vjs-big-play-button {display: block !important;}";


    $(".formtocss").formtoCSS({
        target: '.video-js', // target: '.vsg-player',
        targetShow: true,
        prefix: false,
        addcss: bothcss, // add more css from #addcss hidden textarea
        output: '#css_result'
    });
    
    reloadAll();


    /* function */

    function vsgLoadVideo(vidURL) {

        if (ytVidId(vidURL) !== false) {
            var ext = "youtube"
            console.log('Youtube');

            // alert(getId(vidURL)) // Youtube video ID
            //var yvID = getId(vidURL);
            //vidURL = "https://www.youtube.com/watch?v="+yvID;

        } else {

            //$("#vid1 iframe, #vid1 .vjs-iframe-blocker").remove();

            var ext = vidURL.split('.').pop();
            ext = removeParam(ext);
          
            if (ext == "m4v" || ext == "m4a" || ext == "m4vh") ext = "mp4";
            if (!ext) ext = "mp4";
        }

        console.log(ext);

        vgsPlayer.src({
            //"techOrder": ['youtube'],
            "type": "video/" + ext,
            "src": vidURL
        });
        vgsPlayer.play();

    }


    function ytVidId(url) {
        var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false;
    }

    /**/
    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    // Remove param
    function removeParam(url) {
        var value = url.substring(url.lastIndexOf('/') + 1);
        //get the part after before ?
        value = value.split("?")[0];
        return value;
    }

    /*******/

    $("#vsg-spinner-color").click(function () {

        //alert('pause');

        $(".video-js")[0].player.pause().currentTime(0);

        setTimeout(
            function () {
                $(".video-js")[0].player.currentTime(0);
            }, 100);

        //$(".video-js")[0].player.currentTime(0);

        //                var myPlayer = VideoJS.setup("vid1");
        //                myPlayer.pause();
    });


});


/********* FUNCTIONS ***********/


function reloadAll(reload) {

    //console.log('Reloaded');

    if (reload === "full") {

        $(".formtocss input").keyup();
        $(".formtocss input.slider").each(function () {
            thisval = $(this).val();
            $(this).slider('setValue', parseFloat(thisval)).next('span').text(thisval);
            //$(".slider").slider('setValue', 5);
        });

    } else {

        $(".formtocss input:first").keyup();

    }

}
