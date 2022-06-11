import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const labelState = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const datasetState = [
  {
    label: 'My First dataset',
    fill: true,
    lineTension: 0.1,
    backgroundColor: 'rgba(192, 169, 75, 0.4)',
    borderColor: 'rgba(192, 169, 75,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(192, 169, 75,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(192, 169, 75,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [65, 59, 80, 81, 56, 55, 40]
  }
];

function Graph() {
  const [labels] = useState(labelState);
  const [datasets, setDatasets] = useState(datasetState);
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      const oldDataSet = datasets[0];
      const newData = [];

      for (let x = 0; x < labels.length; x += 1) {
        newData.push(Math.floor(Math.random() * 100));
      }

      const newDataSet = {
        ...oldDataSet
      };

      newDataSet.data = newData;
      setDatasets([newDataSet]);
    }, 5000);

    return () => {
      clearInterval(interval.current);
    };
  }, [datasets, labels]);

  return (
    <Line data={{ labels, datasets }} />
  );
}

function AreaDynamic() {
  return (
    <div>
      <h2>Random Animated Line Example</h2>
      <Graph />
    </div>
  );
}

export default AreaDynamic;
