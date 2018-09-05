$(document).ready(function () {
    initComment();
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
            var date = new Date(json.comment.create_time);
            tpl.find(".comment-message").html("Your comment is awaiting moderation.");
            tpl.attr("id", "comment-" + json.comment.id);
            if (json.comment.status == "approved") {
                tpl.find(".comment-check").remove();
            }
            var parentId = $('#comment-parent').val();
            tpl.insertAfter($('#comment-' + parentId));
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
        $('#comment-form').removeClass("hide");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgaW5pdENvbW1lbnQoKTtcbn0pO1xuXG5mdW5jdGlvbiBpbml0Q29tbWVudCgpIHtcbiAgICB2YXIgJGxpc3QgPSAkKCcjY29tbWVudC1saXN0Jyk7XG4gICAgaWYgKCEkbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjb21tZW50LWF1dGhvclwiKSkge1xuICAgICAgICAkKCcjYXV0aG9yJykudmFsKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29tbWVudC1hdXRob3JcIikpO1xuICAgICAgICAkKCcjZW1haWwnKS52YWwobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjb21tZW50LWVtYWlsXCIpKTtcbiAgICAgICAgJCgnI3dlYnNpdGUnKS52YWwobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjb21tZW50LXdlYnNpdGVcIikpO1xuICAgICAgICAkKCcjYXZhdGFyJykuYXR0cihcInNyY1wiLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNvbW1lbnQtYXZhdGFyXCIpKTtcbiAgICAgICAgJCgnLmMtYXZhdGFyJykucmVtb3ZlQ2xhc3MoXCJudWxsXCIpO1xuICAgIH1cbiAgICAkKCcjY29tbWVudC1jb250ZW50Jykub24oXCJmb2N1c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKCcuYy1hdmF0YXInKS5oYXNDbGFzcyhcIm51bGxcIikpIHtcbiAgICAgICAgICAgICQoJy5jLWF2YXRhci1maWVsZCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnLmMtaW5mby1maWVsZHMnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKCcjY29tbWVudC1zaG93Jykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNjb21tZW50LXNob3cnKS5oaWRlKCk7XG4gICAgICAgIHZhciBmb3JtID0gJCgnI2NvbW1lbnQtZm9ybScpO1xuICAgICAgICBmb3JtLnJlbW92ZUNsYXNzKFwiaGlkZVwiKS5hcHBlbmRUbygkbGlzdCk7XG4gICAgfSk7XG4gICAgJCgnI2NvbW1lbnQtY2FuY2VsJykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNjb21tZW50LWZvcm0nKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgICAgICQoJyNjb21tZW50LXNob3cnKS5zaG93KCk7XG4gICAgfSk7XG4gICAgJCgnI2NvbW1lbnQtZm9ybScpLmFqYXhGb3JtKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgIGlmIChqc29uLnJlcykge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjb21tZW50LWF1dGhvclwiLCAkKCcjYXV0aG9yJykudmFsKCkpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjb21tZW50LWVtYWlsXCIsICQoJyNlbWFpbCcpLnZhbCgpKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY29tbWVudC13ZWJzaXRlXCIsICQoJyN3ZWJzaXRlJykudmFsKCkpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjb21tZW50LWF2YXRhclwiLCBqc29uLmNvbW1lbnQuYXZhdGFyKTtcbiAgICAgICAgICAgIHZhciB0cGwgPSAkKCQoJyNjb21tZW50LXRwbCcpLmh0bWwoKSk7XG4gICAgICAgICAgICB0cGwuZmluZChcIi5jb21tZW50LWF2YXRhclwiKS5hdHRyKFwic3JjXCIsIGpzb24uY29tbWVudC5hdmF0YXIpLmF0dHIoXCJhbHRcIiwganNvbi5jb21tZW50LmF2YXRhcik7XG4gICAgICAgICAgICB0cGwuZmluZChcIi5jb21tZW50LW5hbWVcIikuYXR0cihcImhyZWZcIiwganNvbi5jb21tZW50LndlYnNpdGUpLnRleHQoanNvbi5jb21tZW50LmF1dGhvcik7XG4gICAgICAgICAgICB0cGwuZmluZChcIi5jb21tZW50LXJlcGx5XCIpLmF0dHIoXCJyZWxcIiwganNvbi5jb21tZW50LmlkKTtcbiAgICAgICAgICAgIHRwbC5maW5kKFwiLmNvbW1lbnQtY29udGVudFwiKS5odG1sKFwiPHA+XCIgKyBqc29uLmNvbW1lbnQuY29udGVudCArIFwiPC9wPlwiKTtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoanNvbi5jb21tZW50LmNyZWF0ZV90aW1lKTtcbiAgICAgICAgICAgIHRwbC5maW5kKFwiLmNvbW1lbnQtbWVzc2FnZVwiKS5odG1sKFwiWW91ciBjb21tZW50IGlzIGF3YWl0aW5nIG1vZGVyYXRpb24uXCIpO1xuICAgICAgICAgICAgdHBsLmF0dHIoXCJpZFwiLCBcImNvbW1lbnQtXCIgKyBqc29uLmNvbW1lbnQuaWQpO1xuICAgICAgICAgICAgaWYgKGpzb24uY29tbWVudC5zdGF0dXMgPT0gXCJhcHByb3ZlZFwiKSB7XG4gICAgICAgICAgICAgICAgdHBsLmZpbmQoXCIuY29tbWVudC1jaGVja1wiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwYXJlbnRJZCA9ICQoJyNjb21tZW50LXBhcmVudCcpLnZhbCgpO1xuICAgICAgICAgICAgdHBsLmluc2VydEFmdGVyKCQoJyNjb21tZW50LScgKyBwYXJlbnRJZCkpO1xuICAgICAgICAgICAgJCgnI2NvbW1lbnQtY2FuY2VsJykudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgICAgICAgICAgJCgnI2NvbW1lbnQtY29udGVudCcpLnZhbChcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2FuIG5vdCBzdWJtaXQgY29tbWVudCFcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkbGlzdC5vbihcImNsaWNrXCIsIFwiLmNvbW1lbnQtcmVwbHlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJyZWxcIik7XG4gICAgICAgIHZhciBwYXJlbnRDb21tZW50ID0gJCgnI2NvbW1lbnQtJyArIGlkKTtcbiAgICAgICAgdmFyIGZvcm0gPSAkKCcjY29tbWVudC1mb3JtJyk7XG4gICAgICAgIGZvcm0ucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpLmluc2VydEFmdGVyKCQodGhpcykpO1xuICAgICAgICAkKCcjY29tbWVudC1zaG93JykuaGlkZSgpO1xuICAgICAgICAkKCcjY29tbWVudC1wYXJlbnQnKS52YWwoaWQpO1xuICAgICAgICAkKCcjY29tbWVudC1mb3JtJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgICAkKCcuY2FuY2VsLXJlcGx5Jykuc2hvdygpO1xuICAgICAgICB2YXIgdG9wID0gcGFyZW50Q29tbWVudC5vZmZzZXQoKS50b3A7XG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgNTAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5jYW5jZWwtcmVwbHknKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI2NvbW1lbnQtcmVwbHknKS5lbXB0eSgpO1xuICAgICAgICAkKCcjY29tbWVudC1wYXJlbnQnKS52YWwoMCk7XG4gICAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG4iXX0=
