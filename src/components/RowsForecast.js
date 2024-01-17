import React from 'react';
import RowForecast from './RowForecast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateTime } from "luxon";


function RowsForecast(props) {

    return (
        <Row>
            <Row>
                <Col>
                    <h4>{DateTime.fromSeconds(Number(props.data[0].dt)).toFormat('dd')}</h4>
                    <h6>{DateTime.fromSeconds(Number(props.data[0].dt)).setLocale('ru').toFormat('MMMM')}</h6>
                </Col>
                <Col />
                <Col />
                <Col>
                    <h6>Давление</h6>
                    <h6>мм рт.ст</h6>
                </Col>
                <Col>
                    <h6>Влажность</h6>
                </Col>
                <Col>
                    <h6>Ветер, м/с</h6>
                </Col>
                <Col>
                    <h6>Ощущается как</h6>
                </Col>
            </Row>
                {props.data?.map(e => {
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
                    })}
        </Row>
    );
}

export default RowsForecast;