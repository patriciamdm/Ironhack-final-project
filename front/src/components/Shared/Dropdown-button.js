import { Dropdown } from 'react-bootstrap'

const DropdownButton = ({title, actions, products}) => {

    return (
        <Dropdown>
            {console.log(products)}
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">{title}</Dropdown.Toggle>
            <Dropdown.Menu>
                {actions.map((elm, idx) => <Dropdown.Item as="button" key={idx} onClick={() => elm.method(products)}>{elm.name}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownButton









