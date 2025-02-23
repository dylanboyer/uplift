import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useGetAllBucketsFromUser } from "@/hooks/use-exercise";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface WidgetProps {
  bucketId: string;
}

export function Widget({ bucketId }: WidgetProps) {
  const [options, setOptions] = useState<any>(null);
  const [dataset, setDataset] = useState<any>({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [noPermission, setNoPermission] = useState(false);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/backend/exercises/${bucketId}/view`);

        if (response.status === 403) {
          setNoPermission(true);
          return;
        }

        const data = await response.json();

        if (!data?.options || !data?.data) {
          console.error("Invalid data format received:", data);
          setLoading(false);
          return;
        }

        setOptions({ ...data.options });
        setDataset({ ...data.data });
        setChartKey((prevKey) => prevKey + 1);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setLoading(false);
      }
    };

    if (bucketId) {
      setLoading(true);
      fetchItem();
    }
  }, [bucketId]);

  if (noPermission) {
    return null; // Prevent rendering if no permission (403)
  }

  return !loading && (
    <div className="bg-zinc-300 widget flex-1 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 h-[250px] border border-white rounded-xl shadow-lg m-4 p-4 hover:shadow-2xl transition-all ease-in-out flex flex-col justify-between">
      {(!dataset?.datasets?.length || !options) ? (
        <p className="text-center text-white">No data available</p>
      ) : (
        <Line
          key={chartKey}
          data={dataset}
          options={{
            ...options,
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 3,  // Adjust aspect ratio to make it fill half the width and look good
          }}
        />
      )}
    </div>
  );
}

interface WidgetBoxProps {
  user_id: number;
  col_num: number;
}

export function WidgetBox({ user_id, col_num }: WidgetBoxProps) {
  if (!user_id) {
    return null; // If no user_id, don't render anything
  }

  const { bucket_ids, isLoading, error } = useGetAllBucketsFromUser(user_id);

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  if (!bucket_ids || bucket_ids.length === 0) {
    return null; // If no bucket IDs, return null to not render anything
  }

  return (
    <div className={`grid grid-cols-1 grid-cols-${col_num} gap-6 justify-center p-6 rounded-lg shadow-lg`}>
      {bucket_ids.map((bucket_id: number) => (
        <div key={bucket_id} className="flex justify-center items-center">
          <Widget bucketId={String(bucket_id)} />
        </div>
      ))}
    </div>
  );
}
