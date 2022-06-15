import React from 'react'
import Wrapper from '../assets/wrappers/ChatPage'
import ChatHead from '../components/ChatHead/ChatHead'
import Nav from '../components/Nav/Nav'


function Chat() {

  const a = Array.from(Array(15).keys());

  return (
    <Wrapper>
        <div>
          <h1>Chat</h1>
        <div className= "navbarr">
            <Nav current='Chat'/>
        </div>
        <div className = 'chatsContainer'>
          {a.map(element => {
            return(<div className = 'chatContainer'>
              <ChatHead/>
            </div>)
          })}
          
          {/* <div className = 'chatContainer'>
            <ChatHead/>
          </div>
           <div className = 'chatContainer'>
            <ChatHead/>
          </div> */}
        </div>
       
    </div>
    </Wrapper>
  )
}

export default Chat