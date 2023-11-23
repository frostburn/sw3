import { mmod } from 'xen-dev-utils'

const MIDI_NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Find MIDI note name from MIDI note number
export function midiNoteNumberToName(noteNumber: number) {
  const remainder = mmod(noteNumber, 12)
  const quotient = (noteNumber - remainder) / 12
  return MIDI_NOTE_NAMES[remainder] + quotient.toString()
}
