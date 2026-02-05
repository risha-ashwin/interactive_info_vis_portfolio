// Instance-mode sketch for tab 4
// HWK 4, Sketch C - Candle Clock
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(400, 400);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
  };
  p.draw = function () {
    p.background(248);
    let hour = p.hour();
    let minute = p.minute();
    let isPM = hour >= 12;
    if (isPM >= 12) {
      let waxColor =p.color(180, 200, 255);
    }
    else {
      let waxColor = p.color(255, 220, 180);
    }
    p.translate(p.width / 2, p.height / 2 + 80);

    let candleHeight = 300;
    let burnedHeight = candleHeight * (hour / 24);

    p.fill(240);
    p.rect(-40, -200 + burnedHeight, 80, candleHeight - burnedHeight, 12);

    p.fill(waxColor);
    for (let i = 0; i < minute / 5; i++) {
      p.rect(-48, -180 + i * 22, 10, 18, 4)
    }

    p.fill(220);
    p.ellipse(0, 110, 140, 30);

    p.fill(255, 180, 80);
    p.ellipse(0, -230 + burnedHeight, 30, 50);
  };
  
});
