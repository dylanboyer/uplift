// ExerciseConfig.tsx
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetAllExercises } from "@/hooks/use-exercise";
import { CreateExerciseForm } from "@/components/create-exercise-form";
import { EditExerciseForm } from "@/components/edit-exercise-form";
import { LoadingCircle } from "@/components/loading-circle";
import ExerciseButton from "@/components/ui/exercise-button"; // Import the new button component
import {EntryPopup} from "@/components/entry-popup";

export default function ExerciseConfig() {
  const { exercises = [], isLoading, error } = useGetAllExercises();
  const [selectedExercise, setSelectedExercise] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [isNewExercise, setIsNewExercise] = useState<boolean>(false);

  const [addEntry, setAddEntry] = useState(null);

  if (isLoading) return <LoadingCircle />;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Pick an exercise to make a goal! Or create a new one
      </h1>

      {/* Exercise Selection Grid */}
      <div className="flex flex-wrap justify-center gap-4"> {/* Added justify-center to center buttons */}
        {exercises.length > 0
          ? exercises.map((exercise) => (
              <ExerciseButton
                key={exercise.e_id}
                name={exercise.name}
                onClick={() => {
                  setSelectedExercise({
                    name: exercise.name,
                    id: exercise.e_id,
                  });
                  setIsNewExercise(false);
                }}
                onAddNew={() => {
                   setAddEntry({
                    name : exercise.name,
                    id : exercise.e_id
                   })
                }
                }
              />
            ))
          : null}

        <ExerciseButton
          name="+"
          onClick={() => {
            setIsNewExercise(true);
            setSelectedExercise(null);
          }}
          isNew={true} // Pass isNew as true for styling
        />
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
      <div>
        {addEntry && (
        <EntryPopup
          exercise={addEntry}
          onClose={() => setAddEntry(null)}
        />
      )}
      </div>
    </div>
  );
}
