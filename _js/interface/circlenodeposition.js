/**
 *  Get the coordinates of a point on a circle
 * 
 *  @param {Number} radius 
 *  @param {Number} angle in radians (e.g. 0 - 2 * Math.PI)
 *  @param {Number} midpoint center of circle (assumes center or circle has x === y)
 */
export default function CircleNodePosition(radius, angle, midpoint){
  // Force Number in arguments
  for (let arg of arguments) arg = Number(arg);

  // Get x/y position
  let x = Number((radius * Math.cos(angle) + midpoint).toFixed(2));
  let y = Number((radius * Math.sin(angle) + midpoint).toFixed(2));

  return {x, y};
}
