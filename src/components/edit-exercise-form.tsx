import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetExercise, useEditExercise, useDeleteExercise } from "@/hooks/use-exercise";
import { useNavigate } from "react-router-dom";
import { LoadingCircle } from "@/components/loading-circle";

interface EditExerciseFormProps {
  exerciseId: string;
  className?: string;
}

export function EditExerciseForm({
  exerciseId,
  className,
}: EditExerciseFormProps) {
  const {
    exercise,
    loading: loadingExercise,
    error: errorExercise,
  } = useGetExercise(exerciseId);
  const {
    editExercise,
    loading: loadingEdit,
    error: errorEdit,
    response: responseEdit,
  } = useEditExercise();
  const {
    deleteExercise,
    loading: loadingDelete,
    error: errorDelete,
    response: responseDelete,
  } = useDeleteExercise();

  const [exerciseName, setExerciseName] = useState("");
  const [lowReps, setLowReps] = useState<number | "">("");
  const [medReps, setMedReps] = useState<number | "">("");
  const [highReps, setHighReps] = useState<number | "">("");

  const navigate = useNavigate();

  useEffect(() => {
    if (exercise) {
      setExerciseName(exercise.name);
      setLowReps(exercise.goals[0] || "");
      setMedReps(exercise.goals[1] || "");
      setHighReps(exercise.goals[2] || "");
    }
  }, [exercise]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lowReps === "" && medReps === "" && highReps === "") {
      alert("Please fill out at least one goal for a rep range.");
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
    await editExercise(exerciseId, { name: exerciseName, goals });
    navigate(0);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      await deleteExercise(exerciseId);
      navigate(0);
    }
  };

  if (loadingExercise)
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  if (errorExercise) return <p>Error: {errorExercise.message}</p>;

  return (
    <div className={`p-4 rounded-lg ${className}`}>
      <h2 className="text-xl font-semibold text-center mb-4">Edit Exercise</h2>
      <form onSubmit={handleEdit} className="space-y-4">
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
        <div>
          {" "}
          <Label htmlFor="exercise-name">
            Enter a weight goal for any rep ranges (lbs):
          </Label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="low-reps">1-5 Reps</Label>
              <Input
                id="low-reps"
                type="number"
                min="0"
                value={lowReps}
                onChange={(e) =>
                  setLowReps(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="medium-reps">6-10 Reps</Label>
              <Input
                id="medium-reps"
                type="number"
                min="0"
                value={medReps}
                onChange={(e) =>
                  setMedReps(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="high-reps">11+ Reps</Label>
              <Input
                id="high-reps"
                type="number"
                min="0"
                value={highReps}
                onChange={(e) =>
                  setHighReps(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            type="submit"
            className="bg-zinc-200 text-black outline-2 outline-black w-full mr-"
            disabled={loadingEdit || loadingDelete}
          >
            {loadingEdit ? "Submitting..." : "Edit Exercise"}
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            variant="destructive"
            className="bg-red-400 text-black outline-2 outline-black w-full ml-2"
            disabled={loadingEdit || loadingDelete}
          >
            {loadingDelete ? "Deleting..." : "Delete Exercise"}
          </Button>
        </div>
        {errorEdit && (
          <p className="text-red-500 text-sm text-center">
            {errorEdit.message}
          </p>
        )}
        {responseEdit && (
          <p className="text-green-500 text-sm text-center">
            Exercise edited successfully!
          </p>
        )}
        {errorDelete && (
          <p className="text-red-500 text-sm text-center">
            {errorDelete.message}
          </p>
        )}
        {responseDelete && (
          <p className="text-green-500 text-sm text-center">
            Exercise deleted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
