import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RowForecast from './RowForecast';
import { DateTime } from "luxon";


function WeatherForecast5(props) {

    const dt = DateTime.now();

    return (
        {props.data.map(e => {
            if
            return (
                <RowsForecast {e.}/>
            )
        })
        }
    );
}

export default WeatherForecast5;
