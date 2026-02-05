// Instance-mode sketch for tab 4
// HWK 4, Sketch C - Candle Clock
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(400, 400);
    p.noLoop();
  };
  p.draw = function () {
    p.background(245);
    p.translate(p.width / 2, p.height / 2);

    p.fill(240);
    p.noStroke();
    p.rect(-40, -200, 80, 300, 10);

    p.fill(255, 180, 80);
    p.ellipse(0, -220, 30, 45);
  };
  
});
