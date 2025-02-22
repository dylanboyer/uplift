import React, { useState, useEffect } from 'react';
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the type for the fetched data
interface Entry {
  e_id: number;
  created_at: Date;
  weight: number;
}

function DataEntry({ entryId }: { entryId: number }) {
  const [entry, setEntry] = useState<Entry | null>(null);
  const [weight, setWeight] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
	const fetchData = async () => {
	  try {
		const response = await fetch(`/backend/entries/${entryId}`);
		const data: Entry = await response.json();
		console.log("Fetched entry:", data);

		setEntry(data);
		setDate(new Date(data.created_at));
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
	console.log('update');
	console.log(date);
	console.log(weight);
	// Your update logic here
  };

  if (!entry) {
	return <p>Loading...</p>;
  }

  return (
	<div className="border p-4 rounded-md bg-red-400">
	  <p className="font-bold">Entry ID: {entry.e_id}</p>
	  
	  <div className="flex justify-between items-center">
		<div className="flex flex-col w-full">
		  <label className="block">Weight:</label>
		  <Input
			type="number"
			value={weight}
			onChange={(e) => setWeight(Number(e.target.value))}
		  />
		</div>

		<div className="flex flex-col items-end">
		  <label className="block">Created At:</label>
		  <Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			className="rounded-md border"
		  />
		</div>
	  </div>

	  <Button onClick={handleUpdate} className="mt-2">Update</Button>
	</div>
  );
}

function EntryManager({ exerciseId }: { exerciseId: string }) {
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

  if (!points || points.length === 0) {
	return <p>Loading...</p>;
  }

  return (
	<div className="bg-zinc-800">
	  <ScrollArea className="h-[500px] w-[1200px] rounded-md border p-4">
		{points.map((entry_id) => (
			<React.Fragment key={entry_id}>
				<DataEntry entryId={entry_id} />
				<Separator />
			</React.Fragment>
		))}
	  </ScrollArea>
	</div>
  );
}

export default EntryManager;
