// Instance-mode sketch for tab 3
// HWK 4, Sketch B - Progress Ring Clock

registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(600, 600);
    p.angleMode(p.DEGREES);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(248);

    let hour = p.hour()
    let minute = p.minute();
    let second = p.second();

    let minuteText = minute;
    if (minute < 10) {
      minuteText = "0" + minute;
    }

    let secondText = second;
    if (second < 10) {
      secondText = "0" + second;
    }

    p.translate(p.width / 2, p.height / 2);

    let hourRingDiameter = 440;
    let minuteRingDiameter = 340;
    let secondRingDiameter = 250;

    p.noFill();
    p.stroke(210);

    p.strokeWeight(18);
    p.arc(0, 0, hourRingDiameter, hourRingDiameter, 0, 360);

    p.strokeWeight(14);
    p.arc(0, 0, minuteRingDiameter, minuteRingDiameter, 0, 360);

    p.strokeeWeight(10);
    p.arc(0, 0, secondRingDiameter, secondRingDiameter, 0, 360);

    p.fill(20);
    p.noStroke();
    p.textSize(32);
    p.text(hour + ":" + minuteText + ":" + secondText, 0, 0);
  };
});
