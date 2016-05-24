$(document).ready(function () {
    initComment();
    $("time.timeago").timeago();
});

function initComment() {
    var $list = $('#comment-list');
    if (!$list.length) {
        return;
    }
    if (localStorage.getItem("comment-author")) {
        $('#author').val(localStorage.getItem("comment-author"));
        $('#email').val(localStorage.getItem("comment-email"));
        $('#website').val(localStorage.getItem("comment-website"));
        $('#avatar').attr("src", localStorage.getItem("comment-avatar"));
        $('.c-avatar').removeClass("null");
    }
    $('#comment-content').on("focus", function () {
        if ($('.c-avatar').hasClass("null")) {
            $('.c-avatar-field').remove();
            $('.c-info-fields').removeClass("hide");
        }
    });
    $('#comment-show').on("click", function () {
        $('#comment-show').hide();
        var form = $('#comment-form');
        form.removeClass("hide").appendTo($list);
    });
    $('#comment-cancel').on("click", function () {
        $('#comment-form').addClass("hide");
        $('#comment-show').show();
    });
    $('#comment-form').ajaxForm(function (json) {
        if (json.res) {
            localStorage.setItem("comment-author", $('#author').val());
            localStorage.setItem("comment-email", $('#email').val());
            localStorage.setItem("comment-website", $('#website').val());
            localStorage.setItem("comment-avatar", json.comment.avatar);
            var tpl = $($('#comment-tpl').html());
            tpl.find(".comment-avatar").attr("src", json.comment.avatar).attr("alt", json.comment.avatar);
            tpl.find(".comment-name").attr("href", json.comment.website).text(json.comment.author);
            tpl.find(".comment-reply").attr("rel", json.comment.id);
            tpl.find(".comment-content").html("<p>" + json.comment.content + "</p>");
            tpl.find(".comment-message").html("Your comment is awaiting moderation.");
            tpl.attr("id", "comment-" + json.comment.id);
            if (json.comment.status == "approved") {
                tpl.find(".comment-check").remove();
            }
            var parentId = $('#comment-parent').val();
            if (parentId === '0') {
                $('#comment-list').append(tpl);
            } else {
                tpl.insertAfter($('#comment-' + parentId));
            }
            $('#comment-cancel').trigger("click");
            $('#comment-content').val("");
        } else {
            alert("Can not submit comment!");
        }
    });
    $list.on("click", ".comment-reply", function () {
        var id = $(this).attr("rel");
        var parentComment = $('#comment-' + id);
        var form = $('#comment-form');
        form.removeClass("hide").insertAfter($(this));
        $('#comment-show').hide();
        $('#comment-parent').val(id);
        $('.cancel-reply').show();
        var top = parentComment.offset().top;
        $('body,html').animate({scrollTop: top}, 500);
        return false;
    });
    $('.cancel-reply').on("click", function () {
        $('#comment-reply').empty();
        $('#comment-parent').val(0);
        $(this).hide();
        return false;
    });
}

$(document).ready(function () {
    $('#mobile-nav-trigger').click(function (el) {
        el.preventDefault();

        var nav = $('#nav');

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).html('Show Navigation');
            nav.find('ul.nav').slideUp('fast').removeClass('active');
        } else {
            $(this).addClass('active');
            $(this).html('Close Navigation');
            nav.find('ul.nav').slideDown('fast').addClass('active');
        }
    });
});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiLCJuYXZiYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGluaXRDb21tZW50KCk7XG4gICAgJChcInRpbWUudGltZWFnb1wiKS50aW1lYWdvKCk7XG59KTtcblxuZnVuY3Rpb24gaW5pdENvbW1lbnQoKSB7XG4gICAgdmFyICRsaXN0ID0gJCgnI2NvbW1lbnQtbGlzdCcpO1xuICAgIGlmICghJGxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29tbWVudC1hdXRob3JcIikpIHtcbiAgICAgICAgJCgnI2F1dGhvcicpLnZhbChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNvbW1lbnQtYXV0aG9yXCIpKTtcbiAgICAgICAgJCgnI2VtYWlsJykudmFsKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29tbWVudC1lbWFpbFwiKSk7XG4gICAgICAgICQoJyN3ZWJzaXRlJykudmFsKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29tbWVudC13ZWJzaXRlXCIpKTtcbiAgICAgICAgJCgnI2F2YXRhcicpLmF0dHIoXCJzcmNcIiwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjb21tZW50LWF2YXRhclwiKSk7XG4gICAgICAgICQoJy5jLWF2YXRhcicpLnJlbW92ZUNsYXNzKFwibnVsbFwiKTtcbiAgICB9XG4gICAgJCgnI2NvbW1lbnQtY29udGVudCcpLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCgnLmMtYXZhdGFyJykuaGFzQ2xhc3MoXCJudWxsXCIpKSB7XG4gICAgICAgICAgICAkKCcuYy1hdmF0YXItZmllbGQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJy5jLWluZm8tZmllbGRzJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJCgnI2NvbW1lbnQtc2hvdycpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjY29tbWVudC1zaG93JykuaGlkZSgpO1xuICAgICAgICB2YXIgZm9ybSA9ICQoJyNjb21tZW50LWZvcm0nKTtcbiAgICAgICAgZm9ybS5yZW1vdmVDbGFzcyhcImhpZGVcIikuYXBwZW5kVG8oJGxpc3QpO1xuICAgIH0pO1xuICAgICQoJyNjb21tZW50LWNhbmNlbCcpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjY29tbWVudC1mb3JtJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgICAkKCcjY29tbWVudC1zaG93Jykuc2hvdygpO1xuICAgIH0pO1xuICAgICQoJyNjb21tZW50LWZvcm0nKS5hamF4Rm9ybShmdW5jdGlvbiAoanNvbikge1xuICAgICAgICBpZiAoanNvbi5yZXMpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY29tbWVudC1hdXRob3JcIiwgJCgnI2F1dGhvcicpLnZhbCgpKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY29tbWVudC1lbWFpbFwiLCAkKCcjZW1haWwnKS52YWwoKSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNvbW1lbnQtd2Vic2l0ZVwiLCAkKCcjd2Vic2l0ZScpLnZhbCgpKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY29tbWVudC1hdmF0YXJcIiwganNvbi5jb21tZW50LmF2YXRhcik7XG4gICAgICAgICAgICB2YXIgdHBsID0gJCgkKCcjY29tbWVudC10cGwnKS5odG1sKCkpO1xuICAgICAgICAgICAgdHBsLmZpbmQoXCIuY29tbWVudC1hdmF0YXJcIikuYXR0cihcInNyY1wiLCBqc29uLmNvbW1lbnQuYXZhdGFyKS5hdHRyKFwiYWx0XCIsIGpzb24uY29tbWVudC5hdmF0YXIpO1xuICAgICAgICAgICAgdHBsLmZpbmQoXCIuY29tbWVudC1uYW1lXCIpLmF0dHIoXCJocmVmXCIsIGpzb24uY29tbWVudC53ZWJzaXRlKS50ZXh0KGpzb24uY29tbWVudC5hdXRob3IpO1xuICAgICAgICAgICAgdHBsLmZpbmQoXCIuY29tbWVudC1yZXBseVwiKS5hdHRyKFwicmVsXCIsIGpzb24uY29tbWVudC5pZCk7XG4gICAgICAgICAgICB0cGwuZmluZChcIi5jb21tZW50LWNvbnRlbnRcIikuaHRtbChcIjxwPlwiICsganNvbi5jb21tZW50LmNvbnRlbnQgKyBcIjwvcD5cIik7XG4gICAgICAgICAgICB0cGwuZmluZChcIi5jb21tZW50LW1lc3NhZ2VcIikuaHRtbChcIllvdXIgY29tbWVudCBpcyBhd2FpdGluZyBtb2RlcmF0aW9uLlwiKTtcbiAgICAgICAgICAgIHRwbC5hdHRyKFwiaWRcIiwgXCJjb21tZW50LVwiICsganNvbi5jb21tZW50LmlkKTtcbiAgICAgICAgICAgIGlmIChqc29uLmNvbW1lbnQuc3RhdHVzID09IFwiYXBwcm92ZWRcIikge1xuICAgICAgICAgICAgICAgIHRwbC5maW5kKFwiLmNvbW1lbnQtY2hlY2tcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcGFyZW50SWQgPSAkKCcjY29tbWVudC1wYXJlbnQnKS52YWwoKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRJZCA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgJCgnI2NvbW1lbnQtbGlzdCcpLmFwcGVuZCh0cGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cGwuaW5zZXJ0QWZ0ZXIoJCgnI2NvbW1lbnQtJyArIHBhcmVudElkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKCcjY29tbWVudC1jYW5jZWwnKS50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgICAgICAgICAkKCcjY29tbWVudC1jb250ZW50JykudmFsKFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJDYW4gbm90IHN1Ym1pdCBjb21tZW50IVwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICRsaXN0Lm9uKFwiY2xpY2tcIiwgXCIuY29tbWVudC1yZXBseVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcInJlbFwiKTtcbiAgICAgICAgdmFyIHBhcmVudENvbW1lbnQgPSAkKCcjY29tbWVudC0nICsgaWQpO1xuICAgICAgICB2YXIgZm9ybSA9ICQoJyNjb21tZW50LWZvcm0nKTtcbiAgICAgICAgZm9ybS5yZW1vdmVDbGFzcyhcImhpZGVcIikuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSk7XG4gICAgICAgICQoJyNjb21tZW50LXNob3cnKS5oaWRlKCk7XG4gICAgICAgICQoJyNjb21tZW50LXBhcmVudCcpLnZhbChpZCk7XG4gICAgICAgICQoJy5jYW5jZWwtcmVwbHknKS5zaG93KCk7XG4gICAgICAgIHZhciB0b3AgPSBwYXJlbnRDb21tZW50Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCA1MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnLmNhbmNlbC1yZXBseScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjY29tbWVudC1yZXBseScpLmVtcHR5KCk7XG4gICAgICAgICQoJyNjb21tZW50LXBhcmVudCcpLnZhbCgwKTtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn1cbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjbW9iaWxlLW5hdi10cmlnZ2VyJykuY2xpY2soZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIG5hdiA9ICQoJyNuYXYnKTtcblxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5odG1sKCdTaG93IE5hdmlnYXRpb24nKTtcbiAgICAgICAgICAgIG5hdi5maW5kKCd1bC5uYXYnKS5zbGlkZVVwKCdmYXN0JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmh0bWwoJ0Nsb3NlIE5hdmlnYXRpb24nKTtcbiAgICAgICAgICAgIG5hdi5maW5kKCd1bC5uYXYnKS5zbGlkZURvd24oJ2Zhc3QnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4iXX0=
