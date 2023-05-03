import React from 'react';
import { useEffect,useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement, 
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
     Box, 
    } from "@chakra-ui/react"
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['janvier', 'fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];



export function LineChart(props:any) {

    const [note , setNote] : any = useState([])
    const [vote , setvote] : any = useState([])
    const [date ,setdate] : any = useState([])

    useEffect(() => {
    console.log(props.data.results)
     if(props.data?.results){

     }
    props.data.results.map((v:any) => {
        labels.push(v.release_date);
        vote.push(v.release_date);
        note.push(v.release_date);
    })
    }, [props])


    const data = {
        labels: labels,
        datasets: [
          {
            label: ' note ',
            data: note,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'vote ',
            data: vote,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  return <Box>
  <Line options={options} data={data} />
  </Box>;
}
