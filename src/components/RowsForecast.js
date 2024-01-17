import React from 'react';
import RowForecast from './RowForecast';
import { DateTime } from "luxon";

function RowsForecast(props) {
    return (
        props.data.map(e => {
            return (
                <RowForecast key={e.dt} 
                    date={e.dt}  
                    tempMax={Math.round(e.main.temp_max)} 
                    tempMin={Math.round(e.main.temp_min)}
                    icon={e.weather[0].icon}
                    description={e.weather[0].description}
                    pressure={e.main.pressure}
                    humidity={e.main.humidity}
                    windSpeed={e.wind.speed}
                    windDeg={e.wind.deg}
                    feelsLike={Math.round(e.main.feels_like)}
                />
            )
        })
    );
}

export default RowsForecast;