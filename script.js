const width = window.innerWidth;
const height = window.innerHeight;
var two = new Two({ width, height});

function randStart() {
  return Math.random() - .5;
}

const maxLineStart = 500;
function newStreak(group) {
  const w = randStart();
  const h = randStart();
  const line = two.makeLine(0, 0,
    w * maxLineStart, h * maxLineStart);
  line.stroke = '#afafaf';
  line.scale = 0.01;

  const x = w * maxLineStart * .5;
  const y = h * maxLineStart * .5;

  group.add(line);

  streak = {x, y, w, h, line};
  return streak;
}

function update(streaks, group) {
  for (let i=0; i<streaks.length; i++) {
    streak = streaks[i];
    streak.line.scale += 0.05;
    streak.x += streak.w * maxLineStart * 0.1;
    streak.y += streak.h * maxLineStart * 0.1;
    streak.line.translation.set(streak.x, streak.y);

    if (streak.x > width || streak.y > height
        || streak.line.scale > 10) {
      streak.line.remove();
      streaks[i] = newStreak(group);
    }
  }
}

window.onload = function() {
    // Simply set draw-able frame to starting width / height
    // Create 'two.js' canvas
    var elem = document.getElementById('draw');

    two.appendTo(elem);

    var centerX = 0;
    var centerY = 0;

    var group = two.makeGroup();
    group.translation.set(width / 2, height / 2);

    var streaks = []
    for (let i=0; i<200; i++) {
      streaks.push(newStreak(group));
    }

    two.bind('update', function(frameCount) {

      let lifeCycle = frameCount * .01;
      update(streaks, group)
    }).play();
}
