var Game = /** @class */ (function () {
    function Game() {
        this.moveCounter = 1;
        $("#table_game tr td").each(function (index) {
            $(this).attr('data-index', index);
        });
    }
    Game.prototype.displayZero = function (element) {
        var imageElement = '<img style="height: ' + Game.imageHeight + '; width: ' + Game.imageWidth + ';" src="zero.jpg"/>';
        element.html(imageElement);
        element.attr("data-marked", "true");
    };
    Game.prototype.displayCross = function (element) {
        var imageElement = '<img style="height: ' + Game.imageHeight + '; width: ' + Game.imageWidth + ';" src="cross.jpg"/>';
        ;
        element.html(imageElement);
        element.attr("data-marked", "true");
    };
    Game.prototype.checkWinner = function (winner) {
        console.log(winner);
        if (typeof winner != "undefined" && winner.indexOf("cross") !== -1) {
            return "CROSS";
        }
        else {
            return "ZERO";
        }
    };
    Game.prototype.horizontalCheck = function () {
        var returnObject;
        returnObject = {
            isWinner: false,
            winner: null
        };
        return returnObject;
    };
    Game.prototype.verticalCheck = function () {
        var returnObject;
        returnObject = {
            isWinner: false,
            winner: null
        };
        if ((typeof $("img", $("#table_game tr td").eq(0)[0]).attr('src') != "undefined") && ($("img", $("#table_game tr td").eq(0)[0]).attr('src') == $("img", $("#table_game tr td").eq(3)[0]).attr('src')) && ($("img", $("#table_game tr td").eq(0)[0]).attr('src') == $("img", $("#table_game tr td").eq(6)[0]).attr('src'))) {
            returnObject.isWinner = true;
            returnObject.winner = this.checkWinner($("img", $("#table_game tr td").eq(0)[0]).attr('src'));
        }
        if ((typeof $("img", $("#table_game tr td").eq(1)[0]).attr('src') != 'undefined') && ($("img", $("#table_game tr td").eq(1)[0]).attr('src') == $("img", $("#table_game tr td").eq(4)[0]).attr('src')) && ($("img", $("#table_game tr td").eq(1)[0]).attr('src') == $("img", $("#table_game tr td").eq(7)[0]).attr('src'))) {
            returnObject.isWinner = true;
            returnObject.winner = this.checkWinner($("img", $("#table_game tr td").eq(1)[0]).attr('src'));
        }
        if ((typeof $("img", $("#table_game tr td").eq(2)[0]).attr('src') != 'undefined') && ($("img", $("#table_game tr td").eq(2)[0]).attr('src') == $("img", $("#table_game tr td").eq(5)[0]).attr('src')) && ($("img", $("#table_game tr td").eq(2)[0]).attr('src') == $("img", $("#table_game tr td").eq(8)[0]).attr('src'))) {
            returnObject.isWinner = true;
            returnObject.winner = this.checkWinner($("img", $("#table_game tr td").eq(2)[0]).attr('src'));
        }
        console.log(returnObject);
        return returnObject;
    };
    Game.prototype.diagonalCheck = function () {
        var returnObject;
        returnObject = {
            isWinner: false,
            winner: null
        };
        return returnObject;
    };
    Game.prototype.check = function () {
        var verticalCheckResult = this.verticalCheck();
        var horizontalCheckResult = this.horizontalCheck();
        var diagonalCheckResult = this.diagonalCheck();
        if (verticalCheckResult.isWinner) {
            return verticalCheckResult;
        }
        if (horizontalCheckResult.isWinner) {
            return horizontalCheckResult;
        }
        if (diagonalCheckResult.isWinner) {
            return diagonalCheckResult;
        }
        return false;
    };
    Game.prototype.reset = function () {
        $("#table_game tr td img").remove();
        $("#table_game tr td").attr('data-marked', 'false');
        this.moveCounter = 1;
    };
    Game.prototype.move = function (element) {
        var _this = this;
        if (element.attr('data-marked') != 'true') {
            if (this.moveCounter > 9) {
                return false;
            }
            else {
                if (this.moveCounter % 2 !== 0) {
                    this.displayCross(element);
                }
                else {
                    this.displayZero(element);
                }
                this.moveCounter += 1;
                if (this.moveCounter > 5) {
                    window.setTimeout(function () {
                        var result = _this.check();
                        if (result) {
                            _this.moveCounter = 10;
                            alert("The winner is " + result.winner);
                        }
                    }, 200);
                }
            }
        }
    };
    Game.imageHeight = "90px";
    Game.imageWidth = "90px";
    return Game;
}());
$(document).ready(function () {
    var gameObject = new Game();
    $("#table_game tr td").on('click', function (event) {
        gameObject.move($(event.currentTarget));
    });
    $("button").on('click', function () {
        gameObject.reset();
    });
});
