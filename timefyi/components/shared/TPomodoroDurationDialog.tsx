import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Input from "../ui/input";
export default function TPomodoroDurationDialog({
  open,
  onOpenChange,
  pomodoroMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pomodoroMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  onSave: (vals: {
    pomodoroMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
  }) => void;
}) {
  const [pomodoro, setPomodoro] = React.useState(String(pomodoroMinutes));
  const [shortBreak, setShortBreak] = React.useState(String(shortBreakMinutes));
  const [longBreak, setLongBreak] = React.useState(String(longBreakMinutes));

  React.useEffect(() => {
    setPomodoro(String(pomodoroMinutes));
    setShortBreak(String(shortBreakMinutes));
    setLongBreak(String(longBreakMinutes));
  }, [pomodoroMinutes, shortBreakMinutes, longBreakMinutes]);

  const handleSave = () => {
    const p = Math.max(1, parseInt(pomodoro || "0", 10) || 1);
    const s = Math.max(1, parseInt(shortBreak || "0", 10) || 1);
    const l = Math.max(1, parseInt(longBreak || "0", 10) || 1);

    onSave({
      pomodoroMinutes: p,
      shortBreakMinutes: s,
      longBreakMinutes: l,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-full  max-w-[220px] w-[300px] px-3">
        <DialogTitle />

        <div className="flex flex-col gap-3 mt-3">
          <div>
            <label className="text-sm text-zinc-400">
              Pomodoro Duration (minutes)
            </label>
            <Input
              value={pomodoro}
              onChange={(e) => setPomodoro(e.target.value)}
              placeholder="25"
              className="mt-1 bg-zinc-800 p-2 rounded"
            />
          </div>
          <div className="flex gap-3 justify-between">
            <div>
              <label className="text-sm text-zinc-400">Short Break (min)</label>
              <Input
                value={shortBreak}
                onChange={(e) => setShortBreak(e.target.value)}
                placeholder="5"
                className="mt-1 bg-zinc-800 p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Long Break (min)</label>
              <Input
                value={longBreak}
                onChange={(e) => setLongBreak(e.target.value)}
                placeholder="15"
                className="mt-1 bg-zinc-800 p-2 rounded"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-center">
          <Button
            className="w-full bg-zinc-700 hover:bg-zinc-500"
            onClick={handleSave}
          >
            Update Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
