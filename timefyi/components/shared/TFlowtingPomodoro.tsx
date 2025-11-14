import { Rnd } from "react-rnd";

interface Props {
  open: boolean;
  onClose: () => void;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  onTogglePlay: () => void;
}

export default function TFloatingPomodoro({
  open,
  onClose,
  minutes,
  seconds,
  isRunning,
  onTogglePlay,
}: Props) {
  if (!open) return null;

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 240,
        height: 180,
      }}
      bounds="window"
      dragHandleClassName="drag-handle"
      className="rounded-xl shadow-lg bg-zinc-900 border border-zinc-700 p-4 text-center select-none"
    >
      <div className="flex justify-between items-center mb-3 drag-handle cursor-move">
        <span className="text-zinc-400 text-sm">time.fyi</span>
        <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
          ✕
        </button>
      </div>

      <div className="text-5xl font-bold text-white mb-3">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <button
        onClick={onTogglePlay}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 text-white mx-auto hover:bg-zinc-700"
      >
        {isRunning ? "❚❚" : "▶"}
      </button>
    </Rnd>
  );
}
