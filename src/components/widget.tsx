import * as React from 'react';
import { useState, useEffect } from 'react';

interface WidgetProps {
  exerciseId: string; // Type it as a string
}

function Widget({ exerciseId }: WidgetProps) {
  const [item, setItem] = useState<any>(null);

  console.log(exerciseId)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const url = `/backend/exercises/${exerciseId}`;
        console.log('Fetching from URL:', url);  // Log the URL being used for the request
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        console.log(data)
        setItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    if (exerciseId) {
      fetchItem();  // Only call fetch if exerciseId is defined
    }
  }, [exerciseId]);

  return (
    <div>
      {item ? (
        <div>
          <h2>{item.label} Progress</h2>
          <p></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Widget;
