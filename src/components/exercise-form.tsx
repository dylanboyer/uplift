import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCreateExercise } from "@/hooks/use-exercise"; // Import the hook

interface ExerciseFormProps {
  exerciseName: string; // Prop for the exercise name
  className?: string;
}

export function ExerciseForm({
  exerciseName,
  className,
  ...props
}: ExerciseFormProps) {
  const [lowReps, setLowReps] = useState<number | "">("");
  const [mediumReps, setMediumReps] = useState<number | "">("");
  const [highReps, setHighReps] = useState<number | "">("");

  const { createExercise, isLoading, error, status } = useCreateExercise();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs (must be positive integers)
    if (
      typeof lowReps !== "number" ||
      typeof mediumReps !== "number" ||
      typeof highReps !== "number" ||
      lowReps <= 0 ||
      mediumReps <= 0 ||
      highReps <= 0
    ) {
      alert("Please enter valid positive integers for all fields.");
      return;
    }

    // Prepare the goals array
    const goals = [lowReps, mediumReps, highReps];

    // Call the createExercise function from the hook
    await createExercise(exerciseName, goals);

    // Handle success or error
    if (status === 200) {
      console.log("Exercise created successfully!");
    } else if (status === 400) {
      console.error("Failed to create exercise:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Title Label */}
      <h2 className="text-2xl font-bold text-center">{exerciseName}</h2>

      {/* Input Fields */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          {/* 1-5 Reps */}
          <div>
            <Label htmlFor="low-reps">1-5 Reps</Label>
            <Input
              id="low-reps"
              type="number"
              min="1"
              value={lowReps}
              onChange={(e) =>
                setLowReps(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          {/* 6-10 Reps */}
          <div>
            <Label htmlFor="medium-reps">6-10 Reps</Label>
            <Input
              id="medium-reps"
              type="number"
              min="1"
              value={mediumReps}
              onChange={(e) =>
                setMediumReps(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          {/* 11+ Reps */}
          <div>
            <Label htmlFor="high-reps">11+ Reps</Label>
            <Input
              id="high-reps"
              type="number"
              min="1"
              value={highReps}
              onChange={(e) =>
                setHighReps(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        {/* Success Message */}
        {status === 200 && (
          <p className="mt-4 text-center text-sm text-green-500">
            Exercise created successfully!
          </p>
        )}
      </form>
    </div>
  );
}