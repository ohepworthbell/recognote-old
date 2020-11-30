import {Notice} from '../utility/notifications';

/**
 *  Keep current score
 *  
 *  @param {DOMelement} wrapper
 */
export default class ScoreKeeper {
  constructor(wrapper = null) {
    this.correctAnswer = null;
    this.currentScore = 0;
    this.topScore = 0;
    this.html = {
      wrapper: wrapper
    };

    // Check for existing top score
    this.getStoredScores();

    // Create score boxes
    this.createScoreBoxes();
  }

  createScoreBoxes() {
    function ScoreBox(score, positionClass){
      this.box = document.createElement('div');
      this.box.innerHTML = score || 0;
      this.box.classList.add('streak', positionClass);

      return this.box;
    }

    // Create score boxes
    this.html.currentScore = new ScoreBox(this.currentScore, 'left');
    this.html.topScore = new ScoreBox(this.topScore, 'right');

    // Append elements to wrapper
    if (this.html.wrapper) {
      this.html.wrapper.appendChild(this.html.currentScore);
      this.html.wrapper.appendChild(this.html.topScore);
    }
  }

  check(answer) {
    // Check answer, remove any 'top streak' classes if incorrect
    if (answer.toUpperCase() !== this.correctAnswer.toUpperCase()) {
      this.html.topScore.classList.remove('winning-streak');
      this.currentScore = 0;
      this.html.currentScore.innerHTML = 0;

      // Big vibration to indicate error
      if (window.navigator.vibrate) window.navigator.vibrate(200);

      return new Notice(`Oops, wrong answer! The correct answer was ${this.correctAnswer}`, 1500, 'error');
    }

    // Increase score by 1
    this.currentScore += 1;

    // Record score on front-end
    this.html.currentScore.innerHTML = this.currentScore;

    // Check if score is new 'winning streak'
    this.checkTopStreak();
  }

  checkTopStreak() {
    if (this.currentScore <= this.topScore) return;

    // Update top streak input
    this.topScore = this.currentScore;
    this.html.topScore.innerHTML = this.topScore;
    this.html.topScore.classList.add('winning-streak');

    // Save new top streak
    this.saveTopStreak();
  }

  saveTopStreak() {
    localStorage.setItem('topScore', this.topScore);
  }

  getStoredScores() {
    if (!localStorage.length) return;

    // Fetch top score from local storage
    this.topScore = localStorage.getItem('topScore');
    this.html.topScore = this.topScore;
  }
}
