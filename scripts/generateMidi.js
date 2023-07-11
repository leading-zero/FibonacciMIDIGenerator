
  function generateMidi() {
  const fib1 = parseInt(document.getElementById("fib1").value);
  const fib2 = parseInt(document.getElementById("fib2").value);
  const index = parseInt(document.getElementById("index").value);
  const fibonacciSequence = [fib1, fib2];
  const noteLengths = [];
  const notes = [];

  // Generate a Fibonacci sequence of 16 numbers
  for (let i = 2; i < 16; i++) {
  const nextFib = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
  fibonacciSequence.push(nextFib);
}

  console.log(fibonacciSequence);

  // Slice the first 16 numbers from the Fibonacci sequence
  noteLengths.push(...fibonacciSequence.slice(0, 16));

  let fibonacciIndex = index;

  // Loop through each note length in the noteLengths array
  for (let i = 0; i < noteLengths.length; i++) {
  const noteLength = noteLengths[i];
  // Determine the note duration based on the current note length
  const noteDuration = noteLength % 4 === 0 ? 4 : noteLength % 2 === 0 ? 2 : 1;
  // Determine the note pitch based on the current fibonacci index
  const notePitch = fibonacciSequence[fibonacciIndex] % 12 + 1;
  // Create a new MidiWriter NoteEvent object with the note pitch and duration
  const note = new MidiWriter.NoteEvent({ pitch: [notePitch], duration: noteDuration });
  // Add the new note to the notes array
  notes.push(note);
  // Increment the fibonacci index for the next note pitch
  fibonacciIndex = (fibonacciIndex + 1) % fibonacciSequence.length;
}

  console.log(notes);
  return notes;
}

  function saveMidi() {
  const notes = generateMidi(); // call generateMidi() to get the notes array
  console.log(notes);
  const track = new MidiWriter.Track();
  const tempo = new MidiWriter.TempoEvent({ bpm: 170 });

  track.addEvent(tempo);
  track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));
  track.addEvent(notes, function (event, index) { // access the notes array
  if (event.name === 'Note On') {
  event.setVelocity(100);
}
});

  const write = new MidiWriter.Writer([track]);
  const base64String = write.base64();
  const downloadLink = document.createElement('a');
  downloadLink.href = 'data:audio/midi;base64,' + base64String;
  downloadLink.download = 'output.mid';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

