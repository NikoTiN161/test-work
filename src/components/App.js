import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchListGroup from './SearchListGroup';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiDadata from '../api/ApiDadata';
import apiOpenweather from '../api/ApiOpenweather';

import { DateTime } from "luxon";

function App() {

   const defaultCity = '📍';
   const [currentCity, setCurrentCity] = useState(defaultCity);
   // const [idCurrentCity, setIdCurrentCity] = useState('');
   const [cities, setCities] = useState([]);
   const [error404, setError404] = useState(false);
   const [currentWeather, setCurrentWeather] = useState();
   const [weatherForecast, setWeatherForecast] = useState();

   const inputSearchRef = React.useRef(null);


   function onChengeSearch(e) {
      if (e.target.value.length >= 3) {
         // console.log('run api');
         apiDadata.getСities(e.target.value)
            .then(data => {
               setCities(data.suggestions);
            })
            .catch(err => { console.log(err); setError404(true) });
      } else {
         setCities([]);
      }
   }

   // function onClickButtonSearch(e) {
   //    e.preventDefault();
   // }

   function onClickCity(city) {
      setCurrentCity(city);
      setCities([]);
      inputSearchRef.current.value = '';
      apiOpenweather.currentWeatherByCity(city).then(data => {
         setCurrentCity(data.name);
         setCurrentWeather(data);
         console.log(data);
      })
      .catch(err => { console.log(err); setError404(true) });
   }

   function locate() {
      navigator.geolocation.getCurrentPosition(position => {
         const { latitude, longitude } = position.coords;
         apiOpenweather.currentWeatherByCoords(latitude, longitude).then(data => {
            setCurrentCity(data.name);
            setCurrentWeather(data);
            console.log(data);
         })
         .catch(err => { console.log(err); setError404(true) });
      })
   }

   function filter3days(data) {
      const dt = DateTime.now();
      const dayOne = data.filter(e => e.dt_txt.includes(dt.plus({day: 1}).toFormat('yyyy-MM-dd')));
      const dayTwo = data.filter(e => e.dt_txt.includes(dt.plus({day: 2}).toFormat('yyyy-MM-dd')));
      const dayThree = data.filter(e => e.dt_txt.includes(dt.plus({day: 3}).toFormat('yyyy-MM-dd')));
      return [dayOne, dayTwo, dayThree];
}

   function onSelectTab() {
      navigator.geolocation.getCurrentPosition(position => {
         const { latitude, longitude } = position.coords;
         apiOpenweather.getWeatherForecastByCoords(latitude, longitude).then(data => {
            setWeatherForecast(filter3days(data.list));
            console.log(filter3days(data.list));
         })
         .catch(err => { console.log(err); setError404(true) });
      })
   }

   return (
      <Container >
         <Navbar className='justify-content-center'>
            <Form inline='true'>
               <Row className='justify-content-between'>
                  <Col xl='auto'>
                     <h4 className='h4'>Ваше местоположение: {currentCity}</h4>
                  </Col>
                  <Col xl='auto'>
                     <Button onClick={locate} variant='outline-primary'>Определить город</Button>
                  </Col>
               </Row>
               
               <Row>
                  <Col  >
                     <InputGroup>
                        <InputGroup.Text id='iconSearch'>🔎</InputGroup.Text>
                        <Form.Control
                           ref={inputSearchRef}
                           className='mr-sm-2'
                           type='text'
                           placeholder='Поиск города'
                           onChange={onChengeSearch}
                        />
                     </InputGroup>
                  </Col>
                  {/* <Col xs='auto'>
                     <Button type='submit' onClick={onClickButtonSearch}>Поиск</Button>
                  </Col> */}
               </Row>
               {cities.length > 0 ?
                  <Row>
                     <Col >
                        <SearchListGroup cities={cities} onClickCity={onClickCity} />
                     </Col>
                  </Row>
                  : null}
               {error404 ?
                  <Row>
                     <Col >
                        <h3 className='h3'>Упс! Какая-то ошибка. Выгляните в окно :)</h3>
                     </Col>
                  </Row>
               : null }
               {currentWeather !== undefined ?
                  <Row>
                     <Tabs
                        defaultActiveKey="currentWeather"
                        id="fill-tab"
                        className="mb-2"
                        fill
                        onSelect={onSelectTab}
                     >
                        <Tab eventKey="currentWeather" title="Текущая погода">
                           <CurrentWeather data={currentWeather}/>
                        </Tab>
                        <Tab eventKey="weatherForecast" title="Погода на 3 дня" >
                           <WeatherForecast data={weatherForecast}/>
                        </Tab>
                     </Tabs>
                  </Row>
               : null}
            </Form>
         </Navbar>
      </Container>
   );
}

export default App;
