img = "";
status = "";
object = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640, 450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " status : Detecting Objects";
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        object = result;
    }
}

function draw() {
    image(img, 0, 0, 640, 450);
    /*fill('red');
    text("dog",130,70);
    noFill();
    stroke('red');
    rect(100,50,280,390);

    fill('red');
    text("cat",320,90);
    noFill();
    stroke('red');
    rect(300,70,320,378);*/

    if (status != "") {
        document.getElementById("status").innerHTML = "status : Objects Detected";
        for (i = 0; i < object.length; i++) {
            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}