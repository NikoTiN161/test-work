import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateTime } from "luxon";

function RowForecast(props) {

    const dt = DateTime.fromSeconds(props.date);
    let tempMinMax = `${Math.round(props.tempMin)}°...${Math.round(props.tempMax)}°`;

    function getTimeOfDay(hour) {
        switch (hour) {
            case 0 || 3:
                return 'Ночь';
            case 6 || 9:
                return 'Утро';
            case 12 || 15:
                return 'День';
            case 18 || 21:
                return 'Вечер';
        default:
            break;
        }
    }

    return (
        <Row>
            <Col>
                <h7>{getTimeOfDay(dt.hour)}</h7>
                <h6>{tempMinMax}</h6>
            </Col>

            <Col>
                <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} className="rounded" alt={props.description}/>
            </Col>

            <Col>
                <h6>{props.description}</h6>
            </Col>

            <Col>
                <h6>{props.pressure}</h6>
            </Col>

            <Col>
                <h6>{props.humidity}%</h6>
            </Col>

            <Col>
                <h6>{Math.round(props.windSpeed)} м/с</h6>
                <span>&arrowUp;</span>
            </Col>
            <Col>
                <h6>{props.feelsLike}°</h6>
            </Col>
        </Row>
    );
}

export default RowForecast;