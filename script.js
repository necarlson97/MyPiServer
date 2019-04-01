// Set the draw-able height / width
// TODO could make this dynamic
const width = window.innerWidth;
const height = window.innerHeight;
var two = new Two({ width, height});
// All streak lines will be placed in this group
var group = two.makeGroup();

// Swappable function to determine the
// generation of new streaks
// TODO idealy would account for the hypotonuse
// length, rather than just w & h
function randStart() {
  return Math.random() - .5;
}

// A function for generating streaks at the
// center of the view, to be stretched,
// and move otwards
const maxLineStart = 500;
function newStreak() {
  const w = randStart();
  const h = randStart();
  const line = two.makeLine(0, 0,
    w * maxLineStart, h * maxLineStart);
  line.stroke = '#afafaf';
  line.scale = 0.01;

  const x = w * maxLineStart * .5;
  const y = h * maxLineStart * .5;

  // Allows us to easily move / rotate the whole
  group.add(line);

  streak = {x, y, w, h, line};
  return streak;
}

// A single update step for the streaks,
// involves 
function update(streaks) {
  for (let i=0; i<streaks.length; i++) {
    streak = streaks[i];
    streak.line.scale += 0.05;
    streak.x += streak.w * maxLineStart * 0.1;
    streak.y += streak.h * maxLineStart * 0.1;
    streak.line.translation.set(streak.x, streak.y);

    const maxX = width / 2;
    const maxY = height - (height/3);

    // Just some fun coloring;
    let r = Math.abs(streak.x) / maxX;
    const g = 50;
    let b = Math.abs(streak.y) / maxY;
    r *= 150;
    b *= 150;

    streak.line.stroke = `rgb(${r}, ${g}, ${b})`;

    if (streak.x > maxX || streak.x < -maxX
        || streak.y > maxY || streak.y < -maxY
        || streak.line.scale > 10) {
      streak.line.remove();
      streaks[i] = newStreak(group);
    }
  }
}

// Initilize two.js, create first streaks, and
// set update function
const streakCount = 200;
window.onload = function() {
    // Simply set draw-able frame to starting width / height
    // Create 'two.js' canvas
    let elem = document.getElementById('draw');
    two.appendTo(elem);

    group.translation.set(width / 2, height / 3);

    let streaks = []
    for (let i=0; i<streakCount; i++) {
      streaks.push(newStreak(group));
    }

    two.bind('update', function(frameCount) {
      update(streaks, group)
    }).play();
}

// Allows the center of the effect
// to 'sway' with the mouse, moving
// up to 'maxDeviation' pixels away
const maxDeviation = 100;
function mouseMove(event) {
  const baseX = width/2;
  const baseY = height/3;

  let x = event.clientX / width;
  let y = event.clientY / height;

  x *= maxDeviation;
  y *= maxDeviation;

  x -= maxDeviation / 2;
  y -= maxDeviation / 2;

  group.translation.set(baseX + x, baseY + y);
}
