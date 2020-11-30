/**
 *  Check element is link, with valid href set
 * 
 *  @param {Event} e
 */
export default function checkPathForLink(e){
  let elementIsATag = el => el.tagName.toUpperCase() === 'A';

  // Check if element is A tag
  if (elementIsATag(e.target)) return e.target;

  // Get DOM tree path
  let path = e.path || (e.composedPath && e.composedPath());

  // Loop through path and check if parents are A tags
  for (let element of path) if (element.tagName && elementIsATag(element)) return element;

  // Return false if not a tag
  return false;
}
