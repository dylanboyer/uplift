// use-exercise.ts --- A BUNCH of hooks to get exercise data
import { useState, useEffect } from "react";

// GET /exercises/has/names --> list of strings and ids of exercises the user has
export const useGetAllExercises = () => {
  const [exercises, setExercises] = useState([]); // ✅ Default to empty array
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/backend/exercises/has/names")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched exercises:", data); // ✅ Debugging log
        setExercises(data);
      })
      .catch((err) => {
        console.error("Error fetching exercises:", err);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { exercises, error, isLoading };
};

export const useGetUsedExercises = () => {
  const [exercises, setExercises] = useState([]); // ✅ Default to empty array
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/backend/exercises/use/names")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched exercises:", data); // ✅ Debugging log
        setExercises(data);
      })
      .catch((err) => {
        console.error("Error fetching exercises:", err);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { exercises, error, isLoading };
};


// GET /exercises/ranges --> get a list of three strings 1-5, 6-10, 11+
export const useGetExerciseRanges = () => {
    const [ranges, setRanges] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchRanges = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          // Make the API request
          const response = await fetch("/exercises/ranges", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          // Handle non-OK responses
          if (!response.ok) {
            throw new Error(`Failed to fetch exercise ranges: ${response.statusText}`);
          }
  
          // Parse the response
          const data = await response.json();
  
          // Update the state with the list of exercise ranges
          setRanges(data);
        } catch (err) {
          // Handle errors
          setError(err instanceof Error ? err.message : "Failed to fetch exercise ranges");
        } finally {
          // Reset loading state
          setIsLoading(false);
        }
      };
  
      // Call the fetch function
      fetchRanges();
    }, []); // Empty dependency array ensures this runs only once on mount
  
    return { ranges, isLoading, error };
  };
  
// POST /exercises/create
// name string
// goal of ints of your goals [0, 180, 0] --> have lista
// response: 200, 400
export const useCreateExercise = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createExercise = async (name, goals) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/backend/exercises/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, goals }),
      });

      if (!response.ok) {
        throw new Error('Failed to create exercise');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createExercise, loading, error, success };
};


// POST /entries/create
// rep range int: 0, 1, 2
// sets int:
// weight: int
// date: datetime iso format
// exercise/_name (string, should match from previous click)
// response 200, 400
export const useCreateEntry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const createEntry = async (
    repRange: number,
    sets: number,
    weight: number,
    date: string,
    exerciseName: string
  ) => {
    setIsLoading(true);
    setError(null);
    setStatus(null);

    try {
      // Validate rep_range (must be 0, 1, or 2)
      if (repRange < 0 || repRange > 2) {
        throw new Error("Rep range must be 0, 1, or 2.");
      }

      // Validate sets (must be a positive integer)
      if (!Number.isInteger(sets) || sets <= 0) {
        throw new Error("Sets must be a positive integer.");
      }

      // Validate weight (must be a positive integer)
      if (!Number.isInteger(weight) || weight <= 0) {
        throw new Error("Weight must be a positive integer.");
      }

      // Validate date (must be a valid ISO string)
      if (!Date.parse(date)) {
        throw new Error("Date must be a valid ISO timestamp.");
      }

      // Validate exercise_name (must be a non-empty string)
      if (typeof exerciseName !== "string" || exerciseName.trim() === "") {
        throw new Error("Exercise name must be a non-empty string.");
      }

      // Make the API request
      const response = await fetch("/entries/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rep_range: repRange,
          sets,
          weight,
          date,
          exercise_name: exerciseName,
        }),
      });

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`Failed to create entry: ${response.statusText}`);
      }

      // Set the response status
      setStatus(response.status);
    } catch (err) {
      // Handle errors
      setError(err instanceof Error ? err.message : "Failed to create entry");
      setStatus(400); // Set status to 400 on error
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return { createEntry, isLoading, error, status };
};


export const useGetAllBucketsFromUser = (user_id) => {
  const [bucket_ids, setExercises] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Make the API request
        const response = await fetch(`/backend/users/${user_id}/buckets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Handle non-OK responses
        if (!response.ok) {
          throw new Error(`Failed to fetch exercises: ${response.statusText}`);
        }

        // Parse the response
        const data = await response.json();

        console.log(data)

        // Update the state with the list of exercise names
        setExercises(data);
      } catch (err) {
        // Handle errors
        setError(err instanceof Error ? err.message : "Failed to fetch exercises");
      } finally {
        // Reset loading state
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchExercises();
  }, []); // Empty dependency array ensures this runs only once on mount

  return { bucket_ids, isLoading, error };
};