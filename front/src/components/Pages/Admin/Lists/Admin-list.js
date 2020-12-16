import React, { Component } from 'react'
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'


class AdminList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    editElm = elmId => {
        this.props.targetElm(elmId)
        this.props.handlePopups('showModal', true, this.props.editModal)
    }

    newElm = () => this.props.handlePopups('showModal', true, this.props.newModal)

    delElm = elmId => {
        this.props.targetElm(elmId)
        this.props.setDeleteModal()
        this.props.handlePopups('showModal', false)
        this.props.handlePopups('showModalConfirm', true)
    }

    render() {
        return (
            <>
                <Container>
                    <Row style={{maxHeight: '420px', overflow: 'scroll'}}>
                        {this.props.array.map(elm => {
                            return (
                                <Col key={elm._id} md={6} >
                                    <div className="admin-modal-list">
                                        <p style={{fontSize: '1.2rem', fontWeight: '400px'}}>{elm.name}</p>
                                        <ButtonGroup>
                                            <Button size="sm" variant="secondary" onClick={() => this.editElm(elm._id)}>Edit</Button>
                                            <Button size="sm" variant="danger" onClick={() => this.delElm(elm._id)}>Delete</Button>
                                        </ButtonGroup>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    <Row style={{height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button variant="secondary" onClick={() => this.newElm()}>Create new</Button>
                    </Row>
                </Container>
            </>
        )
    }
}

export default AdminList