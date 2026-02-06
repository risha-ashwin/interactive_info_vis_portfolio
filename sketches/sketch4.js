// Instance-mode sketch for tab 4
// HWK 4, Sketch C - Candle Clock
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(400, 400);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(248);

    let hour = p.hour();
    let minute = p.minute();
    let isPM = hour >= 12;
    let minuteText = minute < 10 ? "0" + minute : "" + minute;

    p.fill(90);
    p.textSize(18);
    p.text("Time: " + (hour % 12 === 0 ? 12 : hour % 12) + ":" + minuteText, p.width / 2, 30);

    p.translate(p.width / 2, p.height / 2 + 60);

    let candleHeight = 300;
    let candleWidth = 110;
    let candleTopY = -candleHeight / 2;
    let burnedHeight = candleHeight * (hour / 24);

    p.noStroke();
    p.fill(240);
    p.rect(-candleWidth / 2, candleTopY + burnedHeight, candleWidth, candleHeight - burnedHeight, 24);

    let marksTopY = candleTopY + burnedHeight + 12;
    let marksBottomY = candleTopY + candleHeight - 12;

    let minuteSideX = -candleWidth / 2 + 8;

    for (let i = 0; i < 60; i++) {
      let y = p.map(i, 0, 59, marksTopY, marksBottomY);
      let isBold = (i % 10 === 0);
      let markLength = isBold ? 14 : 8;
      let markWeight = isBold ? 3 : 2;
      p.stroke(150);
      p.strokeWeight(markWeight);
      p.line(minuteSideX, y, minuteSideX + markLength, y);
    }

    let hourSideX = candleWidth / 2 - 22;

    for (let i = 0; i < 12; i++) {
      let y = p.map(i, 0, 11, marksTopY, marksBottomY);
      p.stroke(150);
      p.strokeWeight(4);
      p.line(hourSideX, y, hourSideX + 14, y);
    }

    let waxColor = p.color(255, 210, 120); 
    if (isPM) {
      waxColor = p.color(160, 190, 255); 
    }

    p.noStroke();
    p.fill(waxColor);

    let minuteHandY = p.map(minute, 0, 59, marksTopY, marksBottomY);
    p.ellipse(minuteSideX + 10, minuteHandY, 14, 14);

    let hour12 = hour % 12;
    if (hour12 === 0) {
      hour12 = 12;
    }

    let hourHandY = p.map(hour12, 1, 12, marksTopY, marksBottomY);
    p.ellipse(hourSideX + 7, hourHandY, 16, 16);

    p.fill(225);
    p.ellipse(0, candleTopY + candleHeight + 30, 220, 40);

    p.fill(255, 180, 80);
    p.ellipse(0, candleTopY + burnedHeight - 28, 38, 70);
  };
});