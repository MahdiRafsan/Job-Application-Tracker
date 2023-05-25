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

const BarChart = () => {
  const { dataByMonth } = useSelector((state) => state.job);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Applications By Month",
        position: "top",
        font: {
          size: 16,
        },
      },
    },
  };

  const labels = Object.keys(dataByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Applications",
        data: Object.values(dataByMonth),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
