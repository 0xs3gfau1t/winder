import React from 'react'
import Wrapper from '../assets/wrappers/NotificationPage'
import Nav from '../components/Nav/Nav'



function Notification() {
  return (
    <Wrapper>
      <div>
          <h1>Notification</h1>
          <div className= "navbarr">
              <Nav current='Notification'/>
          </div>
      </div>
    </Wrapper>

  )
}

export default Notification