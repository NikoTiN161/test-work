import ListGroup from 'react-bootstrap/ListGroup';

function SearchListGroup(props) {

    function onClickCity(e) {
        // console.log(e.target.dataset.geo_lat);
        props.onClickCity(e.target.textContent);
    }

    return (
        <ListGroup>
            {props.cities.map(e => {
                return (<ListGroup.Item key={e.value} onClick={onClickCity}>{e.data.city ? e.data.city : e.value}</ListGroup.Item>);
            })}
        </ListGroup>
    );
}

export default SearchListGroup;