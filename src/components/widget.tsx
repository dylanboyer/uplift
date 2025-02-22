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
	const [noPermission, setNoPermission] = useState(false);
	const [chartKey, setChartKey] = useState(0); // Key to force chart update

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`/backend/exercises/${exerciseId}/view`);

				if (response.status === 403) {
					setNoPermission(true);
					return;
				}

				const data = await response.json();
				console.log("Fetched Data:", data);

				if (!data?.options || !data?.data) {
					console.error("Invalid data format received:", data);
					setLoading(false);
					return;
				}

				// Ensure we create new objects to trigger re-renders
				setOptions({ ...data.options });
				setDataset({ ...data.data });
				setChartKey((prevKey) => prevKey + 1); // Force a re-render of Line chart

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

	if (noPermission) {
		return null; // Prevent rendering if no permission (403)
	}

	return !loading && (
		<div className="widget">
			{!dataset?.datasets?.length || !options ? (
				<p>No data available</p>
			) : (
				<Line key={chartKey} data={dataset} options={options} />
			)}
		</div>
	);
}
export default Widget;
