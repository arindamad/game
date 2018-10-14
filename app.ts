declare var jQuery, $;
class Game {
    public moveCounter = 1;
    private displayZero(element: any) {
        let imageElement = '<img style="height: 100px; width: 100px;" src="zero.jpg"/>';
            element.html(imageElement);
            element.attr("data-marked", "true");
    }

    private displayCross(element: any) {
        let imageElement = '<img style="height: 100px; width: 100px;" src="cross.jpg"/>';
        element.html(imageElement);
        element.attr("data-marked", "true");
    }

    private check() {
        
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
});

