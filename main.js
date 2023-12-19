status="";
objects=[];
video = "";
objectDetector = "";
song="";

function preload() {
    console.log(video);
    song = loadSound('WrongBuzzer.mp3');
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function setup()
{
    canvas = createCanvas(380, 380);
    video = createCapture(VIDEO);
    canvas.center();
    video.size(380,380);
    video.hide();
    
}



function draw()
{
    image(video, 0, 0, 380, 380);
    if(status != "")
    {   r=random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
       
            for (i=0; i < objects.length; i++)
             {    fill(r,g,b);
                  percent = floor(objects[i].confidence * 100);
                  text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
                  noFill();
                  stroke(r,g,b);
                 rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                 if(objects[i].label=='person')
                 {
                 document.getElementById("status").innerHTML = "Status : Baby Dectected";
                 document.getElementById("start").innerHTML = "Baby Found";
                 song.stop();
                 } 
                else {
                document.getElementById("status").innerHTML = "Status : Baby Not Dectected";
                document.getElementById("start").innerHTML = "Baby Not Found";
                 song.play();
                }
        
            }  
            if (objects.length==0){
                document.getElementById("status").innerHTML = "Status : Baby Not Dectected";
                document.getElementById("start").innerHTML = "Baby Not Found";
               song.play();
              }       
     }
  
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error)
    {
        console.log(error)
    }
    console.log(results);
    objects = results;
}

