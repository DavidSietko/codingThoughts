"use client";

import styles from "./PieChart.module.css";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Props {
    total: number;
    data: number[];
}

export default function PieChart(props: Props) {
    const title: string = "Total: " + props.total;
    const data = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [
            {
                label: "Count",
                data: props.data,
                backgroundColor: ['#22c55e', '#FFCE56', '#FF6384'],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                    size: 18,  // Set your desired font size here
                    },
                    color: "#000"
                },
            },
        },
    };

  return (
    <div className={styles.container}>
        <header>{title}</header>
        <div className={styles.chartContainer}>
            <Pie data={data} options={options} />
        </div>
    </div>
  );
}