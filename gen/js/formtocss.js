/**
 * FORM TO CSS
 * Converts FORM to CSS.
 * Version 0.1
 *
 * Released under the MIT license.
 *
 * Copyright (c) 2016 Gino Cote, http://softplug.com/
 *
 * Github, https://github.com/onigetoc/FormToCSS/

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions
 of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
(function ($) {

    $.fn.formtoCSS = function (options) {

        // This is the easiest way to have default options.
        var opts = $.extend({
            // These are the defaults.
            target: '', // target effected selector, single or multiple selector(s)
            targetShow: false, // show target selector in css result ex: #mytargetdiv
            output: '', // output CSS results, single or multiple selector(s)
            adcss: '', // // add more css from selector hidden textarea
            beautify: true,
            prefix: true, // css3 webkit, moz
            header: true // add css to header in realtime
        }, options);

        var elem = $(this);
        var elemSelector = elem.selector;

        // $(elemSelector + " textarea, input," + elemSelector + " select").on("change keyup paste", function () {
        $(elemSelector + " input," + elemSelector + " select," + elemSelector + " textarea").on("change keyup paste", function () {
            FormToJSON();
        });

        $(elemSelector + " input[type=range]").on("mousemove", function () {
            FormToJSON();
        });

        FormToJSON(elem);
        //FormToJSON(elem); work even if elem not there?
        //if (opts.onload === true) {
        //  FormToJSON();
        //}

        if (opts.header === true) {
            return $('<style id="formtocss-styles">').prop("type", "text/css").appendTo("head");
        }

        /* FUNCTION FORM TO JSON jquery.serializeJSON plugin */
        /* https://github.com/marioizquierdo/jquery.serializeJSON */
        function FormToJSON(obj) {

            var ftcssfunction = function (val, inputName) {
                if (val === "") return null; // parse empty strings as nulls
                //if (val === "1")  return val+'px'; // parse 0 as null

                //if (!isNaN(val)) return val + 'px'; // parse 0 as null
                //return val;

                if (val === '0px') return 0; // MARCHE PAS

                //console.log(inputName)
                //console.log(val)

                return val;

            };

            var obj = elem.serializeJSON({
                parseWithFunction: ftcssfunction,
                customTypes: {
                    px: function (str) { // value is always a string
                        return str + "px";
                    },
                    em: function (str) { // value is always a string
                        return str + "em";
                    },
                    percent: function (str) { // value is always a string
                        return str + "%";
                    },
                    important: function (str) { // value is always a string
                        return str + " !important";
                    },
                    pximportant: function (str) { // all strings will now end with " override"
                        return str + "px !important";
                    },
                    emimportant: function (str) { // all strings will now end with " override"
                        return str + "em !important";
                    },
                    percentimportant: function (str) { // all strings will now end with " override"
                        return str + "% !important";
                    }
                }

            });

            console.log(obj);
            console.log(JSON.stringify(obj));


            if (opts.target) {

                Object.keys(obj).forEach(function (key) {
                    //console.log(key + ': ' + obj[key]);
                    //console.log(key.replace(key, "#mainID "+ key));  
                    //key = key.replace(/\|/g, "|#mainID "+ key);
                    var newkey = opts.target + " " + key;
                    obj[newkey] = obj[key];
                    delete obj[key];
                });

            }

            //var targetbody = opts.target + " body";

            // GC .replace Object to CSS
            var css;
            css = JSON.stringify(obj);
            css = css.slice(1, -1);
            css = css.replace(/"/g, "")
                //.replace(/bar2/g, "bar") // replace duplicate hidden test
                .replace(/,/g, ";")
                .replace(/\s+\@/g, ':') // special replace @ and whitspace before for :
                //.replace(/ @/g, ":") // special replace @ for :
                .replace(/@/g, ":") // special replace @ for :
                .replace(/\|/g, "," + opts.target + " ") // special replace | for ,
                .replace(opts.target + " body", "body") // special replace for body ,
                .replace(/:{/g, "{")
                .replace(/};/g, "}")
                // https://regex101.com/r/eE6cF9/9
                //.replace(/([0-9]+)([;]{1})/g, "$1,"); // Fix rgb rgba color OLD
                // https://regex101.com/r/eE6cF9/13
                .replace(/;(?=[^(]*\))/g, ","); // Fix rgb rgba color / change semicolons for commas


            
                var morecss = "";

    var skinRadio = $("#chooseSkin input[type=radio]:checked").val();
    //alert(skinRadio)

    var bothcss = ".video-js .vjs-menu-button-inline.vjs-slider-active,.video-js .vjs-menu-button-inline:focus,.video-js .vjs-menu-button-inline:hover,.video-js.vjs-no-flex .vjs-menu-button-inline{width:10em}.video-js .vjs-controls-disabled .vjs-big-play-button{display:none!important}.video-js .vjs-control{width:3em}.video-js .vjs-menu-button-inline:before{width:1.5em}.vjs-menu-button-inline .vjs-menu{left:3em}.vjs-paused.vjs-has-started.video-js .vjs-big-play-button,.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button{display:block}.video-js .vjs-load-progress div,.vjs-seeking .vjs-big-play-button,.vjs-waiting .vjs-big-play-button{display:none!important}.video-js .vjs-mouse-display:after,.video-js .vjs-play-progress:after{padding:0 .4em .3em}";

    if (skinRadio == "vsg") {
   
        morecss = ".video-js *,.video-js:after,.video-js:before{box-sizing:inherit;font-size:inherit;color:inherit;line-height:inherit}.video-js.vjs-fullscreen,.video-js.vjs-fullscreen .vjs-tech{width:100%!important;height:100%!important}.video-js{font-size:14px;overflow:hidden}.video-js .vjs-control{color:inherit}.video-js .vjs-menu-button-inline:hover,.video-js.vjs-no-flex .vjs-menu-button-inline{width:8.35em}.video-js .vjs-volume-menu-button.vjs-volume-menu-button-horizontal:hover .vjs-menu .vjs-menu-content{height:3em;width:6.35em}.video-js .vjs-control:focus:before,.video-js .vjs-control:hover:before{text-shadow:0 0 1em #fff,0 0 1em #fff,0 0 1em #fff}.video-js .vjs-spacer,.video-js .vjs-time-control{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-flex:1 1 auto;-moz-box-flex:1 1 auto;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto}.video-js .vjs-time-control{-webkit-box-flex:0 1 auto;-moz-box-flex:0 1 auto;-webkit-flex:0 1 auto;-ms-flex:0 1 auto;flex:0 1 auto;width:auto}.video-js .vjs-time-control.vjs-time-divider{width:14px}.video-js .vjs-time-control.vjs-time-divider div{width:100%;text-align:center}.video-js .vjs-time-control.vjs-current-time{margin-left:1em}.video-js .vjs-time-control .vjs-current-time-display,.video-js .vjs-time-control .vjs-duration-display{width:100%}.video-js .vjs-time-control .vjs-current-time-display{text-align:right}.video-js .vjs-time-control .vjs-duration-display{text-align:left}.video-js .vjs-play-progress:before,.video-js .vjs-progress-control .vjs-play-progress:before,.video-js .vjs-remaining-time,.video-js .vjs-volume-level:after,.video-js .vjs-volume-level:before,.video-js.vjs-live .vjs-time-control.vjs-current-time,.video-js.vjs-live .vjs-time-control.vjs-duration,.video-js.vjs-live .vjs-time-control.vjs-time-divider,.video-js.vjs-no-flex .vjs-time-control.vjs-remaining-time{display:none}.video-js.vjs-no-flex .vjs-time-control{display:table-cell;width:4em}.video-js .vjs-progress-control{position:absolute;left:0;right:0;width:100%;height:.5em;top:-.5em}.video-js .vjs-progress-control .vjs-load-progress,.video-js .vjs-progress-control .vjs-play-progress,.video-js .vjs-progress-control .vjs-progress-holder{height:100%}.video-js .vjs-progress-control .vjs-progress-holder{margin:0}.video-js .vjs-progress-control:hover{height:1.5em;top:-1.5em}.video-js .vjs-control-bar{-webkit-transition:-webkit-transform .1s ease 0s;-moz-transition:-moz-transform .1s ease 0s;-ms-transition:-ms-transform .1s ease 0s;-o-transition:-o-transform .1s ease 0s;transition:transform .1s ease 0s}.video-js.not-hover.vjs-has-started.vjs-paused.vjs-user-active .vjs-control-bar,.video-js.not-hover.vjs-has-started.vjs-paused.vjs-user-inactive .vjs-control-bar,.video-js.not-hover.vjs-has-started.vjs-playing.vjs-user-active .vjs-control-bar,.video-js.not-hover.vjs-has-started.vjs-playing.vjs-user-inactive .vjs-control-bar,.video-js.vjs-has-started.vjs-playing.vjs-user-inactive .vjs-control-bar{visibility:visible;opacity:1;-webkit-backface-visibility:hidden;-webkit-transform:translateY(3em);-moz-transform:translateY(3em);-ms-transform:translateY(3em);-o-transform:translateY(3em);transform:translateY(3em);-webkit-transition:-webkit-transform 1s ease 0s;-moz-transition:-moz-transform 1s ease 0s;-ms-transition:-ms-transform 1s ease 0s;-o-transition:-o-transform 1s ease 0s;transition:transform 1s ease 0s}.video-js.not-hover.vjs-has-started.vjs-paused.vjs-user-active .vjs-progress-control,.video-js.not-hover.vjs-has-started.vjs-paused.vjs-user-inactive .vjs-progress-control,.video-js.not-hover.vjs-has-started.vjs-playing.vjs-user-active .vjs-progress-control,.video-js.not-hover.vjs-has-started.vjs-playing.vjs-user-inactive .vjs-progress-control,.video-js.vjs-has-started.vjs-playing.vjs-user-inactive .vjs-progress-control{height:.25em;top:-.25em;pointer-events:none;-webkit-transition:height 1s,top 1s;-moz-transition:height 1s,top 1s;-ms-transition:height 1s,top 1s;-o-transition:height 1s,top 1s;transition:height 1s,top 1s}.video-js.not-hover.vjs-has-started.vjs-paused.vjs-user-active.vjs-fullscreen .vjs-progress-control,.video-js.not-hover.vjs-has-started.vjs-paused.vjs-user-inactive.vjs-fullscreen .vjs-progress-control,.video-js.not-hover.vjs-has-started.vjs-playing.vjs-user-active.vjs-fullscreen .vjs-progress-control,.video-js.not-hover.vjs-has-started.vjs-playing.vjs-user-inactive.vjs-fullscreen .vjs-progress-control,.video-js.vjs-has-started.vjs-playing.vjs-user-inactive.vjs-fullscreen .vjs-progress-control{opacity:0;-webkit-transition:opacity 1s ease 1s;-moz-transition:opacity 1s ease 1s;-ms-transition:opacity 1s ease 1s;-o-transition:opacity 1s ease 1s;transition:opacity 1s ease 1s}.video-js.vjs-live .vjs-live-control{margin-left:1em}.video-js .vjs-big-play-button{top:50%;left:50%;margin-left:-1em;margin-top:-1em;width:2em;height:2em;line-height:2em;border:none;border-radius:50%;font-size:3.5em;background-color:rgba(0,0,0,.45);color:#fff;-webkit-transition:border-color .4s,outline .4s,background-color .4s;-moz-transition:border-color .4s,outline .4s,background-color .4s;-ms-transition:border-color .4s,outline .4s,background-color .4s;-o-transition:border-color .4s,outline .4s,background-color .4s;transition:border-color .4s,outline .4s,background-color .4s}.video-js .vjs-menu-button-popup .vjs-menu{left:-3em}.video-js .vjs-menu-button-popup .vjs-menu .vjs-menu-content{background-color:transparent;width:12em;left:-1.5em;padding-bottom:.5em}.video-js .vjs-menu-button-popup .vjs-menu .vjs-menu-item,.video-js .vjs-menu-button-popup .vjs-menu .vjs-menu-title{background-color:#151b17;margin:.3em 0;padding:.5em;border-radius:.3em}.video-js .vjs-menu-button-popup .vjs-menu .vjs-menu-item.vjs-selected{background-color:#2483d5}";
        //$('.messages').css("display", "block");
    } else if (skinRadio == "default") {
        morecss = "video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button,.vjs-paused.vjs-has-started.video-js .vjs-big-play-button{display:block}.video-js .vjs-big-play-button{top:50%;left:50%;margin-left:-1.5em;margin-top:-1em}";
        //$('.messages').css("display", "none");

    }
            
            
            
            if (opts.addcss) {
                //var addcss = $(opts.addcss).val();
                //css = addcss + css;
                //css = opts.addcss + css;
                css = opts.addcss + morecss + css + $('textarea#customcss').val(); // for Videojs Skin Generator only
            }

            if (opts.prefix === true) {
                css = cssParser(css);
            }
            if (opts.beautify === true) {
                css = beautifyCSS(css);
            }

            var reg = '';


            reg = new RegExp(opts.target, "g");
            if (opts.target && (opts.targetShow == false)) {

                cssResult = css.replace(reg, "");
            } else if (opts.target && (opts.targetShow == true)) {
                cssResult = css;
            } else {
                cssResult = css;
            }

            //alert(opts.target);
            //cssResult = css.replace(/\#mainID /g, "");

            //alert(opts.output);

            //$(opts.output).val(cssResult); // .val .text .html ALL WORKING?
            var thisis = opts.output.split(",");

            $.each(thisis, function (i) {
                //alert(thisis[i]);

                if ($(thisis[i]).is("textarea,input")) {
                    $(thisis[i]).val(cssResult);
                    //alert(thisis[i]);
                } else {
                    $(thisis[i]).html(cssResult);
                }

            });

            //editor.setValue(cssResult)

            //var el = opts.target;
            //if (el[0].value !== undefined) {
            //  $(opts.target).val(css);
            //} else {
            //  $(opts.target).html(css);
            //}

            if (opts.header === true) {
                //$('#formtocss-styles').remove;
                var style_tag = '<style id="formtocss-styles" type="text/css">' + css + '</style>';
                $('#formtocss-styles').replaceWith(style_tag);
            }

        }

        /* FormToJSON END */


        function beautifyCSS(css) {

            css = cssbeautify(css, {
                //indent: '    ',
                //openbrace: 'end-of-line',
                //autosemicolon: true
            });

            return css;

        }

        function cssParser(css) {
            var parser = new CSSParser();

            var sheet = parser.parse(css, false, true);
            console.log(sheet.cssText());

            if (sheet)
                return sheet.cssText();
            else
                return "";
        }

    };

}(jQuery));
