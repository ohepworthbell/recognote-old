import updateContent from './state/updatecontent.js';
import checkPathForLink from './state/checkpathforlink.js';
import StateManager from './state/statemanager.js';
import InteractionSounds from './sounds/interactionsounds.js';

/**
 *  Wrapper for sounds used throughout the app (e.g. for
 *  button clicks, other UI improvements...). Global variables
 *  aren't ideal, but this is a quick and easy solution
 * 
 */
window.sounds = new InteractionSounds();

/**
 *  Add functionality to main menu
 *  
 *  @class
 *  @func App
 */
class App {
  constructor() {
    this.statemanager = new StateManager();
    this.isLink = checkPathForLink;

    // Set handlers
    this.addHandlers();
  }

  addHandlers() {
    document.body.addEventListener('click', e => {
      // Check if element is a link, and has a href attribute
      let link = this.isLink(e);

      // If link doesn't exist, or has no href, continue with default click action
      if (!link || !link.href || link.getAttribute('href') === '#') return;

      // Check if link is external
      if (link.target && link.target === '_blank') return;

      // If link, prevent default actions
      e.preventDefault();
      e.stopPropagation();

      // Get link href
      let href = link.getAttribute('href');

      // Add vibtration for haptic feedback
      if (window.navigator.vibrate) window.navigator.vibrate(50);

      // Get content
      updateContent(href);
      this.statemanager.state = href;
    });

    window.addEventListener('load', () => {
      this.statemanager.state;
    });
  }
}

new App();
