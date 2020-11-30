import {NoticeError} from '../utility/notifications.js';
import formatURL from './formaturl.js';
import pageScript from '../pages/__all.js';

/**
 *  Change page and provide callback
 *  
 *  @func getPageContent
 *  @param {String} url
 */
export default function updateContent(url){
  let href = formatURL(url, window.location.origin);

  // Get output div
  let output = document.getElementById('content');

  // Add loading class to wrapper
  document.body.classList.add('loading');

  // Fetch new content
  fetch(`/async${href.page}`)
    .then(response => {
      if (response.ok) return response.text();

      throw new Error('404 - the page you requested could not be found');
    })
    .then(data => {
      // Clear existing content
      while (output.hasChildNodes()) {
        output.removeChild(output.lastChild);
      }

      // Append new content
      output.innerHTML = data;

      // Load scripts for pages based on page name
      let pageFunctions = pageScript[href.name] || false;

      // Run functions
      if (pageFunctions) pageFunctions();

      // Remove loading class
      document.body.classList.remove('loading');
    })
    .catch(err => {
      // Notify user to error
      new NoticeError(err);

      // Show error message on page\
      output.innerHTML = `<h1>Error</h1><p>Sorry, an error occured. The message received is, "${err}".</p>`;

      // Remove loading class
      document.body.classList.remove('loading');
    });
}
