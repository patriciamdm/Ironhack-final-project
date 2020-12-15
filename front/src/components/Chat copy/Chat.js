import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'

import './Chat.css'

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
        <h3 className="chat-h3">
          {name}: <span className="chat-span">{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <div className="chat-card">
      <form className="chat-form" onSubmit={onMessageSubmit}>
        <h1>Messanger</h1>
        <div className="chat-name-field">
          <TextField
            name="name"
            onChange={e => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button className="chat-button">Send Message</button>
      </form>
      <div className="render-chat">
        {renderChat()}
      </div>
    </div>
  )
}

export default Chat