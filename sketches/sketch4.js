// Instance-mode sketch for tab 4
// HWK 4, Sketch C - Candle Clock
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(700, 700);
    p.textAlign(p.CENTER, p.CENTER);
    p.angleMode(p.DEGREES);
  };

  p.draw = function () {
    p.background(248);

    let hour = p.hour();
    let minute = p.minute();
    let isPM = hour >= 12;

    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12;

    let minuteText = minute < 10 ? "0" + minute : "" + minute;

    p.fill(90);
    p.textSize(34);
    p.text("Time: " + hour12 + ":" + minuteText, p.width / 2, 600);

    p.textSize(16);
    p.text(isPM ? "PM" : "AM", p.width / 2, 625);


    let topMargin = 150;

    let flameGap = 10;       
    let flameH = 80;         
    let wickH = 24;          

    let baseOffsetY = 38;
    let baseH = 42;

    let candleWidth = 140;

    let maxFitHeight = p.height - topMargin - (flameH + wickH + flameGap) - (baseOffsetY + baseH) - 18;                 

    let candleHeight = p.min(500, maxFitHeight);

    p.push();
    p.translate(p.width / 2, topMargin);

    let candleTopY = 0;

    let burnedHeight = candleHeight * (hour / 24);

    let wickTopY = candleTopY - wickH;
    let wickBottomY = candleTopY - 6; 
    let flameCenterY = wickTopY - flameH / 2 - flameGap;

    p.noStroke();
    p.fill(255, 180, 80);
    p.ellipse(0, flameCenterY, 52, flameH);

    p.stroke(120);
    p.strokeWeight(6);
    p.strokeCap(p.ROUND);
    p.line(0, wickTopY + 8, 0, wickBottomY);

    p.noStroke();
    p.fill(235);
    p.rect(-candleWidth / 2, candleTopY, candleWidth, candleHeight, 28);

    p.fill(240);
    p.rect(
      -candleWidth / 2,
      candleTopY + burnedHeight,
      candleWidth,
      candleHeight - burnedHeight,
      28
    );

    let marksTopY = candleTopY + 12;
    let marksBottomY = candleTopY + candleHeight - 12;

    let minuteSideX = -candleWidth / 2 + 12;
    for (let i = 0; i < 60; i++) {
      let y = p.map(i, 0, 59, marksTopY, marksBottomY);
      let isBold = i % 10 === 0;

      p.stroke(150);
      p.strokeWeight(isBold ? 3 : 2);
      p.line(minuteSideX, y, minuteSideX + (isBold ? 20 : 12), y);
    }

    let hourSideX = candleWidth / 2 - 32;
    for (let i = 1; i <= 12; i++) {
      let y = p.map(i, 1, 12, marksTopY, marksBottomY);
      p.stroke(150);
      p.strokeWeight(4);
      p.line(hourSideX, y, hourSideX + 20, y);
    }

    let waxColor = isPM ? p.color(180, 200, 255) : p.color(255, 220, 160);

    p.noStroke();
    p.fill(waxColor);

    let minuteHandY = p.map(minute, 0, 59, marksTopY, marksBottomY);
    p.ellipse(minuteSideX + 16, minuteHandY, 14, 14);

    let hourHandY = p.map(hour12, 1, 12, marksTopY, marksBottomY);
    p.ellipse(hourSideX + 16, hourHandY, 16, 16);

    p.fill(225);
    p.ellipse(
      0,
      candleTopY + candleHeight + baseOffsetY,
      candleWidth * 2.4,
      baseH
    );

    p.pop();
  };
});