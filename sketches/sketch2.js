// Instance-mode sketch for tab 2
// HWK 4, Sketch A - Dancer Poses Clock

registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(700, 700); 
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
  };

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

    p.noStroke();
    p.fill(60);
    p.circle(0, 0, 10);

    p.fill(40);
    p.textSize(32);
    p.text("Time: " + hour12 + ":" + minuteText, 0, 0);
  };

  p.windowResized = function () { };
});