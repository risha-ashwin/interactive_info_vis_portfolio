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
    let hourProgress = hour / 24;
    p.translate(p.width / 2, p.height / 2 + 80);

    let candleHeight = 300;
    let burnedHeight = candleHeight * hourProgress;

    p.fill(240);
    p.rect(-40, -200 + burnedHeight, 80, candleHeight - burnedHeight, 12);

    p.fill(220);
    p.ellipse(0, 110, 140, 30);

    p.fill(255, 180, 80);
    p.ellipse(0, -230 + burnedHeight, 30, 50);
  };
  
});
