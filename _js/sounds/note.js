import ocataveMultiplier from './ocatavemultiplier.js';

/**
 *  Create new frequency from provided note
 * 
 *  @param {Object} notesObj
 *  @param {String} note
 *  @param {Number} octave
 *  @param {String} instrument
 */
export default class Note {
  constructor(notesObj, note, octave = 4, instrument = null) {
    this.notesObj;
    this.note = note;
    this.octave = octave;
    this.instrument = instrument;
    this.frequency = parseFloat(notesObj[this.note].frequency);
  }

  play() {
    // Create new audio context
    let context = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator
    let oscillator = context.createOscillator();

    // Add common settings to oscillator, connect to destination
    oscillator.type = 'sine';
    oscillator.connect(context.destination);

    // Set correct pitch for note
    oscillator.frequency.value = ocataveMultiplier(this.frequency, this.octave);

    // Play note for 300ms
    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
  }
}
