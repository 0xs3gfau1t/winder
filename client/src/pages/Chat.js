import React from 'react'
import Wrapper from '../assets/wrappers/ChatPage'
import Nav from '../components/Nav/Nav'



function Chat() {
  return (
    <Wrapper>
        <div>
        <h1>Chat</h1>
        <div className= "navbarr">
            <Nav current='Chat'/>
        </div>
    </div>
    </Wrapper>
  )
}

export default Chat