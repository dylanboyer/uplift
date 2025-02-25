// use-exercise.ts --- A BUNCH of hooks to get exercise data
import { useState, useEffect } from "react";


interface Exercise {
  name: string;
  goals: number[];
}

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createExercise = async ({name, goals} : Exercise) => {
    console.log(name, goals)
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("unexpected error")
      }
    } finally {
      setLoading(false);
    }
  };

  return { createExercise, loading, error, success };
};

// POST edit exercise (given an id, name, and goals)


interface useGetExerciseReturn {
  exercise: Exercise | null,
  loading : boolean,
  error : string | null;
  
}

export function useGetExercise(id: string) : useGetExerciseReturn {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/backend/exercises/${id}`);
        const data = await response.json();
        setExercise(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("unexpected Error")
        }
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  return { exercise, loading, error };
}



interface EditExerciseResponse {
  editExercise: (exerciseId: string, exercise: Exercise) => Promise<void>,
  loading : boolean,
  error : string | null,
  response : EditExerciseResponse | null
}

export const useEditExercise = () : EditExerciseResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<EditExerciseResponse | null>(null);

  const editExercise = async (exerciseId: string, exercise: Exercise) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
          const response = await fetch(`/backend/exercises/${exerciseId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(exercise),
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data: EditExerciseResponse = await response.json();
          setResponse(data);
      } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("unexpected error")
          }
      } finally {
          setLoading(false);
      }
  };

  return { editExercise, loading, error, response };
};

interface DeleteExerciseResponse {
  status: string;
}

export const useDeleteExercise = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<DeleteExerciseResponse | null>(null);

  const deleteExercise = async (exerciseId: string) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
          const response = await fetch(`/backend/exercises/${exerciseId}`, {
              method: 'DELETE',
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data: DeleteExerciseResponse = await response.json();
          setResponse(data);
      } catch (err) {
          setError(err as Error);
      } finally {
          setLoading(false);
      }
  };

  return { deleteExercise, loading, error, response };
};

export const useGetAllBucketsFromUser = (user_id : string) => {
  const [bucket_ids, setExercises] = useState<number[]>([]);
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


interface PointsData {
  [key: number]: any[];
}

interface UseGetAllEntriesFromExercise {
  data: PointsData | null;
  loading: boolean;
  error: string | null;
}

export function useGetAllEntriesFromExercise(exerciseId: string): UseGetAllEntriesFromExercise {
  const [data, setData] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/backend/exercises/${exerciseId}/points`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: PointsData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [exerciseId]);

  return { data, loading, error };
}