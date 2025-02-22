import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the type for the fetched data
interface Entry {
  e_id: number;
}

interface ManagerProps {
  exerciseId: string;
}

interface Entry {
  e_id: number;
  created_at: string;
  weight: number;
}

function DataEntry({ entryId }: { entryId: number }) {
  const [entry, setEntry] = useState<Entry | null>(null);
  const [weight, setWeight] = useState<number>(0);

  const [date, setDate] = React.useState<Date | undefined>(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/backend/entries/${entryId}`);
        const data: Entry = await response.json();
        console.log("Fetched entry:", data);

        setEntry(data);
        setDate(Date(data.created_at));
        setWeight(data.weight);
      } catch (error) {
        console.error("Error fetching entry details:", error);
      }
    };

    if (entryId) {
      fetchData();
    }
  }, [entryId]);

  const handleUpdate = async () => {
  	console.log('update')
  	console.log(date)
  	console.log(weight)
    // try {
    //   const response = await fetch(`/backend/exercises/entry/${entryId}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ created_at: createdAt, weight }),
    //   });

    //   if (response.ok) {
    //     console.log("Entry updated successfully!");
    //   } else {
    //     console.error("Failed to update entry");
    //   }
    // } catch (error) {
    //   console.error("Error updating entry:", error);
    // }
  };

  if (!entry) {
    return <p>Loading...</p>;
  }

  return (
    <div className="border p-4 rounded-md">
      <p className="font-bold">Entry ID: {entry.e_id}</p>
      
      <label className="block">Created At:</label>
      <Calendar
	    mode="single"
	    selected={date}
	    onSelect={setDate}
	    className="rounded-md border"
	  />

      <label className="block">Weight:</label>
      <Input
        type="number"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      <Button onClick={handleUpdate} className="mt-2">Update</Button>
    </div>
  );
}

function EntryManager({ exerciseId }: ManagerProps) {
  const [points, setPoints] = useState<Entry[] | null>(null);

  useEffect(() => {
	const fetchPoints = async () => {
	  try {
		const response = await fetch(`/backend/exercises/${exerciseId}/points`);
		const data: Entry[] = await response.json();
		console.log(data);
		setPoints(data);
	  } catch (error) {
		console.error("Error fetching item details:", error);
	  }
	};

	if (exerciseId) {
	  fetchPoints();
	}
  }, [exerciseId]);

  // Only render if points are loaded and contain valid entries
  if (!points || points.length === 0) {
	return <p>Loading...</p>;
  }
  console.log(points)
  return (
	<div className="manager">
	  <ScrollArea className="h-[500px] w-[1200px] rounded-md border p-4">
		{points.map((entry) => (
			<>
				<DataEntry key={entry} entryId={entry} />
				<Separator />
			</>
		))}
		
	  </ScrollArea>
	</div>
  );
}

export default EntryManager;
