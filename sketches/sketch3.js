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

    p.fill(20);
    p.noStroke();
    p.textSize(32);
    p.text(hour + ":" + minuteText + ":" + secondText, p.width / 2, p.height / 2);
  };
});
