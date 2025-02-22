import React from "react";
import {
  useGetAllExercises,
  useGetExerciseRanges,
  useCreateExercise,
  useCreateEntry,
} from "@/hooks/use-exercise";

export default function DataEntry() {
  // Fetch the list of exercises
  const { exercises, isLoading, error } = useGetAllExercises();

  // Handle loading state
  if (isLoading) {
    return <div>Loading exercises...</div>;
  }

  // Handle error state
  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  console.log(exercises)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select an Exercise</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <button
            key={index}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => {
              // Handle button click (e.g., navigate to a new page or open a modal)
              console.log(`Selected exercise: ${exercise}`);
            }}
          >
            {exercise}
          </button>
        ))}
      </div>
    </div>
  );
}