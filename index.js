// const electron = require('electron')


//<script src="https://gist.github.com/maxwells/8251275.js"></script>
// linearColorInterpolator.js by maxwells : https://gist.github.com/maxwells/8251275
Color = function(hexOrObject) {
    var obj;
    if (hexOrObject instanceof Object) {
        obj = hexOrObject;
    } else {
        obj = LinearColorInterpolator.convertHexToRgb(hexOrObject);
    }
    this.r = obj.r;
    this.g = obj.g;
    this.b = obj.b;
}
Color.prototype.asRgbCss = function() {
    return "rgb("+this.r+", "+this.g+", "+this.b+")";
}

const LinearColorInterpolator = {
    // convert 6-digit hex to rgb components;
    // accepts with or without hash ("335577" or "#335577")
    convertHexToRgb: function(hex) {
        match = hex.replace(/#/,'').match(/.{1,2}/g);
        return new Color({
            r: parseInt(match[0], 16),
            g: parseInt(match[1], 16),
            b: parseInt(match[2], 16)
        });
    },
    // left and right are colors that you're aiming to find
    // a color between. Percentage (0-100) indicates the ratio
    // of right to left. Higher percentage means more right,
    // lower means more left.
    findColorBetween: function(left, right, percentage) {
        newColor = {};
        components = ["r", "g", "b"];
        for (var i = 0; i < components.length; i++) {
            c = components[i];
            newColor[c] = Math.round(left[c] + (right[c] - left[c]) * percentage / 100);
        }
        return new Color(newColor);
    }
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var l = new Color("#ffeb3b");
var r = new Color("#ff9800");
var backgroundColor = LinearColorInterpolator.findColorBetween(l, r, 50).asRgbCss();

/**
 * Sep = #2ecc71 - GREEN
 * Oct = #ffeb3b - YELLOW
 * Nov = #ff9800 - ORANGE
 * Dec = #c62828 - RED
 * Jan = #000000 - BLACK
 */

const finalDate = 12000
const startDate = 0

let currentTimeAndDay = 6000
let minDateOfColor = 6000
let maxDateOfColor = finalDate

let timer

function update() {
    
    
    let targetDate


    if(currentTimeAndDay < 7500){
        l = new Color("#2ecc71");
        r = new Color("#ffeb3b");
        minDateOfColor = 6000
        maxDateOfColor = 7500
    }
    else if(currentTimeAndDay < 9000){
        l = new Color("#ffeb3b");
        r = new Color("#ff9800");
        minDateOfColor = 7500
        maxDateOfColor = 9000
    }
    else if(currentTimeAndDay < 10500){
        l = new Color("#ff9800");
        r = new Color("#c62828");
        minDateOfColor = 9000
        maxDateOfColor = 10500
    }
    else{
        l = new Color("#c62828");
        r = new Color("#000000");
        minDateOfColor = 10500
        maxDateOfColor = 12000
    }

    let scaledTime = scale(currentTimeAndDay, minDateOfColor, maxDateOfColor, 0, 100)

    document.body.style.backgroundColor = LinearColorInterpolator.findColorBetween(l, r, scaledTime).asRgbCss();

    currentTimeAndDay++

}


setInterval(update, 10)



