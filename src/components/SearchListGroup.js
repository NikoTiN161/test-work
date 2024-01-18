// import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';


function SearchListGroup(props) {

    function onClickCity(e) {
        // console.log(e.target.dataset.geo_lat);
        props.onClickCity(e.target.value);
    }

    return (
        <Dropdown.Menu show={true} style={{display: 'block'}}>
            {props.cities.map((e, i) => {
                return (<Dropdown.Item key={e.value} as="button" value={e.data.city ? e.data.city : e.value} onClick={onClickCity}>{e.data.city ? e.data.city : e.value}</Dropdown.Item>);
            })}
        </Dropdown.Menu>
    );
}

export default SearchListGroup;