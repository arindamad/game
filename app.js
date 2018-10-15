var Game = /** @class */ (function () {
    function Game() {
        this.moveCounter = 1;
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
    Game.prototype.horizontalCheck = function () {
        return false;
    };
    Game.prototype.verticalCheck = function () {
        return false;
    };
    Game.prototype.diagonalCheck = function () {
        return false;
    };
    Game.prototype.check = function () {
        return this.verticalCheck() || this.horizontalCheck() || this.diagonalCheck();
    };
    Game.prototype.reset = function () {
        $("#table_game tr td img").remove();
        $("#table_game tr td").attr('data-marked', 'false');
        this.moveCounter = 1;
    };
    Game.prototype.move = function (element) {
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
                this.check();
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
