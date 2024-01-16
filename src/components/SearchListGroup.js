import ListGroup from 'react-bootstrap/ListGroup';

function SearchListGroup(props) {

    function onClickCity(e) {
        props.onClickCity(e.target.textContent);
    }

    return (
        <ListGroup>
            {props.cities.map(e => {
                return (<ListGroup.Item key={e.value} onClick={onClickCity}>{e.data.city}</ListGroup.Item>);
            })}
        </ListGroup>
    );
}

export default SearchListGroup;