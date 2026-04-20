"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SHORTCUTS } from "@/lib/shortcuts";
import { useShortcut } from "./shortcut-provider";

export function ShortcutsCheatsheet() {
  const [open, setOpen] = React.useState(false);
  useShortcut("?", () => setOpen(true), "global");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
        </DialogHeader>
        <table className="w-full text-sm">
          <tbody>
            {SHORTCUTS.map((s) => (
              <tr key={`${s.scope}-${s.key}`} className="border-b">
                <td className="py-1 font-mono">{s.key}</td>
                <td>{s.label}</td>
                <td className="text-xs text-muted-foreground">{s.scope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}
