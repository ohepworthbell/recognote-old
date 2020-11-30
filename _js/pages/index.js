/**
 *  About page scripts
 * 
 */
export default function index(){
  let difficulty = document.getElementById('difficulty');

  // Add event handler for difficulty
  difficulty.addEventListener('change', function(){
    if (this.checked) {
      localStorage.removeItem('hardMode');
    }
    else {
      localStorage.setItem('hardMode', true);
    }
  });

  // Pre-check 'hard mode' if necessary
  if (localStorage.hardMode) difficulty.checked = false;
}
