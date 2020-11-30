import SoundNode from './soundnode.js';

/**
 *  Create nodes for the NoteWheel
 *  
 *  @constructor
 *  @func SoundNodeGroup
 *  @param {Object} settings
 */
export default function SoundNodeGroup(settings){
  // Ensure notes array is empty
  let nodes = [];

  // Get angle between segments
  let segments = Math.PI * 2 / settings.nodes;
  let radius = settings.radius;
  let midPoint = settings.canvasSize / 2;
  let maxOffset = settings.maxOffset;

  // Loop through each node and create a point on the map to draw
  for (let i = 0; i < settings.nodes; i++) {
    // Get angle and radius of node
    let angle = segments * i;

    // Get coords for node
    let coords = new SoundNode(angle, radius, midPoint, maxOffset);

    // Add node to coords
    nodes.push(coords);
  }

  return nodes;
}
