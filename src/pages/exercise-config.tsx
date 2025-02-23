import React, { useState } from "react";
import { Separator } from "@/components/ui/separator"; // Import the Separator component
import {
  useGetAllExercises,
  useGetExerciseRanges,
  useCreateExercise,
  useCreateEntry,
} from "@/hooks/use-exercise";

export default function ExerciseConfig() {
  // Fetch the list of exercises
  const { exercises, isLoading, error } = useGetAllExercises();
  const [exerciseName, setExerciseName] = useState<string>("");
  const [newExercise, setNewExercise] = useState<boolean>(true);

  // Handle loading state
  if (isLoading) {
    return <div>Loading exercises...</div>;
  }

  // Handle error state
  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Pick an exercise to make a goal! Or make a new one
      </h1>

      {/* Exercise Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <button
            key={index}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => {
              // Set the selected exercise
              setExerciseName(exercise);
            }}
          >
            {exercise}
          </button>
        ))}
        <button
          className="p-4 bg-blue-500 outline-3 outline-amber-300 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            // Set the selected exercise
            setNewExercise(true);
          }}
        >Insert New Exercise</button>
      </div>

      {/* Separator */}
      <Separator className="my-6" />

      {/* Selected Exercise Display */}
      {exerciseName && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Selected Exercise</h2>
          <p className="text-lg">{exerciseName}</p>
          <ExerciseForm exerciseName={exerciseName} />
        </div>
      )}
    </div>
  );
}
