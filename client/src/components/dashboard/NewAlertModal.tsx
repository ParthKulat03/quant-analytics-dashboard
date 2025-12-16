import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { addAlert } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdded: () => Promise<void>;
};

export function AddAlertModal({ open, onClose, onAdded }: Props) {
  const [symbolX, setSymbolX] = useState("BTCUSDT");
  const [symbolY, setSymbolY] = useState("ETHUSDT");
  const [threshold, setThreshold] = useState("2");

  const submit = async () => {
    const payload = {
      id: `zscore_${Date.now()}`,
      type: "zscore",
      symbol_x: symbolX,
      symbol_y: symbolY,
      tf: "1m",
      threshold: Number(threshold),
      enabled: true,
    };

    if (isNaN(payload.threshold)) {
      alert("Threshold must be a number");
      return;
    }

    await addAlert(payload);
    await onAdded();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Z-Score Alert</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={symbolY} onValueChange={setSymbolY}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
              <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
            </SelectContent>
          </Select>

          <Select value={symbolX} onValueChange={setSymbolX}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
              <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            step="0.1"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />

          <Button className="w-full" onClick={submit}>
            Create Alert
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
