interface ProgressBarProps {
  progress: number; // 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-xs mx-auto mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-zinc-500 transition-[width] duration-300 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
