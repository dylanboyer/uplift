// ExerciseConfig.tsx
import { useState } from "react";
import { useGetAllExercises, useDeleteExercise } from "@/hooks/use-exercise";
import { LoadingCircle } from "@/components/loading-circle";
import ExerciseButton from "@/components/ui/exercise-button"; // Import the new button component
import {EntryPopup} from "@/components/entry-popup";
import {ExercisePopup} from "@/components/exercise-popup";
import {ExerciseEditPopup} from "@/components/exercise-edit-popup";
import { ViewEntriesPopup } from "@/components/view-entries-popup";
import { useNavigate } from "react-router-dom";

export default function ExerciseConfig() {
  const { exercises = [], isLoading, error } = useGetAllExercises();
  const [selectedExercise, setSelectedExercise] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [isNewExercise, setIsNewExercise] = useState<boolean>(false);

  const [viewEntries, setViewEntries] = useState(null)
  const [addEntry, setAddEntry] = useState(null);
  // const [modifyExercise, setModifyExercise] = useState(null);
  const [addNewExercise, setAddNewExercise] = useState(null);

  const { deleteExercise } = useDeleteExercise();

  const navigate = useNavigate();

  const handleDelete = async (e_id : string) => {
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
        <center>
          Pick an exercise to make a goal! Or create a new one
        </center>
      </h1>

      {/* Exercise Selection Grid */}
      <div className="flex flex-wrap justify-center gap-4"> {/* Added justify-center to center buttons */}
        {exercises.length > 0
          ? exercises.map((exercise) => (
             <ExerciseButton
                key={exercise.e_id}
                name={exercise.name}
                onViewEntries={() => {
                  setViewEntries({
                    name: exercise.name,
                    id: exercise.e_id,
                  });
                }}
                onModify={() => {
                  setSelectedExercise({
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
        {viewEntries && (
        <ViewEntriesPopup
          exercise={viewEntries}
          onClose={() => {
            setViewEntries(null);
          }}
          />
        )}
        {addNewExercise && (
        <ExercisePopup
          onClose={() => {
            setAddNewExercise(null);
          }}
        />
      )}
        {selectedExercise && (
        <ExerciseEditPopup
          exercise_in={selectedExercise}
          onClose={() => {
            setSelectedExercise(null);
          }}
        />
      )}
      </div>
    </div>
  );
}
