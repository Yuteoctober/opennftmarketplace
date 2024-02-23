import { useContext } from "react";
import { Chart, CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import UseContext from "../UserContext";
import sourceData from '../sales_data.json';


Chart.register(CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, Tooltip);


export default function Charts() {
    const { activity } = useContext(UseContext);

    const chartData = {
        labels: sourceData.map(data => data.day),
        datasets: [
            {
                type: 'bar',
                label: 'Sold',
                data: sourceData.map(data => data.sold),
                backgroundColor: ['#c2c2c2', '#383736'],
                borderColor: 'black',
                hoverBackgroundColor: 'black',
                yAxisID: 'y1',
                order: 2,
            },
            {
                type: 'line',
                label: 'Line',
                data: sourceData.map(data => data.sold),
                borderColor: 'rgba(248, 222, 89, 0.826)',
                fill: false,
                yAxisID: 'y2',
                hidden: false,
                order: 1,
            },
        ],
    };

    // Define chart options
    const options = {
        plugins: { 
            tooltip: { 
                mode: 'index', 
                intersect: true,
                filter: function (tooltipItem) {
                    return tooltipItem.datasetIndex !== 1;
                }
            },
        },
        scales: {
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: { color: 'rgba(138, 140, 136, 0.02)' },
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
            },
            y: {
                position: 'start',
                display: true,
                grid: { color: 'rgba(138, 140, 136, 0.15)' },
                ticks: {
                    display: false,
                }
            },
            x: {
                max: 20,
                ticks: {
                    font: {
                        size: 10,
                    }
                }
            },
        },
    };

    return (
        <>
            {activity && (
                <section className='activity_section'>
                    <h3>Activities</h3>
                    <div className="chart_container">
                        <Bar data={chartData} options={options} className="activity_bar" />
                    </div>
                </section>
            )}
        </>
    );
}
