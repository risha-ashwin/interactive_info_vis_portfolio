// Instance-mode sketch for tab 4
// HWK 4, Sketch C - Candle Clock
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(600, 700);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(248);

    let hour = p.hour();
    let minute = p.minute();
    let isPM = hour >= 12;

    let hour12 = hour % 12;
    if (hour12 === 0) {
      hour12 = 12;
    }

    let minuteText = minute < 10 ? "0" + minute : "" + minute;

    p.fill(90);
    p.noStroke();
    p.textSize(32);
    p.text("Time: " + hour12 + ":" + minuteText, p.width / 2, 60);

    let waxColor = p.color(255, 220, 120);
    if (isPM) {
      waxColor = p.color(130, 180, 255);
    }

    p.translate(p.width / 2, 120);

    let candleWidth = 240;
    let candleHeight = 480;
    let candleTopY = 0;

    let burnedHeight = candleHeight * (hour / 24);

    p.noStroke();
    p.fill(240);
    p.rect(-candleWidth / 2, candleTopY + burnedHeight, candleWidth, candleHeight - burnedHeight, 30);

    let marksTopY = candleTopY + burnedHeight + 25;
    let marksBottomY = candleTopY + candleHeight - 25;

    let minuteSideX = -candleWidth / 2 + 10;

    for (let i = 0; i < 60; i++) {
      let y = p.map(i, 0, 59, marksTopY, marksBottomY);

      let isBold = (i % 10 === 0);
      let markLength = isBold ? 30 : 18;
      let markWeight = isBold ? 5 : 3;

      p.stroke(150);
      p.strokeWeight(markWeight);

      p.line(minuteSideX, y, minuteSideX + markLength, y);
    }

    let hourSideX = candleWidth / 2 - 10;

    for (let i = 0; i < 12; i++) {
      let y = p.map(i, 0, 11, marksTopY, marksBottomY);

      p.stroke(150);
      p.strokeWeight(5);

      p.line(hourSideX, y, hourSideX - 30, y);
    }

    p.noStroke();
    p.fill(waxColor);

    let minuteHandY = p.map(minute, 0, 59, marksTopY, marksBottomY);
    let minuteDotX = -candleWidth / 2 + 55; 
    p.ellipse(minuteDotX, minuteHandY, 22, 22);

    let hourHandY = p.map(hour12, 1, 12, marksTopY, marksBottomY);
    let hourDotX = candleWidth / 2 - 55; 
    p.ellipse(hourDotX, hourHandY, 26, 26);

    p.noStroke();
    p.fill(225);
    p.ellipse(0, candleTopY + candleHeight + 90, candleWidth * 1.8, 60);

    p.fill(255, 180, 80);
    p.ellipse(0, candleTopY + burnedHeight - 35, 70, 110);
  };
});