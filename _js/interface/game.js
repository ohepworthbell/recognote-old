import NoteWheel from './notewheel.js';
import Answer from './answer.js';
import ScoreKeeper from '../interface/scorekeeper.js';
import Note from '../sounds/note.js';

/**
 *  New game, extending NoteWheel
 * 
 *  @param {DOMelement} wrapper
 *  @param {Object} notes
 *  @param {Object} settings
 */
export default class Game extends NoteWheel {
  constructor(wrapper, notes, settings) {
    super(wrapper, notes, settings);

    // Set empty object for answers
    this.answers = [];

    // Create score keeper
    this.scoreboard = new ScoreKeeper(wrapper);

    // Establish new round
    this.newround();
    this.addHandlers(true);
  }

  /**
   *  Create a new 'game'
   * 
   */
  newround() {
    this.clearPreviousRounds();

    // Convert answer to array (if not already done so)
    let answers = Object.keys(this.notes);

    // Get size of segments
    const SEGMENT_SIZE = Math.PI * 2 / answers.length;
    const MIDPOINT = this.html.canvas.clientWidth / 2;
    const RADIUS = MIDPOINT * 0.75;
    const ANGLE_OFFSET = Math.PI / 2; // To start ring at N rather then E, minus 90deg (1/2 rad) from each angle

    // Create new answers from above array
    answers.forEach((value, i) => {
      let angle = SEGMENT_SIZE * i - ANGLE_OFFSET;

      // Create new answer
      let answer = new Answer(value, angle, RADIUS, MIDPOINT);

      // Add new answer to array
      this.answers.push(answer);

      // Append answer to wrapper
      this.wrapper.append(answer.html.button);
    });

    // Get random 'correct' answer
    this.scoreboard.correctAnswer = answers[Math.floor(Math.random() * answers.length)];
  }

  /**
   *  Add event handlers
   * 
   *  @param {Boolean} initial 
   */
  addHandlers(initial = false) {
    // Add click handler for central button
    if (initial) {
      this.html.button.addEventListener('click', e => {
        e.preventDefault();

        // Disable button to avoid multi-click conflicts
        this.html.button.disabled = true;

        // Perform sound animation
        this.toggleSoundAnimation(true);

        // Add vibtration for haptic feedback
        if (window.navigator.vibrate) window.navigator.vibrate(50);

        // Hide sound animation and re-enable button after timeout
        setTimeout(() => {
          this.toggleSoundAnimation(false);
          this.html.button.disabled = false;
        }, 2000);

        // Get octave and instrument
        let octave = this.settings.hardMode ? Math.floor(3 + Math.random() * 3) : 4;
        let instrument = this.settings.instrument;

        // Get frequency of note
        new Note(this.notes, this.scoreboard.correctAnswer, octave, instrument).play();
      });
    }

    // Add click hanlder for answers
    for (let button of this.answers) {
      button.html.button.addEventListener('click', () => {
        // Add vibtration for haptic feedback
        if (window.navigator.vibrate) window.navigator.vibrate(50);

        // Disable all answer buttons onCLick
        for (let otherButtons of this.answers) otherButtons.html.button.disabled = true;

        // Check current answer
        this.scoreboard.check(button.answer);

        // Refresh buttons after 500ms (to allow for 'click' animations to complete)
        setTimeout(() => this.newround(), 500);

        // Add new handlers after 1500ms (to allow for any animations to complete)
        setTimeout(() => this.addHandlers(), 1500);
      });
    }
  }

  /**
   *  Clear existing event handlers, remove old buttons
   * 
   */
  clearPreviousRounds() {
    if (!this.answers.length) return;

    // Remove all existing buttons
    for (let buttons of this.answers) buttons.html.button.remove();

    // Set answers to empty array
    this.answers = [];
  }
}
