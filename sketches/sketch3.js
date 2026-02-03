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

    let hour = p.hour();
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

    // Seconds Ticks
    p.noFill();
    p.stroke(235);

    p.strokeWeight(18);
    p.arc(0, 0, hourRingDiameter, hourRingDiameter, 0, 360);

    p.strokeWeight(14);
    p.arc(0, 0, minuteRingDiameter, minuteRingDiameter, 0, 360);

    p.strokeWeight(10);
    p.arc(0, 0, secondRingDiameter, secondRingDiameter, 0, 360);

    p.push();
    p.rotate(-90);

    let totalSecondTicks = 60;
    let filledSecondTicks = second;

    for (let i = 0; i < totalSecondTicks; i++) {
      if (i < filledSecondTicks) {
        p.stroke(255, 0, 0);
      }
      else {
        p.stroke(170);
      }
      p.strokeWeight(4);
      p.line(0, -115, 0, -135);
      p.rotate(360 / totalSecondTicks);
    }
    p.pop();

    // Minutes Ticks
    p.push();
    p.rotate(-90);

    let totalMinuteTicks = 60;
    let filledMinuteTicks = minute;

    for (let i = 0; i < totalMinuteTicks; i++) {
      if (i < filledMinuteTicks) {
        p.stroke(80, 140, 255);
      }
      else {
        p.stroke(220);
      }
      p.strokeWeight(5);
      p.line(0, -158, 0, -186);
      p.rotate(360 / totalMinuteTicks);
    }
    p.pop();

    //Hours Ticks
    p.push();
    p.rotate(-90);

    let totalHourTicks = 24;
    let filledHourTicks = hour;

    for (let i = 0; i < totalHourTicks; i++) {
      if (i < filledHourTicks) {
        p.stroke(90, 200, 140);
      }
      else {
        p.stroke(220);
      }
      p.strokeWeight(7);
      p.line(0, -205, 0, -250);
      p.rotate(360 / totalHourTicks);
    }
    p.pop();

    p.fill(20);
    p.noStroke();
    p.textSize(32);
    p.text(hour + ":" + minuteText + ":" + secondText, 0, 0);
  };
});
