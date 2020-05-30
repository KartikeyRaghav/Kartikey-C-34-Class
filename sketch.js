var ball;
var database1,positions;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    // Creating the database
    database1 = firebase.database();

    // Refering the location of child on database
    var location_of_child = database1.ref("Ball/Position");

    // To read/get/listen data from database
    location_of_child.on("value",read_data,show_error);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,1);
    }
    drawSprites();
}

function writePosition(x,y){
    database1.ref("Ball/Position").set({x:ball.x+x, y:ball.y+y});
}



function read_data(data) {
    positions = data.val();
    ball.x = positions.x;
    ball.y = positions.y;
}



function show_error() {
    console.log("Error");
}
