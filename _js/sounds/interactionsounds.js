/**
 *  Interaction sounds for (e.g.) button clicks
 * 
 */
export default class InteractionSounds {
  constructor() {
    this.context = null;
    this.oscillator = null;
  }

  init() {
    // Create new audio context
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator
    this.oscillator = this.context.createOscillator();

    // Add common settings to oscillator, connect to destination
    this.oscillator.type = 'sine';
    this.oscillator.connect(this.context.destination);
  }

  playClick() {
    // Play 'click' noise
  }

  playSuccess() {
    // Play 'success' noise
  }

  playError() {
    // Play 'error' noise
  }
}
