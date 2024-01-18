import React from 'react';
import RowForecast from './RowForecast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateTime } from "luxon";


function RowsForecast(props) {

    function isEven(number) {
        return number % 2 === 0;
    }

    function getMinMax(arr) {
        return {
            min: Math.min(...arr), 
            max: Math.max(...arr)
        };
    }


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
            {props.data?.map((e, i) => {
                return (isEven(i) ?
                    <RowForecast key={e.dt}
                        date={e.dt}
                        tempMin={getMinMax([props.data[i].main.temp_min, props.data[i+1].main.temp_min]).min}
                        tempMax={getMinMax([props.data[i].main.temp_max, props.data[i+1].main.temp_max]).max}
                        icon={e.weather[0].icon}
                        description={e.weather[0].description}
                        pressure={e.main.pressure}
                        humidity={e.main.humidity}
                        windSpeed={e.wind.speed}
                        windDeg={e.wind.deg}
                        feelsLike={Math.round(e.main.feels_like)}
                    />
                : null)
            })}
            <hr></hr>
        </Row>
    );
}

export default RowsForecast;