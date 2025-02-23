import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateExercise } from "@/hooks/use-exercise";
import { Navigate } from "react-router-dom";

interface CreateExerciseFormProps {
  className?: string;
}

export function CreateExerciseForm({ className }: CreateExerciseFormProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [lowReps, setLowReps] = useState<number | "">("");
  const [medReps, setmedReps] = useState<number | "">("");
  const [highReps, setHighReps] = useState<number | "">("");

  const { createExercise, loading, error, success } = useCreateExercise();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lowReps === "" && medReps === "" && highReps === "") {
      alert("Please fill out all fields correctly.");
      return;
    }
    const goals = [lowReps, medReps, highReps].map(Number);
    if (lowReps != "" && lowReps < 0) {
      alert("Repetitions must be positive numbers.");
      return;
    }
    if (medReps != "" && medReps < 0) {
      alert("Repetitions must be positive numbers.");
      return;
    }
    if (highReps != "" && highReps < 0) {
      alert("Repetitions must be positive numbers.");
      return;
    }
    await createExercise(exerciseName, goals);
    Navigate("/exercises")
  };

  return (
    <div className={`p-4 rounded-lg ${className}`}>
      <h2 className="text-xl font-semibold text-center mb-4">Create New Exercise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="exercise-name">Exercise Name</Label>
          <Input
            id="exercise-name"
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="low-reps">1-5 Reps</Label>
            <Input
              id="low-reps"
              type="number"
              min="0"
              value={lowReps}
              onChange={(e) => setLowReps(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="medium-reps">6-10 Reps</Label>
            <Input
              id="medium-reps"
              type="number"
              min="0"
              value={medReps}
              onChange={(e) => setmedReps(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="high-reps">11+ Reps</Label>
            <Input
              id="high-reps"
              type="number"
              min="0"
              value={highReps}
              onChange={(e) => setHighReps(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Create Exercise"}
        </Button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">Exercise created successfully!</p>}
      </form>
    </div>
  );
}
