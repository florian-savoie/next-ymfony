import React, { useEffect, useState } from 'react';
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
import { Line } from 'react-chartjs-2';
import { Card,useColorModeValue } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options:any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Détail paiement',
    },
  },
};

export function LineComposant(props:any) {

  const [labels, setLabels] = useState([]);

  const data = {
    labels: labels.map((v:any) => v.release_date),
    datasets: [
      {
        label: 'Vote',
        data: labels.map((v:any) => v.vote_average),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect(() => {
    if (props.data?.results) {
      setLabels(props.data.results);
    }
  }, [props.data?.results]);

  return  <Card  m={20} p={10} bg={useColorModeValue('gray.200', 'gray.700')} width={"1050px"} h={'70%'}>
  <Line options={options} data={data} />
</Card>  ;
}