import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';

const initialState = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

function Graph() {
  const [graphState, setGraphState] = useState(initialState);
  useEffect(() => {
    setInterval(() => {
      const oldDataSet = graphState.datasets[0];
      const newData = [];

      for (let x = 0; x < graphState.labels.length; x += 1) {
        newData.push(Math.floor(Math.random() * 100));
      }

      const newDataSet = {
        ...oldDataSet
      };

      newDataSet.data = newData;
      newDataSet.backgroundColor = color();
      newDataSet.borderColor = color();
      newDataSet.hoverBackgroundColor = color();
      newDataSet.hoverBorderColor = color();

      const newState = {
        ...initialState,
        datasets: [newDataSet]
      };

      setGraphState(newState);
    }, 5000);
  }, []);

  return (
    <Bar data={graphState} />
  );
}

function BarDynamic() {
  return (
    <div>
      <h2>You can even make crazy graphs like this!</h2>
      <Graph />
    </div>
  );
}

export default BarDynamic;
