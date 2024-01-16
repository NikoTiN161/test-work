import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CurrentWeather(props) {

    return (props.data ??
        <Container>
            <Row className='justify-content-between'>
                <Col xs={1}>
                    <h1>{Math.round(props.data.main.temp) > 0 ? `+${Math.round(props.data.main.temp)}` : `${Math.round(props.data.main.temp)}`}&deg;C</h1>
                </Col>
                <Col xs={1}>
                    <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} className="rounded" alt={props.data.weather[0].description}/>
                </Col>
                <Col xs={8}>
                    <h6>{props.data.weather[0].description}</h6>
                    <h6>Ощущается как: {Math.round(props.data.main.feels_like)}&deg;C</h6>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>Скорость ветра: {Math.round(props.data.wind.speed)} м/с</h6>
                </Col>
                <Col>
                    <h6>Влажность: {props.data.main.humidity}%</h6>
                </Col>
                <Col>
                    <h6>Давление: {props.data.main.pressure} мм рт. ст.</h6>
                </Col>
            </Row>
        </Container>
    );
}

export default CurrentWeather;