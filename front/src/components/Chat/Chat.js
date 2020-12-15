import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import io from 'socket.io-client'


const socket = io("http://localhost:4000", {
  withCredentials: true
});

function Chat() {
  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h6 style={{color: "#3e78ac"}}>
          {name}: <span style={{fontWeight: '300', color: 'black'}}>{message}</span>
        </h6>
      </div>
    ))
  }

  return (
    <Container>
      <h1>Chat Dealz_</h1>
      <Row style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Col md={10} lg={4} style={{margin: '40px 0px'}}>
          <Form onSubmit={onMessageSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" onChange={e => onTextChange(e)} value={state.name} label="Name"  />
            </Form.Group>
            <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" name="message" onChange={e => onTextChange(e)} value={state.message} id="outlined-multiline-static" variant="outlined" label="Message" />
            </Form.Group>
            <Button variant="secondary" size="sm" type="submit">Send message</Button>
          </Form>
        </Col>
        <Col md={10} lg={4} style={{ margin: '40px 0px' }}>
          <section className="form-group">
            <label className="form-label">Chat</label>
            <div className="form-control" style={{padding: '15px', height: '200px', overflow: 'scroll'}}>
              {renderChat()}
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Chat



