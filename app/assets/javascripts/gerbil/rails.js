//= require gerbil
//= require jquery-1.7.1

Gerbil.Rails = {}

Gerbil.Rails.jQuery = jQuery.noConflict(true);

Gerbil.Rails.formatter = (function($) {
    var currentScenario, status;

    function test(text, className) {
        var li = $("<li/>").addClass(className).html(text);
        currentScenario.find("ul").append(li);

        currentScenario.
            removeClass("fail").
            removeClass("pending").
            removeClass("ok");

        if (status.fail > 0) {
            currentScenario.addClass("fail");
        } else if (status.pending > 0) {
            currentScenario.addClass("pending");
        } else if (status.ok > 0) {
            currentScenario.addClass("ok");
        }
    }

    function pluralize(n, singular, plural) {
        if (typeof plural == "undefined")
            plural = singular + "s";
        return n == 1 ? [n, singular].join(" ") : [n, plural].join(" ");
    }

    return {
        scenario: function(msg) {
            status = { ok: 0, fail: 0, pending: 0 };

            currentScenario = $("<section/>");
            currentScenario.append("<h1>Running <strong>" + msg + "</strong></h1>");
            currentScenario.append("<ul/>");

            $("#results").append(currentScenario);
        },

        summary: function(summary) {
            var msg, p = $("<p class='summary'/>"),
                time = Math.round(100 * summary.time) / 100;

            msg = [[summary.pass, "passed"].join(" "),
                   [summary.fail, "failed"].join(" "),
                   [summary.pending, "pending"].join(" ")].join(", ");

            msg += " (" + summary.total + " total, " + pluralize(summary.assertions, "assertion") + ")";
            msg += " in " + time + "s.";

            p.text(msg);
            currentScenario.append(p);
            currentScenario.addClass("finished");
        },

        ok: function(msg) {
            status.ok++
            test(msg, "ok");
        },

        fail: function(msg) {
            status.fail++
            test(msg, "fail");
        },

        pending: function(msg) {
            status.pending++
            test(msg, "pending");
        }
    };

})(Gerbil.Rails.jQuery);

Gerbil.Rails.run = (function($) {
    return function() {
        function flashTitle(token, times) {
            $("title").text("   spec runner");

            setTimeout(function() {
                $("title").text(token + " spec runner");
            }, 200);

            if (times == 0) return;

            setTimeout(function() {
                flashTitle(token, times - 1);
            }, 1000);
        }

        flashTitle("⌛", 0);
        $.ajax({
            url:      "/assets/spec.js",
            type:     "GET",
            dataType: "script",
            success:  function() {
                $("#results").empty()
            },
            complete: function() {
                setTimeout(function() {
                    var fail    = $("section.fail").length,
                        pending = $("section.pending").length,
                        ok      = $("section.ok").length;

                    if (fail > 0) {
                        flashTitle("✘", 2);
                    } else if (pending > 0) {
                        flashTitle("☯", 2);
                    } else if (ok > 0) {
                        flashTitle("✔", 2);
                    }
                }, 0);
            }
        });
    }
})(Gerbil.Rails.jQuery);

Gerbil.formatter = Gerbil.Rails.formatter;

Gerbil.Rails.jQuery(function($) {
    var reload = $("#reload");

    setInterval(function() {
        if (!reload.is(":checked"))
            return;
        Gerbil.Rails.run();
    }, 30000);

    Gerbil.Rails.run();
});
