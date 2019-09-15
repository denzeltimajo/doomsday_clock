const {remote} = require('electron')


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

Color.prototype.asRgbaCss = function(alpha) {
    return "rgba("+this.r+", "+this.g+", "+this.b+", " + alpha + ")";
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
var backgroundColor = LinearColorInterpolator.findColorBetween(l, r, 50).asRgbaCss(0.5);

/**
 * Sep = #2ecc71 - GREEN
 * Oct = #ffeb3b - YELLOW
 * Nov = #ff9800 - ORANGE
 * Dec = #c62828 - RED
 * Jan = #000000 - BLACK
 */

const dateCycle = [
     {month: 'Sep', color: '#2ecc71', date: new Date(2019, 8, 2)},
     {month: 'Oct', color: '#ffeb3b', date: new Date(2019, 9, 1)},
     {month: 'Nov', color: '#ff9800', date: new Date(2019, 10, 1)},
     {month: 'Dec', color: '#c62828', date: new Date(2019, 10, 30)},
     {month: 'Jan', color: '#000000', date: new Date(2019, 11, 28)},
]

const finalDate = new Date(2019, 11, 28)

let currentTimeAndDay = new Date()

let minDateOfColor = dateCycle[0].date
let maxDateOfColor = finalDate

let isOpaque = false

function update() {
    
    currentTimeAndDay = new Date()

    tick_timer(currentTimeAndDay)

    for(let i=1; i<dateCycle.length; i++){
        if(currentTimeAndDay < dateCycle[i].date){
            l = new Color(dateCycle[i-1].color);
            r = new Color(dateCycle[i].color)
            
            minDateOfColor = dateCycle[i-1].date
            maxDateOfColor = dateCycle[i].date
            break
        }
    }

    let scaledTime = scale(currentTimeAndDay, minDateOfColor, maxDateOfColor, 0, 100)

    if(isOpaque)
        document.body.style.backgroundColor = LinearColorInterpolator.findColorBetween(l, r, scaledTime).asRgbaCss(0.6);
    else
        document.body.style.backgroundColor = LinearColorInterpolator.findColorBetween(l, r, scaledTime).asRgbCss();
}


function tick_timer(currentTimeAndDay){
    
    let timerDate = finalDate - currentTimeAndDay
    let ms = Math.floor(timerDate / 10) % 100
    let sc = Math.floor(timerDate / 1000) % 60
    let min = Math.floor(timerDate / 60000) % 60
    let hr = Math.floor(timerDate / 3600000)

    // console.log(hr +":"+min.toString().padStart(2, "0")+":"+sc.toString().padStart(2, "0")+"."+ms.toString().padStart(2, "0"))

    document.getElementById("hour").innerHTML = hr
    document.getElementById("minute").innerHTML = min.toString().padStart(2, "0")
    document.getElementById("second").innerHTML = sc.toString().padStart(2, "0")
    document.getElementById("millisecond").innerHTML = ms.toString().padStart(2, "0")
}


function close_app(){
    remote.getCurrentWindow().close()
}

function ontop_app(){
    remote.getCurrentWindow().setAlwaysOnTop(!remote.getCurrentWindow().isAlwaysOnTop())
    let element = document.getElementById("ontop")
    if(remote.getCurrentWindow().isAlwaysOnTop())
        element.classList.add("active")
    else
        element.classList.remove("active")

}

function opaque_app(){
    isOpaque = !isOpaque

    let element = document.getElementById("opaque")

    if(isOpaque)
        element.classList.add("active")
    else
        element.classList.remove("active")
}

setInterval(update, 10)



/**
 * TODO: kete
 * FIX HAMBURGER BUTTON NOT WORKING
 * Rezable toggle
 * Change bottow navbar layout
 */