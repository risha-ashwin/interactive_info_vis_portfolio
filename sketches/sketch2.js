// Instance-mode sketch for tab 2
// HWK 4, Sketch A - Dancer Poses Clock

registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(700, 700);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
  };

  function drawMiniDancer(poseIndex, x, y, size, isActive) {
    p.push();
    p.translate(x, y);

    let s = size;

    if (isActive) {
      p.noStroke();
      p.fill(240, 245, 255);
      p.circle(0, 0, s * 1.2);
    }

    p.stroke(40);
    p.strokeWeight(isActive ? 4 : 3);
    p.noFill();
    p.strokeCap(p.ROUND);

    p.fill(40);
    p.noStroke();
    p.circle(0, -s * 0.35, s * 0.28);

    p.noFill();
    p.stroke(40);
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

    p.stroke(40);
    p.strokeWeight(isActive ? 4 : 3);

    p.line(0, shoulderY, p.cos(armA) * armLen, shoulderY + p.sin(armA) * armLen);
    p.line(0, shoulderY, p.cos(armB) * armLen, shoulderY + p.sin(armB) * armLen);

    p.line(0, hipY, p.cos(legA) * legLen, hipY + p.sin(legA) * legLen);
    p.line(0, hipY, p.cos(legB) * legLen, hipY + p.sin(legB) * legLen);

    p.pop();
  }

  function drawBigDancer(size, hourAngle, minuteAngle) {
    let s = size;

    let baseStroke = p.color(175);
    let hourStroke = p.color(150, 190, 255);     
    let minuteStroke = p.color(255, 170, 205);  

    let shoulderY = -s * 0.30;
    let hipY = s * 0.20;

    let armLen = s * 0.48;
    let legLen = s * 0.58;

    let hourUsesArms = (p.sin(hourAngle) < 0);
    let minuteUsesArms = (p.sin(minuteAngle) < 0);

    p.noStroke();
    p.fill(60);
    p.circle(0, -s * 0.55, s * 0.22);

    p.stroke(baseStroke);
    p.strokeWeight(10);
    p.strokeCap(p.ROUND);
    p.noFill();
    p.line(0, -s * 0.45, 0, s * 0.25);

    p.stroke(baseStroke);
    p.strokeWeight(8);
    p.point(0, shoulderY);
    p.point(0, hipY);

    p.stroke(baseStroke);
    p.strokeWeight(6);
    p.line(0, shoulderY, p.cos(240) * (armLen * 0.55), shoulderY + p.sin(240) * (armLen * 0.55));
    p.line(0, hipY, p.cos(60) * (legLen * 0.55), hipY + p.sin(60) * (legLen * 0.55));

    function limb(anchorY, angle, len, col, w) {
      let x2 = p.cos(angle) * len;
      let y2 = anchorY + p.sin(angle) * len;

      p.stroke(col);
      p.strokeWeight(w);
      p.line(0, anchorY, x2, y2);

      p.noStroke();
      p.fill(col);
      p.circle(x2, y2, w * 1.15);
    }

    if (hourUsesArms) {
      limb(shoulderY, hourAngle, armLen, hourStroke, 14);
    } else {
      limb(hipY, hourAngle, legLen, hourStroke, 14);
    }

    if (minuteUsesArms) {
      limb(shoulderY, minuteAngle, armLen * 0.92, minuteStroke, 12);
    } else {
      limb(hipY, minuteAngle, legLen * 0.92, minuteStroke, 12);
    }
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

    let hourAngle = -90 + (hour12 - 1) * 30 + (minute / 60) * 30;
    let minuteAngle = -90 + (minute / 60) * 360;

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
      let isActive = (i === hour12);
      drawMiniDancer(i, x, y, 48, isActive);
    }

    drawBigDancer(260, hourAngle, minuteAngle);

    p.noStroke();
    p.fill(40);
    p.textSize(32);
    p.text("Time: " + hour12 + ":" + minuteText, 0, -210);

    p.fill(120);
    p.textSize(14);
    p.text("Top half uses ARMS,  Bottom half uses LEGS", 0, 260);
  };

  p.windowResized = function () { };
});