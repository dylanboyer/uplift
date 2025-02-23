// ExerciseConfig.tsx
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useGetAllExercises, useDeleteExercise } from "@/hooks/use-exercise";
import { CreateExerciseForm } from "@/components/create-exercise-form";
import { EditExerciseForm } from "@/components/edit-exercise-form";
import { LoadingCircle } from "@/components/loading-circle";
import ExerciseButton from "@/components/ui/exercise-button"; // Import the new button component
import {EntryPopup} from "@/components/entry-popup";
import {ExercisePopup} from "@/components/exercise-popup";
import {ExerciseEditPopup} from "@/components/exercise-edit-popup";

export default function ExerciseConfig() {
  const { exercises = [], isLoading, error } = useGetAllExercises();
  const [selectedExercise, setSelectedExercise] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [isNewExercise, setIsNewExercise] = useState<boolean>(false);

  const [addEntry, setAddEntry] = useState(null);
  const [modifyExercise, setModifyExercise] = useState(null);
  const [addNewExercise, setAddNewExercise] = useState(null);

  const {
    deleteExercise,
    loading: loadingDelete,
    error: errorDelete,
    response: responseDelete,
  } = useDeleteExercise();

  const handleDelete = async (e_id) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      await deleteExercise(e_id);
      navigate(0);
    }

  };

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
                onModify={() => {
                  setModifyExercise({
                    name: exercise.name,
                    id: exercise.e_id,
                  });
                }}
                onAddNew={() => {
                   setAddEntry({
                    name : exercise.name,
                    id : exercise.e_id
                   });
                }}
                onDelete={() => handleDelete(exercise.e_id)}
              />
            ))
          : null}

        <ExerciseButton
          name="+"
          onClick={() => {
            setIsNewExercise(true);
            setSelectedExercise(null);
            setAddNewExercise(1);
          }}
          isNew={true} // Pass isNew as true for styling
        />
      </div>
      <div>
        {addEntry && (
        <EntryPopup
          exercise={addEntry}
          onClose={() => setAddEntry(null)}
        />
      )}
        {addNewExercise && (
        <ExercisePopup
          onClose={() => {
            setAddNewExercise(null);
            navigate(0)
          }}
        />
      )}
        {modifyExercise && (
        <ExerciseEditPopup
          exercise_in={modifyExercise}
          onClose={() => {
            setModifyExercise(null);
            navigate(0)
          }}
        />
      )}
      </div>
    </div>
  );
}
