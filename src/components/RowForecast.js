import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateTime } from "luxon";

function RowForecast(props) {

    function getTimeOfDay(date) {
        // let hour = DateTime.fromSeconds(Number(date)).hour;
        switch (DateTime.fromSeconds(Number(date)).hour) {
            case 3:
                return 'Ночь';
            case 9:
                return 'Утро';
            case 15:
                return 'День';
            case 21:
                return 'Вечер';
        default:
            break;
        }
    }

    return (
        <Row className='align-items-center'>
            <Col>
                <h6>{getTimeOfDay(props.date)}</h6>
                <h6>{`${Math.round(props.tempMin)}°...${Math.round(props.tempMax)}°`}</h6>
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