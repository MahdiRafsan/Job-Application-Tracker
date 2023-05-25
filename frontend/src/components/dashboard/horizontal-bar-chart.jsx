import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useSelector } from "react-redux";
const HorizontalBarChart = () => {
  const { jobTypesData } = useSelector((state) => state.job);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        min: 0,
        max: Math.max(...Object.values(jobTypesData)) + 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Job Types Applied (Last Month)",
        position: "top",
        font: {
          size: 16,
        },
      },
    },
  };

  const labels = Object.keys(jobTypesData);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Applications",
        data: Object.values(jobTypesData),
        borderColor: "rgba(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default HorizontalBarChart;
