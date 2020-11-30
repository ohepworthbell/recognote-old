/**
 *  Share page scripts
 * 
 */
export default function share(){
  // Share button ID
  let shareWrapper = document.getElementById('share');

  // Share function
  let shareFunction = text => {
    if (!navigator.share) return;

    navigator
      .share({
        title: document.title,
        text: text,
        url: window.location.href
      })
      .catch(console.error);
  };

  // Set default share message
  let shareMessage = localStorage.topScore
    ? `I have a best streak of ${localStorage.topScore} identifying notes on Recognote. Think you can beat me?`
    : `Think you are pitch perfect? See how many notes you can identify by ear with Recognote!`;

  // Share on page load
  shareFunction(shareMessage);

  // Hide share buttons and replace with native sharing (if supported)
  if (navigator.share) {
    shareWrapper.innerHTML = 'Native hello!';
  }
}
