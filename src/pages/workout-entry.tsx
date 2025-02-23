import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetAllExercises } from "@/hooks/use-exercise";
import { CreateExerciseForm } from "@/components/create-exercise-form";
import { EditExerciseForm } from "@/components/edit-exercise-form";
import { LoadingCircle } from "@/components/loading-circle";
import { navigate, useNavigate } from "react-router-dom";
import { EntryPopup } from "@/components/entry-popup";

export default function WorkoutEntry() {
  const { exercises = [], isLoading, error } = useGetAllExercises();
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (isLoading) return <LoadingCircle />;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Pick an exercise to make an entry for:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exercises.length > 0
          ? exercises.map((exercise) => (
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
        <EntryPopup
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}
