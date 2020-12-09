import { Dropdown } from 'react-bootstrap'

const DropdownButton = ({ title, children }) => {

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">{title}</Dropdown.Toggle>
            <Dropdown.Menu>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownButton









