$(function() {
    var PLAYER = "";
    var AI = "";
    var aiSteps = 0;
    var Xcase = "";
    var Ocase = "";

    function box(id) {
        return $("#" + id).val();
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
        var voidId = $("button[value='0']").eq(0).attr("id");
        aiClick(voidId);
    }

    function aiClick(id) {
        $("#" + id).text(AI).prop({ "disabled": "disabled", "value": "1", }).css("color", "#000");
        checkSituation();
    }

    function stop(func) {
        if (func) {
            return;
        }
    }

    function aiRound() {
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
        if (complement(2, 5, 8)) {
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
                        Xcase = "5";
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
                    case "5":
                        if (box(7) == -1) {
                            aiClick(1);
                            Xcase = "51";
                        }
                        if (box(6) == -1) {
                            aiClick(2);
                        }
                        if (box(5) == -1) {
                            aiClick(3);
                            Xcase = "53";
                        }
                        if (box(3) == -1) {
                            aiClick(5);
                            Xcase = "55";
                        }
                        if (box(2) == -1) {
                            aiClick(6);
                        }
                        if (box(1) == -1) {
                            aiClick(7);
                            Xcase = "57";
                        }
                        break;
                }
            }
            if (aiSteps === 3) {
                switch (Xcase) {
                    case "51":
                        aiClick(6);
                        Xcase = "516";
                        break;
                    case "53":
                        aiClick(2);
                        Xcase = "532";
                        break;
                    case "55":
                        aiClick(6);
                        Xcase = "556";
                        break;
                    case "57":
                        aiClick(2);
                        Xcase = "572";
                        break;
                }
            }
            if (aiSteps === 4) {
                switch (Xcase) {
                    case "516":
                        aiClick(5);
                        break;
                    case "532":
                        aiClick(7);
                        break;
                    case "556":
                        aiClick(1);
                        break;
                    case "572":
                        aiClick(3);
                        break;
                }
            }
        }
        if (AI === "O") {
            if (aiSteps === 0) {
                switch (true) {
                    case box(4) == -1:
                        Ocase = "1";
                        aiClick(0);
                        break;
                    case box(1) == -1 || box(3) == -1 || box(5) == -1 || box(7) == -1:
                        Ocase = "2";
                        aiClick(4);
                        break;
                    default:
                        Ocase = "3";
                        aiClick(4);
                        break;
                }
            }
            if (aiSteps === 1) {
                switch (Ocase) {
                    case "1":
                        if (box(8) == -1) { aiClick(2); }
                        break;
                    case "2":
                        if (box(8) == -1) { aiClick(6); } else { aiClick(8); }
                        break;
                    case "3":
                        if (box(1) == -1) {
                            aiClick(7);
                            Ocase = "31";
                        } else {
                            aiClick(1);
                            Ocase = "32";
                        }
                        break;
                }
            }
            if (aiSteps === 2) {
                switch (Ocase) {
                    case "1":
                        randomStep();
                        break;
                    case "2":
                        randomStep();
                        break;
                    case "31":
                        if (box(0) == 0) { aiClick(0); } else if (box(3) == 0) { aiClick(3); } else randomStep();
                        break;
                    case "32":
                        if (box(6) == 0) { aiClick(6); } else if (box(8) == 0) { aiClick(8); } else randomStep();
                        break;
                }
            }
            if (aiSteps === 3) { randomStep(); }
        }
    }

    function complement(a, b, c) {
        var threeBox = box(a) + box(b) + box(c);
        if (aiSteps > 1) {
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
            }
        }
        if (AI === "O" && aiSteps > 0) {
            switch (threeBox) {
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
    }
    $("div input").click(function() {
        PLAYER = $(this).data("value");
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
