import { createMemo, createSignal } from "solid-js";

const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
  audio: true
});

// console.log(stream);

const mediaRecorder = new MediaRecorder(stream);

// console.log(mediaRecorder);

mediaRecorder.addEventListener("stop", function() {
  console.log(this);
});

mediaRecorder.addEventListener("dataavailable", event => {
  console.log(event.data);
  setData(event.data);
});

const [data, setData] = createSignal<Blob | null>(null);

export default function App() {
  const audio = createMemo<string | undefined>(previous => {
    if (previous) {
      URL.revokeObjectURL(previous);
    }
    const next = data();
    if (next === null) return;
    return URL.createObjectURL(next);
  });

  return (
    <>
      <h1>Daw-JS</h1>
      <button onclick={() => mediaRecorder.start()}>Start Recording</button>
      <button onclick={() => mediaRecorder.stop()}>Stop Recording</button>
      <audio src={audio()} controls/>
    </>
  );
}