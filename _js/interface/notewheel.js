import SoundNodeGroup from './soundnodegroup.js';
import drawSoundCircle from './drawsoundcircle.js';

/**
 *  Create wheel for interactions
 * 
 *  @param {DOMelement} wrapper
 *  @param {Object} notes
 *  @param {Object} settings
 */
export default class NoteWheel {
  constructor(wrapper, notes, settings) {
    this.wrapper = wrapper;
    this.notes = notes;
    this.html = {};

    // Set NoteWheel defaults
    this.settings = {
      nodes: 30,
      radius: 100,
      maxOffset: 40,
      lineWidth: 12,
      canvasSize: 800,
      hardMode: false,
      instrument: 'midi'
    };

    // Get settings for notewheel
    for (let key in settings) {
      if (this.settings[key] !== undefined) this.settings[key] = settings[key];
    }

    // Create nodes
    this.nodes = new SoundNodeGroup(this.settings);

    // Init NoteWheel
    this.init();
  }

  init() {
    // Create game area
    this.createGameArea();

    // Create nodes and start animation
    this.newLineSettings();
    this.startAnimation();
  }

  createGameArea() {
    // Create canvas
    this.html.canvas = document.createElement('canvas');
    this.html.canvas.width = this.settings.canvasSize;
    this.html.canvas.height = this.settings.canvasSize;

    // Get proportional width of canvas sound circle
    let buttonSize = 100 * 2 * (this.settings.radius / this.settings.canvasSize);

    // Create button for playing sounds
    this.html.button = document.createElement('button');
    this.html.button.style.width = buttonSize + '%';
    this.html.button.style.height = buttonSize + '%';
    this.html.button.style.top = (100 - buttonSize) / 2 + '%';
    this.html.button.style.left = (100 - buttonSize) / 2 + '%';
    this.html.button.type = 'button';
    this.html.button.title = 'Play sound';
    this.html.button.class = 'main-game-button';

    // Create volume image for button
    this.html.buttonImage = new Image(30, 30);
    this.html.buttonImage.src = `/img/volume.svg`;
    this.html.button.appendChild(this.html.buttonImage);

    // Append elements to game area
    this.wrapper.appendChild(this.html.canvas);
    this.wrapper.appendChild(this.html.button);
  }

  startAnimation() {
    let animate = () => {
      if (this.destroyed) return false;

      // Get coords and draw circle
      drawSoundCircle(this.html.canvas, this.nodes);

      window.requestAnimationFrame(animate);
    };

    animate();
  }

  toggleSoundAnimation(toggle = false) {
    for (let node of this.nodes) toggle ? node.startNewTween() : node.endTween();
  }

  newLineSettings() {
    let context = this.html.canvas.getContext('2d');

    // Create gradient
    let gradient = context.createLinearGradient(0, this.html.canvas.height, this.html.canvas.width, 0);

    // Set gradient colours
    gradient.addColorStop('0.3', '#3762d2');
    gradient.addColorStop('0.6', '#24c597');

    // Store line settings onto canvas
    context.strokeStyle = gradient;
    context.lineWidth = this.settings.lineWidth;
    context.lineJoin = 'round';
  }
}
