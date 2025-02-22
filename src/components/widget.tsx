import * as React from 'react';
import { useState, useEffect } from 'react';

interface WidgetProps {
  exerciseId: string; // Exercise ID passed as a prop
}

function Widget({ exerciseId }: WidgetProps) {
  const [exerciseData, setExerciseData] = useState<any>(null); // State to hold the fetched exercise data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // useEffect to fetch exercise data when the component mounts
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await fetch(`/exercises/${exerciseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exercise data');
        }
        const data = await response.json();
        setExerciseData(data); // Set the fetched data
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error: any) {
        setError(error.message); // Set error if the request fails
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchExerciseData(); // Call the function to fetch the data
  }, [exerciseId]); // Dependency array: runs again if exerciseId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if the request fails
  }

  return (
    <div>
      <h1>{exerciseData?.label}</h1> {/* Display the label from the fetched data */}
      <p>Details: {exerciseData?.details}</p> {/* Example field from the fetched data */}
      <button onClick={() => console.log(exerciseData)}>Log Exercise Data</button>
    </div>
  );
}

export default Widget;
