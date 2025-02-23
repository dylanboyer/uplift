import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetAllExercises } from "@/hooks/use-exercise";
import { CreateExerciseForm } from "@/components/create-exercise-form";
import { EditExerciseForm } from "@/components/edit-exercise-form";
import { LoadingCircle } from "@/components/loading-circle";

export default function ExerciseConfig() {
  const { exercises = [], isLoading, error } = useGetAllExercises();
  const [selectedExercise, setSelectedExercise] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [isNewExercise, setIsNewExercise] = useState<boolean>(false);

  if (isLoading) return <LoadingCircle />;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Pick an exercise to make a goal! Or create a new one
      </h1>

      {/* Exercise Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exercises.length > 0
          ? exercises.map((exercise) => (
              <button
                key={exercise.e_id}
                className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setSelectedExercise({
                    name: exercise.name,
                    id: exercise.e_id,
                  });
                  setIsNewExercise(false);
                }}
              >
                {exercise.name}
              </button>
            ))
          : null}

        <button
          className="p-4 bg-blue-400 outline-3 outline-amber-300 text-black rounded-lg hover:bg-blue-500 transition-colors"
          onClick={() => {
            setIsNewExercise(true);
            setSelectedExercise(null);
          }}
        >
          New Exercise
        </button>
      </div>

      <Separator className="bg-white my-6" />

      {/* Conditional Rendering for Forms */}
      {isNewExercise ? (
        <CreateExerciseForm />
      ) : selectedExercise ? (
        <EditExerciseForm
          exerciseId={selectedExercise.id}
          exerciseName={selectedExercise.name}
        />
      ) : null}
    </div>
  );
}
