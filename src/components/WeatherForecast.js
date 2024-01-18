import React from 'react';
import Container from 'react-bootstrap/Container';
import RowsForecast from './RowsForecast';


function WeatherForecast(props) {

    
    return (
        <Container>
            {props.data?.map((dayForecast, i) => {
                return ( <RowsForecast key={dayForecast[i].dt} data={dayForecast}/> )
            })
            }
        </Container>
    );
}

export default WeatherForecast;
