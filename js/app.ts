declare var jQuery, $;
class Game {
    private static imageHeight: string = "60px";
    private static imageWidth: string = "60px";
    public moveCounter = 1;

    constructor() {
        $("#table_game tr td").each(function (index) {
            $(this).attr('data-index', index);
        });
    }
    private displayZero(element: any) {
        let imageElement = '<img style="height: ' + Game.imageHeight + '; width: ' + Game.imageWidth + ';" src="images/zero.svg"/>';
        element.html(imageElement);
        element.attr("data-marked", "true");
    }

    private displayCross(element: any) {
        let imageElement = '<img style="height: ' + Game.imageHeight + '; width: ' + Game.imageWidth + ';" src="images/cross.svg"/>';;
        element.html(imageElement);
        element.attr("data-marked", "true");
    }

    private checkWinner(winner: any): string {
        console.log(winner);
        if (typeof winner != "undefined" && winner.indexOf("cross") !== -1) {
            return "CROSS";
        } else {
            return "ZERO";
        }
    }

    

    private verticalCheck(): any {
        let returnObject: any;
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
        } console.log(returnObject);
        return returnObject;
    }
    private horizontalCheck():any{
        let returnObject: any;
        returnObject = {
            isWinner: false,
            winner: null
        }
        if ((typeof $("img", $("#table_game tr td").eq(0)[0]).attr('src') != "undefined") && ($("img", $("#table_game tr td").eq(0)[0]).attr('src') == $("img", $("#table_game tr td").eq(1)[0]).attr('src')) && ($("img", $("#table_game tr td").eq(0)[0]).attr('src') == $("img", $("#table_game tr td").eq(2)[0]).attr('src'))) {
            returnObject.isWinner = true;
            returnObject.winner = this.checkWinner($("img", $("#table_game tr td").eq(0)[0]).attr('src'));
        }
        if ((typeof $("img", $("#table_game tr td").eq(3)[0]).attr('src') != 'undefined') && ($("img", $("#table_game tr td").eq(3)[0]).attr('src') == $("img", $("#table_game tr td").eq(4)[0]).attr('src')) && ($("img", $("#table_game tr td").eq(3)[0]).attr('src') == $("img", $("#table_game tr td").eq(5)[0]).attr('src'))) {
            returnObject.isWinner = true;
            returnObject.winner = this.checkWinner($("img", $("#table_game tr td").eq(3)[0]).attr('src'));
        }
        if ((typeof $("img", $("#table_game tr td").eq(6)[0]).attr('src') != 'undefined') && ($("img", $("#table_game tr td").eq(2)[0]).attr('src') == $("img", $("#table_game tr td").eq(5)[0]).attr('src')) && ($("img", $("#table_game tr td").eq(2)[0]).attr('src') == $("img", $("#table_game tr td").eq(8)[0]).attr('src'))) {
            returnObject.isWinner = true;
            returnObject.winner = this.checkWinner($("img", $("#table_game tr td").eq(2)[0]).attr('src'));
        } console.log(returnObject);
        return returnObject;
    }

    private diagonalCheck(): any {
        let returnObject: any;
        returnObject = {
            isWinner: false,
            winner: null
        };
        return returnObject;
    }
    // private horizontalCheck(): any {
    //     let returnObject: any;
    //     returnObject = {
    //         isWinner: false,
    //         winner: null
    //     };
    //     return returnObject;
    // }

    private check(): any {
        let verticalCheckResult = this.verticalCheck();
        let horizontalCheckResult = this.horizontalCheck();
        let diagonalCheckResult = this.diagonalCheck();
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
    }

    public reset() {
        $("#table_game tr td img").remove();
        $("#table_game tr td").attr('data-marked', 'false');
        this.moveCounter = 1;
    }

    public move(element: any) {
        if (element.attr('data-marked') != 'true') {
            if (this.moveCounter > 9) {
                return false;
            } else {
                if (this.moveCounter % 2 !== 0) {
                    this.displayCross(element);
                } else {
                    this.displayZero(element);
                }
                this.moveCounter += 1;
                if (this.moveCounter > 5) {
                    window.setTimeout(() => {
                        let result = this.check();
                        if (result) {
                            this.moveCounter = 10;
                            alert("The winner is " + result.winner);
                        }
                    }, 200);
                }

            }
        }
    }
}

$(document).ready(() => {
    let gameObject = new Game();
    $("#table_game tr td").on('click', (event) => {
        gameObject.move($(event.currentTarget));
    });
    $("button").on('click', () => {
        gameObject.reset();
    });
});

