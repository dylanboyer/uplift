
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