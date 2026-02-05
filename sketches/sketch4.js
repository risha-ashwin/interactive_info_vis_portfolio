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

    p.translate(p.width / 2, p.height / 2 + 50);


    let candleHeight = 220;
    let candleTopY = -160;
    let burnedHeight = candleHeight * (hour / 24);

    p.noStroke();
    p.fill(240);
    p.rect(-40, candleTopY + burnedHeight, 80, candleHeight - burnedHeight, 12);

    let marksTopY = candleTopY + burnedHeight + 10;
    let marksBottomY = candleTopY + candleHeight - 10;
    
    let minuteSideX = -58;
    for (let i = 0; i < 60; i++) {
      let y = p.map(i, 0, 59, marksTopY, marksBottomY);
      let isBold = (i % 10 === 0);
      let markLength = isBold ? 18 : 10;
      let markWeight = isBold ? 4 : 2;
      p.stroke(150);
      p.strokeWeight(markWeight);
      p.line(minuteSideX, y, minuteSideX + markLength, y);
    }

    let hourSideX = 45;
    for (let i = 0; i < 12; i++) {
      let y = p.map(i, 0, 11, marksTopY, marksBottomY);
      p.stroke(150);
      p.strokeWeight(4);
      p.line(hourSideX, y, hourSideX + 18, y);
    }
    
    let waxColor = p.color(255, 220, 180);
    if (isPM ) {
      waxColor = p.color(180, 200, 255);
    }
    
    p.noStroke();
    p.fill(waxColor);

    let minuteHandY = p.map(minute, 0, 59, marksTopY, marksBottomY);
    p.ellipse(minuteSideX + 14, minuteHandY, 14, 14);

    let hour12 = hour % 12;
    if (hour12 === 0) {
      hour12 = 12;
    }
    let hourHandY = p.map(hour12, 1, 12, marksTopY, marksBottomY);
    p.ellipse(hourSideX + 14, hourHandY, 16, 16);

    p.fill(225);
    p.ellipse(0, 85, 160, 32);

    p.fill(255, 180, 80);
    p.ellipse(0, candleTopY + burnedHeight - 20, 30, 50);

    p.fill(90);
    p.textSize(14);
    p.textAlign(p.LEFT, p.CENTER);
    p.text("Time: " + hour12 + ":" + minuteText, 70, -60);
  };
  
});
