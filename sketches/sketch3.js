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

    let secondsColor = p.color(244, 143, 177);
    let minutesColor = p.color(144, 202, 249);
    let hoursColor = p.color(165, 214, 167);
    let emptyTickColor = p.color(205);
    let trackColor = p.color(235);
    let textColor = p.color(30);

    p.translate(p.width / 2, p.height / 2);

    let hourRingDiameter = 440;
    let minuteRingDiameter = 340;
    let secondRingDiameter = 250;

    let hourTrackWeight = 18;
    let minuteTrackWeight = 14;
    let secondTrackWeight = 10;


    p.noFill();
    p.stroke(trackColor);

    p.strokeWeight(hourTrackWeight);
    p.arc(0, 0, hourRingDiameter, hourRingDiameter, 0, 360);

    p.strokeWeight(minuteTrackWeight);
    p.arc(0, 0, minuteRingDiameter, minuteRingDiameter, 0, 360);

    p.strokeWeight(secondTrackWeight);
    p.arc(0, 0, secondRingDiameter, secondRingDiameter, 0, 360);

    let hourRadius = hourRingDiameter / 2;
    let minuteRadius = minuteRingDiameter / 2;
    let secondRadius = secondRingDiameter / 2;

    
    // Seconds Ticks
    p.push();
    p.rotate(-90);

    let totalSecondTicks = 60;
    let filledSecondTicks = second;

    let secondInner = secondRadius - (secondTrackWeight / 2) + 1;
    let secondOuter = secondRadius + (secondTrackWeight / 2) - 1;

    for (let i = 0; i < totalSecondTicks; i++) {
      if (i < filledSecondTicks) {
        p.stroke(secondsColor);
      }
      else {
        p.stroke(emptyTickColor);
      }
      p.strokeWeight(4);
      p.line(secondInner, 0, secondOuter, 0);
      p.rotate(360 / totalSecondTicks);
    }
    p.pop();

    // Minutes Ticks
    p.push();
    p.rotate(-90);

    let totalMinuteTicks = 60;
    let filledMinuteTicks = minute;

    let minuteInner = minuteRadius - (minuteTrackWeight / 2) + 1;
    let minuteOuter = minuteRadius + (minuteTrackWeight / 2) - 1;

    for (let i = 0; i < totalMinuteTicks; i++) {
      if (i < filledMinuteTicks) {
        p.stroke(minutesColor);
      }
      else {
        p.stroke(emptyTickColor);
      }
      p.strokeWeight(5);
      p.line(minuteInner, 0, minuteOuter, 0);
      p.rotate(360 / totalMinuteTicks);
    }
    p.pop();

    //Hours Ticks
    p.push();
    p.rotate(-90);

    let totalHourTicks = 24;
    let filledHourTicks = hour;

    let hourInner = hourRadius - (hourTrackWeight / 2) + 1;
    let hourOuter = hourRadius + (hourTrackWeight / 2) - 1;

    for (let i = 0; i < totalHourTicks; i++) {
      if (i < filledHourTicks) {
        p.stroke(hoursColor);
      }
      else {
        p.stroke(emptyTickColor);
      }
      p.strokeWeight(7);
      p.line(hourInner, 0, hourOuter, 0);
      p.rotate(360 / totalHourTicks);
    }
    p.pop();

    p.fill(textColor);
    p.noStroke();
    p.textSize(32);
    p.text(hour + ":" + minuteText + ":" + secondText, 0, 0);

    p.fill(120);
    p.textSize(12);
    p.text("OUTER = HOURS, MIDDLE = MINUTES, INNER = SECONDS", 0, 250);
  };
});
