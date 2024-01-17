import React from 'react';
import Container from 'react-bootstrap/Container';
import RowsForecast from './RowsForecast';


function WeatherForecast(props) {

    function filterPeriods(str) {
        return str.includes('00:00:00') || str.includes('06:00:00') || str.includes('12:00:00') || str.includes('18:00:00');
    }
    
    return (
        <Container>
            {props.data?.map((dayForecast, i) => {
                let filteredData = dayForecast.filter(e => filterPeriods(e.dt_txt));
                console.log('filteredData', filteredData);
                return ( <RowsForecast key={filteredData[i].dt} data={filteredData}/> )
            })
            }
        </Container>
    );
}

export default WeatherForecast;
