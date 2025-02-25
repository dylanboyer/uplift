import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RepRangeDropdown } from "@/components/ui/rep-range-dropdown";
import { useCreateEntry } from "@/hooks/use-entry";

interface EntryPopupProps {
  exercise: { name: string; id: string };
  onClose: () => void;
}

export function EntryPopup({ exercise, onClose }: EntryPopupProps) {
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState(""); // Store rep range value here
  const { createEntry, isLoading, error } = useCreateEntry();

  const handleSubmit = async () => {
    if (!weight || !sets || !reps) return;

    await createEntry({
      e_id: exercise.id,
      weight: parseInt(weight),
      sets: parseInt(sets, 10),
      rep_range_id: parseInt(reps, 10), // Ensure reps are correctly passed
      date: new Date().toISOString(),
    });

    onClose();
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
          <RepRangeDropdown value={reps} onChange={setReps} />
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

        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full justify-end gap-2">
          <Button
            className="bg-zinc-200 text-black outline-2 outline-black w-full"
            type="submit"
            variant="outline"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Entry"}
          </Button>
        </div>
      </div>
    </div>
  );
}
