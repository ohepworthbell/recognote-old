/**
 *  Show small, non-invasive notifications in the bottom corner of the screen
 * 
 *  @class
 *  @function Notice
 *  @param {String} message - message to show in notification
 *  @param {Integer} timeout - how long before the notification auto-removes
 *  @param {String} customclass - add custom className to notification
 */
class Notice {
  constructor(message, timeout = 5000, customclass = '') {
    if (!message) return false;

    this.message = message;
    this.timeout = !timeout || isNaN(timeout) ? 5000 : timeout;
    this.customclass = customclass;
    this.html = {};

    this.create_wrapper();
    this.create_html_element();
    this.add_notification_interactions();
  }

  create_wrapper() {
    if (window.noticesWrapper) return;

    // Create wrapper for all notifications
    window.noticesWrapper = document.createElement('div');
    window.noticesWrapper.className = 'quick-notifications';

    // Append wrapper to body
    document.body.appendChild(window.noticesWrapper);
  }

  create_html_element() {
    // Create HTML elements
    this.html.wrapper = document.createElement('div');
    this.html.message = document.createElement('span');
    this.html.closeButton = document.createElement('a');

    // Add class to wrapper
    this.html.wrapper.className = this.customclass;

    // Add message to content
    this.html.message.innerHTML = this.message;
    this.html.wrapper.appendChild(this.html.message);

    // Add 'close' button to wrapper
    this.html.closeButton.className = 'notice-close';
    this.html.closeButton.innerHTML = '&times;';
    this.html.closeButton.setAttribute('title', 'Close notification');
    this.html.closeButton.setAttribute('aria-label', 'Close notification');
    this.html.wrapper.appendChild(this.html.closeButton);

    // Append notification to body
    window.noticesWrapper.appendChild(this.html.wrapper);
  }

  add_notification_interactions() {
    // Remove after setTimeout
    let autoremove = setTimeout(() => this.hide_notification(), this.timeout);

    // Add event handler to 'close' button
    this.html.closeButton.addEventListener('click', () => {
      clearTimeout(autoremove);
      this.hide_notification();
    });

    // Record the notification in the console for reference
    console.warn(this.message);
  }

  hide_notification() {
    // Transition notification out
    this.html.wrapper.classList.add('hide');

    // Remove notification
    setTimeout(() => this.html.wrapper.remove(), 500);
  }
}

/**
 *  @class
 *  @function NoticeError @extends Notice
 */
class NoticeError extends Notice {
  constructor(message, timeout = 5000, customclass = '') {
    if (!customclass || customclass == '') customclass = 'error';
    else customclass += ' error';

    super(message, timeout, customclass);
  }
}

export {Notice, NoticeError};
