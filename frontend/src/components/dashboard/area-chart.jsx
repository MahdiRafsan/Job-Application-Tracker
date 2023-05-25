import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const AreaChart = () => {
  const { dataByYear } = useSelector((state) => state.job);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
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
        text: "Applications By Year",
        position: "top",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 70,
        },
      },
    },
  };

  const labels = Object.keys(dataByYear);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Number of Applications",
        data: Object.values(dataByYear),
        borderColor: "rgb(75, 230, 192)",
        backgroundColor: "rgba(75, 230, 192, 0.4)",
        lineTension: 0.5,
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default AreaChart;
