import { mmod } from 'xen-dev-utils'

const MIDI_NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Find MIDI note name from MIDI note number
export function midiNoteNumberToName(noteNumber: number, octaveOffset = -1) {
  const remainder = mmod(noteNumber, 12)
  const quotient = (noteNumber - remainder) / 12 + octaveOffset
  return MIDI_NOTE_NAMES[remainder] + quotient.toString()
}

const ENHARMONICS = [
  ['C', 'B#', 'Dbb'],
  ['C#', 'Db'],
  ['D', 'C##', 'Ebb'],
  ['Eb', 'D#'],
  ['E', 'Fb', 'D##'],
  ['F', 'E#', 'Gbb'],
  ['F#', 'Gb'],
  ['G', 'F##', 'Abb'],
  ['G#', 'Ab'],
  ['A', 'G##', 'Bbb'],
  ['Bb', 'A#'],
  ['B', 'Cb', 'A##']
]

// Find a set of Pythagorean enharmonics corresponding to a MIDI note number
export function midiNoteNumberToEnharmonics(noteNumber: number, octaveOffset = -1) {
  const remainder = mmod(noteNumber, 12)
  const quotient = (noteNumber - remainder) / 12 + octaveOffset
  const enharmonics = ENHARMONICS[remainder]
  const result = []
  for (const enharmonic of enharmonics) {
    let octave = quotient.toString()
    if (enharmonic.startsWith('B') && enharmonics[0].startsWith('C')) {
      octave = (quotient - 1).toString()
    }
    if (enharmonic.startsWith('C') && enharmonics[0].startsWith('B')) {
      octave = (quotient + 1).toString()
    }
    result.push(enharmonic + octave)
  }
  return result
}
