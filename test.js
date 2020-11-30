import test from 'ava';
import CircleNodePosition from './_js/interface/circlenodeposition.js';
import formatURL from './_js/state/formaturl.js';

// Test regex for getting page names
test(`Check regex for page state`, t => {
  let urls = [
    [formatURL('/'), '/index.html', '/', 'index'],
    [formatURL('/index'), '/index.html', '/', 'index'],
    [formatURL('/index/'), '/index.html', '/', 'index'],
    [formatURL('/search/'), '/search.html', '/search/', 'search'],
    [formatURL('/search'), '/search.html', '/search/', 'search'],
    [formatURL('/about.html'), '/about.html', '/about/', 'about']
  ];

  // Page
  for (let i = 0; i < urls.length; i++) {
    // Test correct page
    t.is(urls[i][0].page, urls[i][1]);

    // Test correct location
    t.is(urls[i][0].location, urls[i][2]);

    // Test correct page name
    t.is(urls[i][0].name, urls[i][3]);
  }
});

// Test trigonometry for getting nodes on a circle's radius
test(`Get the coordinates of a point on a circle`, t => {
  let circle1 = new CircleNodePosition(5, 0, 5);
  let circle2 = new CircleNodePosition(5, Math.PI / 2, 5);
  let circle3 = new CircleNodePosition(5, Math.PI, 5);

  t.deepEqual(circle1, {x: 10, y: 5});
  t.deepEqual(circle2, {x: 5, y: 10});
  t.deepEqual(circle3, {x: 0, y: 5});
});

// Check score keeper
test(`Check score keeper keeps correct score`, t => {
  class ScoreKeeper {
    constructor() {
      this.correctAnswer = null;
      this.currentScore = 0;
      this.topScore = 0;
    }

    check(answer) {
      if (!this.correctAnswer) return 'error';

      // Check answer, remove any 'top streak' classes if incorrect
      if (answer.toUpperCase() !== this.correctAnswer.toUpperCase()) {
        return (this.currentScore = 0);
      }

      // Increase score by 1
      this.currentScore += 1;

      // Check if score is new 'winning streak'
      this.checkTopStreak();
    }

    checkTopStreak() {
      if (this.currentScore <= this.topScore) return;

      // Update top streak input
      this.topScore = this.currentScore;
    }
  }
  let scoreboard = new ScoreKeeper();

  // Check top score and current score are both 0, currentAnswer null
  t.is(scoreboard.currentScore, 0);
  t.is(scoreboard.topScore, 0);
  t.is(scoreboard.correctAnswer, null);

  // Check error is thrown if no correctAnswer is set before checking
  t.is(scoreboard.check('D'), 'error');

  // Check correct answer can be set
  scoreboard.correctAnswer = 'C';
  t.is(scoreboard.correctAnswer, 'C');

  // Check score increases when correct answer is selected
  t.is(scoreboard.currentScore, 0);
  t.is(scoreboard.topScore, 0);

  scoreboard.check('D');
  t.is(scoreboard.currentScore, 0);
  t.is(scoreboard.topScore, 0);

  scoreboard.check('C');
  t.is(scoreboard.currentScore, 1);
  t.is(scoreboard.topScore, 1);

  scoreboard.correctAnswer = 'B';
  t.is(scoreboard.currentScore, 1);
  t.is(scoreboard.topScore, 1);

  scoreboard.check('B');
  t.is(scoreboard.currentScore, 2);
  t.is(scoreboard.topScore, 2);

  scoreboard.correctAnswer = 'F';
  t.is(scoreboard.currentScore, 2);
  t.is(scoreboard.topScore, 2);

  scoreboard.check('E');
  t.is(scoreboard.currentScore, 0);
  t.is(scoreboard.topScore, 2);
});
