let speech;
let said;
let word = [];
var directionX;
var directionX1;

let video;
let poseNet;
let poses = [];

let pkeyHandX, pkeyHandY, keyHandX, keyHandY;
let pkeyHandX1, pkeyHandY1, keyHandX1, keyHandY1;

let img1, img2;
function preload(){
   img1 = loadImage("quo.jpg");
   img2 = loadImage("animal.jpg");
}

function setup() {
  createCanvas(640, 360);
  directionX = 1;
  textSize(30);
  speechRec = new p5.SpeechRec("ko-KR", gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);

  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      said = speechRec.resultString;
      word = said.split("");
      console.log(said);
    }
  }

  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Ai Activated!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    let keypoint = pose.keypoints[10];
    let keypoint1 = pose.keypoints[9];  
    if (keypoint.score > 0.2) {
      keyHandX = pkeyHandX;
      keyHandY = pkeyHandY;
      pkeyHandX = keypoint.position.x;
      pkeyHandY = keypoint.position.y;

      keyHandX1 = pkeyHandX1;
      keyHandY1 = pkeyHandY1;
      pkeyHandX1 = keypoint1.position.x;
      pkeyHandY1 = keypoint1.position.y;

      if (keyHandX > width / 2) {
        directionX = -1;
      }
      if (keyHandX < width / 2) {
        directionX = 1;
      }

      if (keyHandX1 > width / 2) {
        directionX1 = -1;
      }
      if (keyHandX1 < width / 2) {
        directionX1 = 1;
      }


      for (var j = 0; j < word.length; j++) {
        image(img1, keyHandX-50, keyHandY, 100, 80);
        image(img2, keyHandX1-50, keyHandY1, 100, 80);
        text(word[j], keyHandX + directionX * j * 25, random(keyHandY - 5, keyHandY + 5));
        text(word[j], keyHandX1 + directionX1 * j * 25, random(keyHandY1 - 8, keyHandY1 + 8));
        console.log(word[j]);
      }
    }
  }
}