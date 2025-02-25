import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetAllExercises } from "@/hooks/use-exercise";
import { LoadingCircle } from "@/components/loading-circle";
import { ViewEntriesPopup } from "@/components/view-entries-popup";

interface Exercise {
  name : string,
  id : string
}

export default function WorkoutEntry() {
  const { exercises = [], isLoading, error } = useGetAllExercises();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  if (isLoading) return <LoadingCircle />;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Pick an exercise to make an entry for:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exercises.length > 0
          ? exercises.map((exercise : {e_id : string, name : string}) => (
              <button
                key={exercise.e_id}
                className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() =>
                  setSelectedExercise({
                    name: exercise.name,
                    id: exercise.e_id,
                  })
                }
              >
                {exercise.name}
              </button>
            ))
          : null}
      </div>
      <Separator className="bg-white my-6" />

      {selectedExercise && (
        <ViewEntriesPopup
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}
