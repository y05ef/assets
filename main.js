/**
 * Created by David on 18.12.15.
 */
$(document).ready(function () {
    $('.parallax').parallax();
    $('.modal').modal();
    $('select').material_select();
    $('#farewellClipModal').modal({
        ready: function (modal) {
            modal.find("video")[0].play();
        },
        complete: function (modal) {
            var vidElement = modal.find("video")[0];
            vidElement.pause();
            vidElement.currentTime = 0;
        }
    });
    $('.scrollspy').scrollSpy();

    // Already visible modules
    $(".animate-in").each(function(i, el) {
        if ($(el).visible(true)) {
            $(el).addClass("already-visible");
        }
    });

    var comeInQueue = [];
    $(window).scroll(function() {
        $(".animate-in").each(function(i, el) {
            if ($(el).visible(true) && !$(el).hasClass("already-visible") && !$(el).hasClass("come-in_in-progress")) {
                $(el).addClass("come-in_in-progress");
                var alreadyAnimating = false;
                if (comeInQueue.length > 0) {
                    alreadyAnimating = true;
                }
                comeInQueue.push($(el));
                setTimeout(function() {
                    var element = comeInQueue.shift();
                    element.removeClass("come-in_in-progress");
                    element.addClass("come-in");
                }, alreadyAnimating ? comeInQueue.length * 50 : 0);
            }
        });

    });
});

(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function(partial) {

        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);