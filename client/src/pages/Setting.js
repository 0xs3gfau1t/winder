import React from 'react'
import Wrapper from '../assets/wrappers/SettingPage'
import Nav from '../components/Nav/Nav'



function Setting() {
  return (
    <Wrapper>
        <div>
          <h1>Settings</h1>
          <div className= "navbarr">
              <Nav current='Settings'/>
          </div>
      </div>
    </Wrapper>

  )
}

export default Setting