/**
 *  Object containing relevant notes for app
 * 
 *  @NOTE
 *  Using base frequency, you can move up scales by doubling the
 *  base frequency accordingly. Thus A1 (55.0) = A0 (27.5) * 2 and
 *  A2 (110) = A1 (55.0) * 2, etc.
 *  - https://gist.github.com/marcgg/94e97def0e8694f906443ed5262e9cbb
 */
let notes = {
  a: {
    frequency: '27.5',
    notes: ['flat', 'sharp'],
    chords: ['minor', 'major', 'major7']
  },
  b: {
    frequency: '30.87',
    notes: ['flat', 'sharp'],
    chords: ['minor', 'major', 'major7']
  },
  c: {
    frequency: '16.35',
    notes: ['flat', 'sharp'],
    chords: ['minor', 'major', 'major7']
  },
  d: {
    frequency: '18.35',
    notes: ['flat', 'sharp'],
    chords: ['minor', 'major', 'major7']
  },
  e: {
    frequency: '20.6',
    notes: ['flat', 'sharp'],
    chords: ['minor', 'major', 'major7']
  },
  f: {
    frequency: '21.83',
    notes: ['flat', 'sharp'],
    chords: ['minor', 'major', 'major7']
  },
  g: {
    frequency: '24.5',
    notes: ['flat', 'sharp'],
    chords: ['minor', 'major', 'major7']
  }
};

export default notes;
