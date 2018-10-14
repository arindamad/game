var Game = /** @class */ (function () {
    function Game() {
        this.moveCounter = 1;
    }
    Game.prototype.displayZero = function (element) {
        var imageElement = '<img style="height: 100px; width: 100px;" src="zero.jpg"/>';
        element.html(imageElement);
        element.attr("data-marked", "true");
    };
    Game.prototype.displayCross = function (element) {
        var imageElement = '<img style="height: 100px; width: 100px;" src="cross.jpg"/>';
        element.html(imageElement);
        element.attr("data-marked", "true");
    };
    Game.prototype.check = function () {
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
    return Game;
}());
$(document).ready(function () {
    var gameObject = new Game();
    $("#table_game tr td").on('click', function (event) {
        gameObject.move($(event.currentTarget));
    });
});
