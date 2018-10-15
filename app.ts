declare var jQuery, $;
class Game {
    private static imageHeight: string = "90px";
    private static imageWidth: string = "90px";
    public moveCounter = 1;
    private displayZero(element: any) {
        let imageElement = '<img style="height: '+Game.imageHeight+'; width: '+Game.imageWidth+';" src="zero.jpg"/>';
            element.html(imageElement);
            element.attr("data-marked", "true");
    }

    private displayCross(element: any) {
        let imageElement = '<img style="height: '+Game.imageHeight+'; width: '+Game.imageWidth+';" src="cross.jpg"/>';;
        element.html(imageElement);
        element.attr("data-marked", "true");
    }

    private horizontalCheck(): boolean {
        return false;
    }

    private verticalCheck(): boolean {
        return false;
    }

    private diagonalCheck(): boolean {
        return false;
    }

    private check(): boolean {
        return this.verticalCheck() || this.horizontalCheck() || this.diagonalCheck();
    }

    public reset() {
        $("#table_game tr td img").remove();
        $("#table_game tr td").attr('data-marked', 'false');
        this.moveCounter = 1;    
    }

    public move(element: any) {
        if(element.attr('data-marked') != 'true') {
            if(this.moveCounter > 9) {
                return false;
            } else {
                if(this.moveCounter%2 !== 0) {
                    this.displayCross(element);
                } else {
                    this.displayZero(element);
                }
                this.moveCounter += 1;
                this.check();
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

