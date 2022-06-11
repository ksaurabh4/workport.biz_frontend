import React from 'react';
import { WeatherWidget } from 'dan-components';

function WeatherStatus() {
  return (
    <div>
      <WeatherWidget status="cloud" city="Bandung" temp={18} />
    </div>
  );
}

export default WeatherStatus;
