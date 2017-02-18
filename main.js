$(function() {
    var btn = $("button"),
        PLAYER = "",
        AI = "",
        arr = [
            [0, 1, 2],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        Xcase = "",
        aiSteps = 0;
    // 获得棋盘格子的状态，"0"为空子，"1"为AI棋子，"-1"为玩家棋子
    function box(index) {
        return btn.eq(index).val();
    }

    // （伪）随机下子
    function randomStep() {
        var voidId = $("button[value='0']").eq(0).data("index");
        aiClick(voidId);
    }
    // AI下子
    function aiClick(index) {
        btn.eq(index).text(AI).prop({ "disabled": "disabled", "value": "1", }).css("color", "#000");
        checkSituation();
    }
    // AI的下棋算法
    function aiRound() {
        if (arr.some(function(item) {
                return attack(item);
            })) {
            return;
        }
        if (arr.some(function(item) {
                return defense(item);
            })) {
            return;
        }
        var performance = { X: [null, Xfirst, Xsecond], O: [Ofirst, Osecond, randomStep, randomStep] };
        performance[AI][aiSteps]();
    }
    // 判断是否为玩家连续的两子
    function checkTwoBox(num1, num2) {
        return box(num1) + box(num2) == "-1-1";
    }
    // 返回横竖或斜线三子状态
    function concatBox(arr) {
        return box(arr[0]) + box(arr[1]) + box(arr[2]);
    }
    // 补齐三子
    function attack(arr) {
        switch (concatBox(arr)) {
            case "011":
                aiClick(arr[0]);
                return true;
            case "101":
                aiClick(arr[1]);
                return true;
            case "110":
                aiClick(arr[2]);
                return true;
        }
    }
    // 拦住玩家三子
    function defense(arr) {
        switch (concatBox(arr)) {
            case "0-1-1":
                aiClick(arr[0]);
                return true;
            case "-10-1":
                aiClick(arr[1]);
                return true;
            case "-1-10":
                aiClick(arr[2]);
                return true;
        }
    }
    // 每步棋的具体实现
    function Xfirst() {
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

    function Xsecond() {
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

    function Ofirst() {
        if (box(4) == -1) {
            aiClick(0);
        } else {
            aiClick(4);
        }
    }

    function Osecond() {
        if (parseInt(box(0)) + parseInt(box(2)) + parseInt(box(6)) + parseInt(box(8)) == 2) { aiClick(1); } 
          else if (checkTwoBox(2, 3) || checkTwoBox(1, 6) || checkTwoBox(1, 3)) { aiClick(0); } 
          else if (checkTwoBox(0, 5) || checkTwoBox(1, 8) || checkTwoBox(1, 5)) { aiClick(2); } 
          else if (checkTwoBox(0, 7) || checkTwoBox(3, 8) || checkTwoBox(3, 7)) { aiClick(6); } 
          else if (checkTwoBox(5, 7) || checkTwoBox(5, 6) || checkTwoBox(2, 7)) { aiClick(8); } 
          else if (checkTwoBox(0, 8) || checkTwoBox(2, 6)) { aiClick(1); } 
          else { aiClick(2); }
    }

    // 判断胜负
    function checkSituation() {
        if (arr.some(function(item) {
                return concatBox(item) == "111";
            })) {
            result("你输了 :-(");
        } else if ($("button[disabled]").length === 9) {
            result("平局");
        }
    }

    function result(msg) {
        btn.attr('disabled', 'disabled');
        setTimeout(function() {
            alert(msg);
            location.reload();
        }, 600);
    }
    btn.removeAttr("disabled");
    $("div input").click(function() {
        PLAYER = $(this).attr("value");
        $(".mask").hide();
        if (PLAYER === "O") {
            AI = "X";
            aiClick(0);
            aiSteps++;
        } else { AI = "O"; }
    });
    btn.click(function() {
        $(this).text(PLAYER).prop({ "disabled": "disabled", "value": "-1", }).css("color", "#000");
        checkSituation();
        aiRound();
        aiSteps++;
    });
});
