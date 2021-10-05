img = "";
status = "";
object = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " status : Detecting Objects";
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
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
    image(video, 0, 0, 380, 450);
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
        document.getElementById("objectNumber").innerHTML = "Number of objects Detected = " + object.length;

        r = random(255);
        g = random(255);
        b = random(255);
        
        objectDetector.detect(video,gotResult);

        for (i = 0; i < object.length; i++) {
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}