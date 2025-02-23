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
    <div className="bg-zinc-300 widget min-w-[300px] w-full sm:w-1/2 md:w-1/3 lg:w-1/5 h-[200px] border border-white rounded-xl shadow-lg m-4 p-4 hover:shadow-2xl transition-all ease-in-out">
      {(!dataset?.datasets?.length || !options) ? (
        <p className="text-center text-white">No data available</p>
      ) : (
        <Line key={chartKey} data={dataset} options={options} />
      )}
    </div>
  );
}

interface WidgetBoxProps {
  user_id: number;
}

export function WidgetBox({ user_id }: WidgetBoxProps) {
  if (!user_id) {
    return null;
  }

  const { bucket_ids, isLoading, error } = useGetAllBucketsFromUser(user_id);

  if (isLoading || ! bucket_ids) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error ) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }
  console.log(bucket_ids)
  return (
    <div className="flex flex-wrap gap-6 justify-center p-6 rounded-lg shadow-lg">
      {bucket_ids.map((bucket_id: number) => (
        <Widget key={bucket_id} bucketId={String(bucket_id)} />
      ))}
    </div>
  );
}



