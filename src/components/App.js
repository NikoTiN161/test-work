import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchListGroup from './SearchListGroup';
import apiDadata from '../api/ApiDadata';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiOpenweather from '../api/ApiOpenweather';





function App() {

   const [currentCity, setCurrentCity] = useState('📍');
   const [cities, setCities] = useState([]);

   function onChengeSearch(e) {
      if (e.target.value.length >= 3) {
         // console.log('run api');
         apiDadata.getСities(e.target.value)
            .then(data => {
               setCities(data.suggestions);
            })
            .catch(err => { console.log(err); });
      } else {
         setCities([]);
      }
   }

   function onClickCity(city) {
      setCurrentCity(city);
      setCities([]);
      apiOpenweather.currentWeather(city).then(data => {
         console.log(data);
      })
   }


   return (
      <Container>
         <Navbar className='bg-body-tertiary'>
            <Form inline="true">
               <Row>
                  <Col xs='auto'>
                     <h4 className='h4'>Ваше местоположение: {currentCity}</h4>
                  </Col>
               </Row>
               <Row>
                  <Col xs='auto'>
                     <InputGroup>
                        <InputGroup.Text id='iconSearch'>🔎</InputGroup.Text>
                        <Form.Control
                           className='mr-sm-2'
                           type='text'
                           placeholder='Поиск города'
                           onChange={onChengeSearch}
                        />
                     </InputGroup>
                  </Col>
                  <Col xs='auto'>
                     <Button type='submit' >Search</Button>
                  </Col>
               </Row>
               {cities.length > 0 ?
                  <Row>
                     <Col xs='auto'>
                        <SearchListGroup cities={cities} onClickCity={onClickCity} />
                     </Col>
                  </Row>
                  : null}
            </Form>
         </Navbar>
      </Container>
   );
}

export default App;
