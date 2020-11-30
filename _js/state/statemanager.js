import updateContent from './updatecontent.js';
import formatURL from './formaturl.js';

/**
 *  Request or save the current history state, allowing for
 *  traversal of the app without an entire page refresh
 *  
 */
export default class StateManager {
  constructor() {
    this.handlers();
  }

  /**
   *  Get current state (e.g. on page load or history.back)
   * 
   */
  get state() {
    // Check if state exists, and if not create one
    let currentState = history.state ? history.state.page : window.location.pathname;

    // If state is '/' convert to 'index'
    if (currentState === '/') currentState = '/index.html';

    // If state exists, get relevant content
    updateContent(currentState);
  }

  /**
   *  Set current state
   * 
   *  @param {String} url
   */
  set state(href) {
    // Get state information
    let currentState = formatURL(href, window.location.origin);

    // Set new history state
    history.pushState(currentState, 'Page', currentState.location);
  }

  /**
   *  Add event handlers for state management
   * 
   */
  handlers() {
    window.addEventListener('popstate', () => this.state);
  }
}
