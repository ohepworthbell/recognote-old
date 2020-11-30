/**
 *  Draw circle that reacts to taps to indicate sound
 *  
 *  @param {DOMElement} canvas
 *  @param {Array} nodes
 */
export default function drawSoundCircle(canvas, nodes){
  let context = canvas.getContext('2d');

  // Clear context
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Move to initial position
  let startCoords = nodes[0].calculateCoords();
  let endCoords = nodes[nodes.length - 1].calculateCoords();

  // Get offset for coords, to create smooth line at end loop
  let startCoordsOffset = {
    x: (startCoords.x + endCoords.x) / 2,
    y: (startCoords.y + endCoords.y) / 2
  };

  // Start line
  context.beginPath();
  context.moveTo(startCoordsOffset.x, startCoordsOffset.y);

  // Loop through points of circle and draw curved lines
  for (let i = 0; i < nodes.length - 1; i++) {
    let currentCoords = nodes[i].calculateCoords();
    let nextCoords = nodes[i + 1].calculateCoords();
    let nextCoordsOffset = {
      x: (currentCoords.x + nextCoords.x) / 2,
      y: (currentCoords.y + nextCoords.y) / 2
    };

    context.quadraticCurveTo(currentCoords.x, currentCoords.y, nextCoordsOffset.x, nextCoordsOffset.y);
  }

  // Loop back to start
  context.quadraticCurveTo(endCoords.x, endCoords.y, startCoordsOffset.x, startCoordsOffset.y);

  // Stroke path
  context.closePath();
  context.stroke();
}
