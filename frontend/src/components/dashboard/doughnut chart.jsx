import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useSelector } from "react-redux";

const DoughnutChart = () => {
  const { recentData } = useSelector((state) => state.job);
  ChartJS.register(ArcElement, Title, Tooltip, Legend);
  const plugins = [
    {
      id: "customDataLabels",
      afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        data.datasets[0].data.forEach((datapoint, index) => {
          const { x, y } = chart
            .getDatasetMeta(0)
            .data[index].tooltipPosition();
          ctx.font = "bold 12px sans-serif";
          ctx.fillStyle = data.datasets[0].borderColor[index];
          ctx.textAlign = "center";
          ctx.textBaseLine = "middle";
          ctx.fillText(datapoint, x, y);
        });
      },
    },
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: true,
        text: "Monthly Applications (Past 6 Months)",
        position: "top",
        font: {
          size: 16,
        },
      },
    },
  };
  const data = {
    labels: Object.keys(recentData),
    datasets: [
      {
        data: Object.values(recentData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={options} plugins={plugins} />;
};

export default DoughnutChart;
