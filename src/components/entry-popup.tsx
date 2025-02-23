import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RepRangeDropdown } from "@/components/ui/rep-range-dropdown";

interface EntryPopupProps {
  exercise: { name: string; id: string };
  onClose: () => void;
}

export function EntryPopup({ exercise, onClose }: EntryPopupProps) {
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = () => {
    console.log({ weight, sets, reps });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/65">
      <div className="bg-zinc-800 border-2 border-black p-6 rounded-lg shadow-lg w-96">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <h2 className="text-xl font-bold col-span-4 mb-4">{exercise.name}</h2>
          <Button className="align-right" variant="outline" onClick={onClose}>
            Exit
          </Button>
        </div>

        <div className="mb-4">
          <Label className="mb-1" htmlFor="sets">
            Sets
          </Label>
          <Input
            id="sets"
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-3 justify-end">
          <Label className="mb-2" htmlFor="reps">
            Reps
          </Label>
          <RepRangeDropdown />
        </div>
        <div className="mb-8">
          <Label className="mb-1" htmlFor="weight">
            Weight (lbs)
          </Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="w-full justify-end gap-2">
          <Button
            className="bg-zinc-200 text-black outline-2 outline-black w-full mr-"
            type="submit"
            variant="outline"
            onClick={handleSubmit}
          >
            Add Entry
          </Button>
        </div>
      </div>
    </div>
  );
}
