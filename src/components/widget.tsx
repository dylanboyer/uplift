import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import './widget.css';
import ChartAnnotation from 'chartjs-plugin-annotation';
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
  ChartAnnotation,
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
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/backend/exercises/${exerciseId}/view`);
        const data = await response.json();
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    if (exerciseId) {
      fetchItem();
    }
  }, [exerciseId]);

  

  if (item) {
    var data_points = item.labels.length
    var last_date = item.labels[data_points-1]
  } else {
    var last_date = undefined
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          filter: function(legendItem, chartData) {
            // Check if the dataset has an empty label and hide it from the legend
            if (legendItem.datasetIndex === 0 && chartData.datasets[legendItem.datasetIndex].label === "") {
              return false; // Hide the dataset from the legend
            }
            return true; // Otherwise, show it
          }
        }
      },
      annotation: {
        annotations: {
          line: {
            type: 'line',
            xMin: 0, // Start from the left of the chart
            xMax: last_date, // End at the right of the chart
            yMin: item?.goal || 0, // Constant Y value for the second line
            yMax: item?.goal || 0, // Same Y value for a horizontal line
            borderColor: 'rgba(255, 99, 132, 1)', // Color of the line
            borderWidth: 2, // Width of the line
            label: {
              content: 'Constant Line', // Label for the line
              enabled: true,
              position: 'center',
            },
          },
        },
      },
      title: {
        display: true,
        text: item?.label || 'none',
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const date = new Date(tooltipItems[0].label);
            return date.toLocaleString(); // Format the date in tooltip
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day', // Customize based on your needs (e.g., 'hour', 'minute')
          tooltipFormat: 'll', // Nice format for tooltips
        },
        min: item?.labels && item?.labels[0] ? new Date(item.labels[0]) : undefined,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        min: 0, // Ensure the y-axis starts at 0
        max: item?.values ? Math.max(...item.values) * 1.25 : undefined, // Set a maximum range to make sure the constant line is visible
      },
    },
  };

  const data = {
    labels: item?.labels?.map((label: string) => new Date(label)) || [], // Convert label strings to Date objects
    datasets: [
      {
        label: "",
        data: item?.values || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  console.log(data)

  return (
    <div className="outline-1 outline-zinc-200">
      {item ? <Line data={data} options={options}/> : <p>Loading...</p>}
    </div>
  );
}

export default Widget;
