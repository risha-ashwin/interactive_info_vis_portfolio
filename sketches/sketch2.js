// Instance-mode sketch for tab 2
// HWK 4, Sketch A - Dancer Poses Clock

registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(700, 700);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
  };

  function drawMiniDancer(poseIndex, x, y, size) {
    p.push();
    p.translate(x, y);

    let s = size;

    p.stroke(40);
    p.strokeWeight(3);
    p.noFill();
    p.strokeCap(p.ROUND);

    p.fill(40);
    p.noStroke();
    p.circle(0, -s * 0.35, s * 0.28);

    p.noFill();
    p.stroke(40);

    p.strokeWeight(3);
    p.line(0, -s * 0.2, 0, s * 0.25);

    let armA = -60, armB = 60, legA = -30, legB = 30;

    if (poseIndex === 1) { armA = -80; armB = -20; legA = -15; legB = 35; }
    if (poseIndex === 2) { armA = -20; armB = 80; legA = -35; legB = 10; }
    if (poseIndex === 3) { armA = -90; armB = 90; legA = -10; legB = 45; }
    if (poseIndex === 4) { armA = -40; armB = 40; legA = -70; legB = 10; }
    if (poseIndex === 5) { armA = -10; armB = 70; legA = -20; legB = 70; }
    if (poseIndex === 6) { armA = -70; armB = 10; legA = -45; legB = 45; }
    if (poseIndex === 7) { armA = -100; armB = 0; legA = -15; legB = 55; }
    if (poseIndex === 8) { armA = 0; armB = 100; legA = -55; legB = 15; }
    if (poseIndex === 9) { armA = -30; armB = 110; legA = -10; legB = 35; }
    if (poseIndex === 10){ armA = -110; armB = 30; legA = -35; legB = 10; }
    if (poseIndex === 11){ armA = -55; armB = 55; legA = -80; legB = 0; }
    if (poseIndex === 12){ armA = -75; armB = 75; legA = -25; legB = 60; }

    let shoulderY = -s * 0.15;
    let hipY = s * 0.2;
    let armLen = s * 0.35;
    let legLen = s * 0.4;

    p.line(0, shoulderY, p.cos(armA) * armLen, shoulderY + p.sin(armA) * armLen);
    p.line(0, shoulderY, p.cos(armB) * armLen, shoulderY + p.sin(armB) * armLen);

    p.line(0, hipY, p.cos(legA) * legLen, hipY + p.sin(legA) * legLen);
    p.line(0, hipY, p.cos(legB) * legLen, hipY + p.sin(legB) * legLen);

    p.pop();
  }

  p.draw = function () {
    p.background(248);

    let hour = p.hour();
    let minute = p.minute();

    let hour12 = hour % 12;
    if (hour12 === 0) {
      hour12 = 12;
    }

    let minuteText = minute < 10 ? "0" + minute : "" + minute;

    p.translate(p.width / 2, p.height / 2);

    p.noFill();
    p.stroke(220);
    p.strokeWeight(10);
    p.circle(0, 0, 560);

    let r = 260;
    for (let i = 1; i <= 12; i++) {
      let angle = -90 + (i - 1) * 30; 
      let x = p.cos(angle) * r;
      let y = p.sin(angle) * r;
      drawMiniDancer(i, x, y, 48);
    }

    p.noStroke();
    p.fill(60);
    p.circle(0, 0, 10);

    p.fill(40);
    p.textSize(32);
    p.text("Time: " + hour12 + ":" + minuteText, 0, 0);
  };

  p.windowResized = function () { };
});