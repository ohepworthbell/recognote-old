// Set constants for SoundNode
const EASE_OUT_FRAME_COUNT = 15;
const OFFSET_EASE_OUT = 0.987;
const MIN_TWEEN_VALUE = 0.05;
const MAX_TWEEN_VALUE = 0.2;

/**
 *  Create wheel for interactions
 * 
 *  @param {DOMelement} canvas
 *  @param {Object} settings
 *  @param {Number} midPoint
 *  @param {Number} maxOffset
 */
export default class SoundNode {
  constructor(angle, radius, midPoint, maxOffset) {
    this.angle = angle;
    this.radius = radius;
    this.midPoint = midPoint;
    this.maxOffset = maxOffset;
    this.offset = maxOffset;
    this.ease = 0;
    this.tween = 0;
    this.direction = 1;
    this.tweenActive = false;

    // Set default coords
    this.coords = {
      x: 0,
      y: 0
    };
  }

  getNewTweenValue() {
    // Ensure tween is between 1 and -1, to avoid getting caught in loop
    this.ease = Math.max(Math.min(this.ease, 1), -1);

    // Set tween between MIN_TWEEN_VALUE and MAX_TWEEN_VALUE;
    this.tween = Math.max(Math.random() * MAX_TWEEN_VALUE, MIN_TWEEN_VALUE);

    // Alternate current direction of tween
    this.direction *= -1;
    this.tween *= this.direction;
  }

  startNewTween() {
    // Set tweening to active
    this.tweenActive = true;

    // Get a new offset, to simulate randomness
    this.offset = this.maxOffset * Math.random() - this.maxOffset / 2;

    // Get a new tween value
    this.getNewTweenValue();
  }

  endTween() {
    // Set tween to inactive
    this.tweenActive = false;
  }

  getEase() {
    // If tween is inactive, fade it out over n-frames
    if (!this.tweenActive) {
      // If ease value is close to 0, return 0
      if (this.ease === 0) return 0;

      // Get tween value that will loop user back to 0
      this.tween = this.ease / -EASE_OUT_FRAME_COUNT;
    }
    else if (this.ease >= 1 || this.ease <= -1) {
      this.getNewTweenValue();
    }

    // Increase ease value by tween amount
    this.ease += this.tween;

    // Get ease value as quadtratic
    return this.easeInOutQuad(this.ease);
  }

  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  calculateCoords() {
    // Ease out offset
    this.offset *= OFFSET_EASE_OUT;

    // Check if tween is active
    let radius = this.radius + this.offset * this.getEase();

    // Calculate coordinates
    this.coords.x = radius * Math.cos(this.angle) + this.midPoint;
    this.coords.y = radius * Math.sin(this.angle) + this.midPoint;

    return this.coords;
  }
}
