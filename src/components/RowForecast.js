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
                <h6>{`${Math.round(props.tempMin)}°... ${Math.round(props.tempMax)}°`}</h6>
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
                <svg style={{transform: `rotate(${props.windDeg}deg)`}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                </svg>
            </Col>
            <Col>
                <h6>{props.feelsLike}°</h6>
            </Col>
        </Row>
    );
}

export default RowForecast;