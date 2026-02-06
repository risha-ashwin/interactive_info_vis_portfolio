// Instance-mode sketch for tab 4
// HWK 4, Sketch C - Candle Clock
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(500, 500);
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
    p.textSize(26);
    p.text("Time: " + hour12 + ":" + minuteText, p.width / 2, 40);

    p.textSize(14);
    p.text(isPM ? "PM" : "AM", p.width / 2, 70);

    p.translate(p.width / 2, 120); 

    let candleHeight = 420; 
    let candleWidth = 110;
    let candleTopY = 0;

    let burnedHeight = candleHeight * (hour / 24);

    p.noStroke();
    p.fill(240);
    p.rect(
      -candleWidth / 2,
      candleTopY + burnedHeight,
      candleWidth,
      candleHeight - burnedHeight,
      24
    );

    let marksTopY = candleTopY + burnedHeight + 12;
    let marksBottomY = candleTopY + candleHeight - 12;

    let minuteSideX = -candleWidth / 2 + 10;

    for (let i = 0; i < 60; i++) {
      let y = p.map(i, 0, 59, marksTopY, marksBottomY);
      let isBold = i % 10 === 0;

      p.stroke(150);
      p.strokeWeight(isBold ? 3 : 2);
      p.line(minuteSideX, y, minuteSideX + (isBold ? 18 : 10), y);
    }

    let hourSideX = candleWidth / 2 - 28;

    for (let i = 1; i <= 12; i++) {
      let y = p.map(i, 1, 12, marksTopY, marksBottomY);
      p.stroke(150);
      p.strokeWeight(4);
      p.line(hourSideX, y, hourSideX + 18, y);
    }

    let waxColor;
    if (isPM) {
      waxColor = p.color(180, 200, 255); 
    } else {
      waxColor = p.color(255, 220, 160);
    }

    p.noStroke();
    p.fill(waxColor);

    let minuteHandY = p.map(minute, 0, 59, marksTopY, marksBottomY);
    p.ellipse(minuteSideX + 14, minuteHandY, 14, 14);

    let hourHandY = p.map(hour12, 1, 12, marksTopY, marksBottomY);
    p.ellipse(hourSideX + 14, hourHandY, 16, 16);

    p.fill(255, 180, 80);
    p.ellipse(0, candleTopY + burnedHeight - 30, 46, 72);

    p.fill(225);
    p.ellipse(0, candleTopY + candleHeight + 40, 220, 36);
  };
});