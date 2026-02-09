// HW #5
registerSketch('sk5', function (p) {
  let csvFileName = "datasets/spotify_data clean.csv";

  let dataTable;

  let artistPoints = [];

  let hoveredArtistIndex = -1;

  p.preload = function () {
    dataTable = p.loadTable(csvFileName, "csv", "header");
  };

  p.setup = function () {
    let canvas = p.createCanvas(900, 600);

    canvas.style("display", "block");
    canvas.style("margin", "0 auto");

    let artistBucket = {};

    for (let i = 0; i < dataTable.getRowCount(); i++) {
      let artistName = dataTable.getString(i, "artist_name");
      if (!artistName) continue;

      let followers = Number(dataTable.getString(i, "artist_followers"));
      let popularity = Number(dataTable.getString(i, "track_popularity"));

      let explicitString = dataTable.getString(i, "explicit");
      let isExplicit = false;
      if (String(explicitString).toLowerCase() === "true" || String(explicitString) === "1") {
        isExplicit = true;
      }

      if (artistBucket[artistName] === undefined) {
        artistBucket[artistName] = {
          name: artistName,
          followers: 0,
          popularitySum: 0,
          popularityCount: 0,
          trackCount: 0,
          explicitCount: 0
        };
      }

      artistBucket[artistName].trackCount = artistBucket[artistName].trackCount + 1;

      if (Number.isFinite(followers)) {
        if (followers > artistBucket[artistName].followers) {
          artistBucket[artistName].followers = followers;
        }
      }

      if (Number.isFinite(popularity)) {
        artistBucket[artistName].popularitySum = artistBucket[artistName].popularitySum + popularity;
        artistBucket[artistName].popularityCount = artistBucket[artistName].popularityCount + 1;
      }

      if (isExplicit) {
        artistBucket[artistName].explicitCount = artistBucket[artistName].explicitCount + 1;
      }
    }

    artistPoints = [];
    for (let key in artistBucket) {
      let a = artistBucket[key];

      let avgPopularity = 0;
      if (a.popularityCount > 0) {
        avgPopularity = a.popularitySum / a.popularityCount;
      }

      let explicitRatio = 0;
      if (a.trackCount > 0) {
        explicitRatio = a.explicitCount / a.trackCount;
      }

      let logFollowers = Math.log10(a.followers + 1);

      artistPoints.push({
        name: a.name,
        followers: a.followers,
        logFollowers: logFollowers,
        avgPopularity: avgPopularity,
        trackCount: a.trackCount,
        explicitRatio: explicitRatio
      });
    }

    artistPoints.sort(function (a, b) {
      return b.trackCount - a.trackCount;
    });
    if (artistPoints.length > 200) {
      artistPoints = artistPoints.slice(0, 200);
    }
  };

  p.draw = function () {
    p.background(248);

    let leftMargin = 90;
    let rightMargin = 40;
    let topMargin = 130;
    let bottomMargin = 90;

    let plotWidth = p.width - leftMargin - rightMargin;
    let plotHeight = p.height - topMargin - bottomMargin;

    p.noStroke();
    p.fill(20);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(22);
    p.text("Artist Impact Map", 20, 16);

    p.fill(80);
    p.textSize(12);
    p.text(
      "Bubbles = Artists, x: Followers (log₁₀), y: Average Track Popularity, Size: Number of Tracks, Color: Explicit Percentage", 20, 46);
    drawLegend(20, 72);

    if (artistPoints.length === 0) {
      p.fill(20);
      p.textSize(14);
      p.text("No points to draw. Check the CSV path + column names.", 20, 100);
      return;
    }

    let minX = artistPoints[0].logFollowers;
    let maxX = artistPoints[0].logFollowers;
    let minY = artistPoints[0].avgPopularity;
    let maxY = artistPoints[0].avgPopularity;

    let maxTrackCount = artistPoints[0].trackCount;

    for (let i = 0; i < artistPoints.length; i++) {
      let a = artistPoints[i];

      if (a.logFollowers < minX) minX = a.logFollowers;
      if (a.logFollowers > maxX) maxX = a.logFollowers;

      if (a.avgPopularity < minY) minY = a.avgPopularity;
      if (a.avgPopularity > maxY) maxY = a.avgPopularity;

      if (a.trackCount > maxTrackCount) maxTrackCount = a.trackCount;
    }

    p.stroke(230);
    p.strokeWeight(1);
    for (let g = 0; g <= 5; g++) {
      let gx = p.lerp(leftMargin, leftMargin + plotWidth, g / 5);
      let gy = p.lerp(topMargin + plotHeight, topMargin, g / 5);
      p.line(gx, topMargin, gx, topMargin + plotHeight);
      p.line(leftMargin, gy, leftMargin + plotWidth, gy);
    }

    p.stroke(0);
    p.strokeWeight(1);
    p.line(leftMargin, topMargin + plotHeight, leftMargin + plotWidth, topMargin + plotHeight);
    p.line(leftMargin, topMargin, leftMargin, topMargin + plotHeight);

    p.noStroke();
    p.fill(40);
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Artist Followers (log₁₀ scale)", leftMargin + plotWidth / 2, p.height - 40);

    p.push();
    p.translate(30, topMargin + plotHeight / 2);
    p.rotate(-Math.PI / 2);
    p.text("Average Track Popularity (0–100)", 0, 0);
    p.pop();

    drawAxisNumbers(leftMargin, topMargin, plotWidth, plotHeight, minX, maxX, minY, maxY);

    hoveredArtistIndex = -1;

    for (let i = 0; i < artistPoints.length; i++) {
      let a = artistPoints[i];

      let x = p.map(a.logFollowers, minX, maxX, leftMargin, leftMargin + plotWidth);
      let y = p.map(a.avgPopularity, minY, maxY, topMargin + plotHeight, topMargin);

      let radius = p.map(Math.sqrt(a.trackCount), 1, Math.sqrt(maxTrackCount), 6, 30);

      let bubbleColor = getPinkColor(a.explicitRatio);

      let distToMouse = p.dist(p.mouseX, p.mouseY, x, y);
      let isHover = distToMouse <= radius;

      p.noStroke();
      p.fill(bubbleColor);
      p.circle(x, y, radius * 2);

      if (isHover) {
        hoveredArtistIndex = i;
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);
        p.circle(x, y, radius * 2 + 4);
      }

      a.screenX = x;
      a.screenY = y;
      a.screenR = radius;
    }

    if (hoveredArtistIndex !== -1) {
      drawTooltip(artistPoints[hoveredArtistIndex]);
    }
  };

  function drawAxisNumbers(leftMargin, topMargin, plotWidth, plotHeight, minX, maxX, minY, maxY) {

    p.noStroke();
    p.fill(80);
    p.textSize(10);
    p.textAlign(p.CENTER, p.TOP);

    for (let i = 0; i <= 5; i++) {
      let t = i / 5;
      let x = p.lerp(leftMargin, leftMargin + plotWidth, t);

      let value = p.lerp(minX, maxX, t);
      let label = value.toFixed(2); 

      p.stroke(0);
      p.line(x, topMargin + plotHeight, x, topMargin + plotHeight + 5);
      p.noStroke();

      p.text(label, x, topMargin + plotHeight + 10);
    }

    p.textAlign(p.RIGHT, p.CENTER);

    for (let i = 0; i <= 5; i++) {
      let t = i / 5;
      let y = p.lerp(topMargin + plotHeight, topMargin, t);

      let value = p.lerp(minY, maxY, t);
      let label = value.toFixed(0);

      p.stroke(0);
      p.line(leftMargin - 5, y, leftMargin, y);
      p.noStroke();

      p.text(label, leftMargin - 10, y);
    }
  }

  function getPinkColor(explicitRatio) {
    let r = 255;
    let g = p.map(explicitRatio, 0, 1, 200, 60);
    let b = p.map(explicitRatio, 0, 1, 230, 140);

    return p.color(r, g, b, 200);
  }

  function drawTooltip(a) {
    let boxWidth = 340;
    let boxHeight = 120;

    let x = a.screenX + 16;
    let y = a.screenY - boxHeight - 16;

    if (x + boxWidth > p.width) x = a.screenX - boxWidth - 16;
    if (y < 10) y = a.screenY + 16;

    p.noStroke();
    p.fill(255);
    p.rect(x, y, boxWidth, boxHeight, 10);

    p.stroke(0);
    p.noFill();
    p.rect(x, y, boxWidth, boxHeight, 10);

    p.noStroke();
    p.fill(20);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(12);

    let followersText = formatFollowers(a.followers);
    let explicitPercent = Math.round(a.explicitRatio * 100);

    let line1 = "Artist: " + a.name;
    let line2 = "Followers: " + followersText;
    let line3 = "Average Track Popularity: " + a.avgPopularity.toFixed(1) + " / 100";
    let line4 = "Tracks in Dataset: " + a.trackCount;
    let line5 = "Explicit Ratio: " + explicitPercent + "%";

    let padding = 10;
    let ty = y + padding;

    p.text(line1, x + padding, ty); ty += 20;
    p.text(line2, x + padding, ty); ty += 20;
    p.text(line3, x + padding, ty); ty += 20;
    p.text(line4, x + padding, ty); ty += 20;
    p.text(line5, x + padding, ty);
  }

  function drawLegend(x, y) {
    p.noStroke();
    p.fill(30);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(11);
    p.text("Explicit Ratio (pink scale)", x, y);

    for (let i = 0; i <= 10; i++) {
      let t = i / 10;
      p.fill(getPinkColor(t));
      p.rect(x + i * 18, y + 18, 18, 10);
    }

    p.fill(60);
    p.textAlign(p.LEFT, p.TOP);
    p.text("0%", x, y + 34);
    p.textAlign(p.RIGHT, p.TOP);
    p.text("100%", x + 10 * 18 + 18, y + 34);
  }

  function formatFollowers(n) {
    if (!Number.isFinite(n)) return "0";
    if (n >= 1000000000) return (n / 1000000000).toFixed(2) + "B";
    if (n >= 1000000) return (n / 1000000).toFixed(2) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(Math.round(n));
  }

});