let replaceWindowOrigin = (url, origin) => url.replace(origin, '');

/**
 *  Format a supplied URL to correctly route to content
 *  
 *  @param {String} url
 *  @param {Boolean} origin
 */
export default function formatURL(href, origin = false){
  // Strip out window hostname/origin
  if (origin) href = replaceWindowOrigin(href, origin);

  // If no href supplied, default to '/index.html'
  if (!href || href === '/') href = '/index.html';

  // Regex pattern for missing trailing slashes
  const regex = /(.+)(\/|\.html)$/gi;

  // Standardise URL with forced trailing slash
  if (!regex.test(href)) href += '/';

  // Get path and file
  let page = href.replace(/\/$/, '.html');
  let location = href === '/index/' || href === '/index.html' ? '/' : href.replace(/\.html$/, '/');

  // Split into path (if necessary)
  let path = href.replace(/\.html$/gm, '').split('/').filter(Boolean);

  // Get name (for scripts)
  let name = path[path.length - 1];

  // Return data
  return {page, location, name, path};
}
