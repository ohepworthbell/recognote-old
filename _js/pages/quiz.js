import Game from '../interface/game.js';
import notes from '../sounds/note_references.js';

/**
 *  Index page scripts
 * 
 */
export default function quiz(){
  // If canvas exists, create new game
  let gamearea = document.getElementById('gamearea');

  // If gamearea exists, create note wheel
  if (gamearea) {
    new Game(gamearea, notes, {
      nodes: 100,
      radius: 190,
      lineWidth: 10,
      maxOffset: 100,
      hardMode: localStorage.hardMode ? true : false,
      instrument: localStorage.instrument || 'midi'
    });
  }
}
