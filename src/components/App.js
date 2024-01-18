import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchListGroup from './SearchListGroup';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import apiDadata from '../api/ApiDadata';
import apiOpenweather from '../api/ApiOpenweather';

import 'bootstrap/dist/css/bootstrap.min.css';
import { DateTime } from "luxon";


function App() {

   const defaultCity = '';
   const [showMenu, setShowMenu] = useState(false);
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
         setShowMenu(true);
         apiDadata.getСities(e.target.value)
            .then(data => {
               setCities(data.suggestions);
            })
            .catch(err => { console.log(err); setError404(true) });
      } else {
         setCities([]);
         setShowMenu(false);
      }
   }

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

   useEffect(() => {
      if (currentWeather) setError404(false);
      }, [currentWeather]);

   useEffect(() => {
      if (currentCity !== defaultCity) {
         apiOpenweather.getWeatherForecastByCity(currentCity).then(data => {
            setWeatherForecast(filter3days(data.list));
            console.log(filter3days(data.list));
         })
         .catch(err => { console.log(err); setError404(true) });
      }
   }, [currentCity]);

   return (
      <Container >
         <Navbar className='justify-content-center'>
            <Form inline='true'>
               <Row className='justify-content-between'>
                  <Col xl='auto'>
                     <h4 className='h4'>Ваше местоположение: {currentCity} 📍</h4>
                  </Col>
                  <Col xl='auto'>
                     <Button onClick={locate} variant='outline-primary'>Определить город</Button>
                  </Col>
               </Row>
               
               <Row>
                  <Col>
                     <Dropdown
                        as={InputGroup}
                     >
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
                        {cities.length > 0 ?
                           <SearchListGroup show={showMenu} cities={cities} onClickCity={onClickCity} />
                        : null}
                     </Dropdown>
                  </Col>
               </Row>
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
