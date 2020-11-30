/**
 *  Multiply frequency by 2 until correct octave is reached
 *  
 *  @func ocataveMultiplier
 *  @param {Number} frequency
 *  @param {Number} octave
 */
export default function ocataveMultiplier(frequency, octave = 4){
  while (octave--) frequency *= 2;

  return parseFloat(frequency).toFixed(2);
}
