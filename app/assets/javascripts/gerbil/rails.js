//= require gerbil
//= require jquery-1.7.1

Gerbil.Rails = {
    formatter: (function($) {
        var currentScenario, ok, fail, pending;

        function test(text, className) {
            var li = $("<li/>").addClass(className).html(text);
            currentScenario.find("ul").append(li);

            currentScenario.
                removeClass("fail").
                removeClass("pending").
                removeClass("ok");

            if (fail > 0) {
                currentScenario.addClass("fail");
            } else if (pending > 0) {
                currentScenario.addClass("pending");
            } else if (ok > 0) {
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
                ok = fail = pending = 0;

                currentScenario = $("<section/>");
                currentScenario.append("<h1>Running <strong>" + msg + "</strong></h1>");
                currentScenario.append("<ul/>");

                $("body").append(currentScenario);
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
                ok += 1;
                test(msg, "ok");
            },

            fail: function(msg) {
                fail += 1;
                test(msg, "fail");
            },

            pending: function(msg) {
                pending += 1;
                test(msg, "pending");
            }
        };

    })(jQuery.noConflict(true))
};

Gerbil.formatter = Gerbil.Rails.formatter;
