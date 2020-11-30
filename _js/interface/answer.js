import CircleNodePosition from './circlenodeposition.js';

/**
 *  Create answers for the 'quiz'
 * 
 *  @param {Array} answer
 *  @param {Number} angle
 *  @param {Number} radius
 *  @param {Number} midpoint
 */
export default class Answer {
  constructor(answer, angle, radius = 120, midpoint = 0) {
    this.answer = answer.toUpperCase();
    this.html = {};

    // Init answers
    this._create(radius, angle, midpoint);
  }

  _create(radius, angle, midpoint) {
    // Get coordinates
    let coords = new CircleNodePosition(radius, angle, midpoint);

    // Create text node for button
    let buttonContent = document.createTextNode(this.answer);

    // Create test answer
    this.html.button = document.createElement('button');
    this.html.button.appendChild(buttonContent);
    this.html.button.classList.add('answer');
    this.html.button.style.position = 'absolute';
    this.html.button.style.left = coords.x + 'px';
    this.html.button.style.top = coords.y + 'px';
  }

  destroy() {
    this.html.wrapper.parentNode.removeChild(this.html.button);
  }
}
