import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetExercise, useEditExercise } from "@/hooks/use-exercise";
import { useNavigate } from "react-router-dom";
import { LoadingCircle } from "@/components/loading-circle";

interface ExerciseEditPopupProps {
  exercise_in: { name: string; id: string }
  onClose: () => void;
}

export function ExerciseEditPopup({ exercise_in, onClose }: ExerciseEditPopupProps) {
  const { exercise, loading : get_load } = useGetExercise(exercise_in.id);
  const { editExercise, loading: loadingEdit, error} = useEditExercise();

  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState("");
  const [goalWeights, setGoalWeights] = useState<{
    "1-5" : string,
    "6-10" : string,
    "11+" : string
  }>({
    "1-5": "",
    "6-10": "",
    "11+": "",
  });


  useEffect(() => {
    console.log(goalWeights)
    console.log(exerciseName)
    if (exercise) {
      setExerciseName(exercise.name);
      setGoalWeights({
        '1-5' : exercise.goals[0].toString() ,
        '6-10': exercise.goals[1].toString() ,
        '11+' : exercise.goals[2].toString() 
      })
    }
  }, [exercise]);

  const handleSubmit = async () => {
    if (!exerciseName || !goalWeights["1-5"] || !goalWeights["6-10"] || !goalWeights["11+"]) return;

    await editExercise(
      exercise_in.id,
      {
        name : exerciseName,
        goals : [parseInt(goalWeights["1-5"],10) || 0, parseInt(goalWeights["6-10"],10) || 0, parseInt(goalWeights["11+"],10) || 0]
      }
    );

    onClose();
    navigate(0);
  };

  if (get_load) {
    return <LoadingCircle />
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/65">
      <div className="bg-zinc-800 border-2 border-black p-6 rounded-lg shadow-lg w-96">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <h2 className="text-xl font-bold col-span-4 mb-4">Update Existing Exercise</h2>
          <Button className="align-right" variant="outline" onClick={onClose}>
            Exit
          </Button>
        </div>

        <div className="mb-4">
          <Label className="mb-1" htmlFor="exercise-name">
            Exercise Name
          </Label>
          <Input
            id="exercise-name"
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </div>

        <Separator className="my-4" />
        <h3 className="text-lg font-semibold mb-2">Goal Weights</h3>
        <p className="text-sm text-gray-400 mb-4">Modify your target weights for each rep range.</p>

        {(Object.keys(goalWeights) as Array<keyof typeof goalWeights>).map((range) => (
          <div key={range} className="mb-4">
            <Label className="mb-1" htmlFor={range}>
              {range} Reps (lbs)
            </Label>
            <Input
              id={range}
              type="number"
              value={goalWeights[range]}
              onChange={(e) =>
                setGoalWeights((prev) => ({
                  ...prev,
                  [range]: e.target.value,
                }))
              }
            />
          </div>
        ))}

        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full justify-end gap-2">
          <Button
            className="bg-zinc-200 text-black outline-2 outline-black w-full"
            type="submit"
            variant="outline"
            onClick={handleSubmit}
            disabled={loadingEdit}
          >
            {loadingEdit ? "Adding..." : "Add Exercise"}
          </Button>
        </div>
      </div>
    </div>
  );
}
