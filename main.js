$(function() {
    var btn = $("button"),
        PLAYER = "",
        AI = "",
        Ocase = "",
        Xcase = "",
        aiSteps = 0;

    function box(index) {
        return btn.eq(index).val();
    }

    function result(msg) {
        setTimeout(function() {
            alert(msg);
            location.reload(true);
        }, 600);
    }

    function checkSituation() {
        if (box(0) + box(1) + box(2) === "111" || box(3) + box(4) + box(5) === "111" || box(6) + box(7) + box(8) === "111" || box(0) + box(3) + box(6) === "111" || box(1) + box(4) + box(7) === "111" || box(2) + box(5) + box(8) === "111" || box(0) + box(4) + box(8) === "111" || box(2) + box(4) + box(6) === "111") {
            result("你输了 :-(");
        } else if ($("button[disabled]").length === 9) {
            result("平局");
        }
    }

    function randomStep() {
        var voidId = $("button[value='0']").eq(0).data("index");
        aiClick(voidId);
    }

    function aiClick(index) {
        btn.eq(index).text(AI).prop({ "disabled": "disabled", "value": "1", }).css("color", "#000");
        checkSituation();
    }

    function aiRound() {
        if (complement(2, 5, 8)) {
            return;
        }
        if (complement(0, 1, 2)) {
            return;
        }
        if (complement(3, 4, 5)) {
            return;
        }
        if (complement(6, 7, 8)) {
            return;
        }
        if (complement(0, 3, 6)) {
            return;
        }
        if (complement(1, 4, 7)) {
            return;
        }
        if (complement(0, 4, 8)) {
            return;
        }
        if (complement(2, 4, 6)) {
            return;
        }
        if (AI === "X") {
            if (aiSteps === 1) {
                switch (true) {
                    case box(1) == -1 || box(3) == -1:
                        Xcase = "1";
                        aiClick(4);
                        break;
                    case box(2) == -1 || box(6) == -1:
                        Xcase = "2";
                        aiClick(8);
                        break;
                    case box(5) == -1 || box(7) == -1:
                        Xcase = "3";
                        aiClick(4);
                        break;
                    case box(8) == -1:
                        Xcase = "4";
                        aiClick(2);
                        break;
                    default:
                        aiClick(8);
                        break;
                }
            }
            if (aiSteps === 2) {
                switch (Xcase) {
                    case "1":
                        if (box(3) == -1) { aiClick(2); } else { aiClick(6); }
                        break;
                    case "2":
                        if (box(2) == -1) { aiClick(6); } else { aiClick(2); }
                        break;
                    case "3":
                        if (box(5) == -1) { aiClick(2); } else { aiClick(6); }
                        break;
                    case "4":
                        aiClick(6);
                        break;
                }
            }
        }
        if (AI === "O") {
            if (aiSteps === 0) {
                if (box(4) == -1) {
                    aiClick(0);
                } else {
                    aiClick(4);
                }
            } else if (aiSteps === 1) {
                if (parseInt(box(0)) + parseInt(box(2)) + parseInt(box(6)) + parseInt(box(8)) == 2) { aiClick(1); } 
                else if (box(2) + box(3) == "-1-1" || box(1) + box(6) == "-1-1" || box(1) + box(3) == "-1-1") { aiClick(0); } 
                else if (box(0) + box(5) == "-1-1" || box(1) + box(8) == "-1-1" || box(1) + box(5) == "-1-1") { aiClick(2); } 
                else if (box(0) + box(7) == "-1-1" || box(3) + box(8) == "-1-1" || box(3) + box(7) == "-1-1") { aiClick(6); } 
                else if (box(5) + box(7) == "-1-1" || box(5) + box(6) == "-1-1" || box(2) + box(7) == "-1-1") { aiClick(8); } 
                else if (box(0) + box(8) == "-1-1" || box(2) + box(6) == "-1-1") { aiClick(1); } 
                else { aiClick(2); }
            } 
            else if (aiSteps === 2 || aiSteps === 3) { randomStep(); }
        }
    }

    function complement(a, b, c) {
        var threeBox = box(a) + box(b) + box(c);
        switch (threeBox) {
            case "011":
                aiClick(a);
                return true;
            case "101":
                aiClick(b);
                return true;
            case "110":
                aiClick(c);
                return true;
            case "0-1-1":
                aiClick(a);
                return true;
            case "-10-1":
                aiClick(b);
                return true;
            case "-1-10":
                aiClick(c);
                return true;
        }
    }
    $("div input").click(function() {
        PLAYER = $(this).attr("value");
        PLAYER === "X" ? AI = "O" : AI = "X";
        $(".mask").hide();
        if (AI === "X") {
            aiClick(0);
            aiSteps++;
        }
    });
    $("main button").click(function() {
        $(this).text(PLAYER).prop({ "disabled": "disabled", "value": "-1", }).css("color", "#000");
        checkSituation();
        aiRound();
        aiSteps++;
    });
});
