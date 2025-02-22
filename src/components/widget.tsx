import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
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
  exerciseId: string;
}

function Widget({ exerciseId }: WidgetProps) {
  const [options, setOptions] = useState<any>(null);
  const [dataset, setDataset] = useState<any>({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [chartKey, setChartKey] = useState(0); // Key to force chart update

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/backend/exercises/${exerciseId}/view`);
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data?.options && data?.data) {
          // Ensure we create new objects to trigger re-renders
          setOptions({ ...data.options });
          setDataset({ ...data.data });
          setChartKey((prevKey) => prevKey + 1); // Force a re-render of Line chart
        } else {
          console.error("Invalid data format received:", data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setLoading(false);
      }
    };

    if (exerciseId) {
      setLoading(true);
      fetchItem();
    }
  }, [exerciseId]);

  // Log changes to dataset and options
  useEffect(() => {
    console.log("Updated dataset:", dataset);
    console.log("Updated options:", options);
  }, [dataset, options]);

  return (
    <div className="widget">
      {loading ? (
        <p>Loading chart data...</p>
      ) : dataset?.datasets?.length > 0 && options ? (
        <Line key={chartKey} data={dataset} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Widget;
