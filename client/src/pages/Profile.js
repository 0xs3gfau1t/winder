import React from 'react'
import Wrapper from '../assets/wrappers/ProfilePage'
import Nav from '../components/Nav/Nav'


function Profile() {
  return (
    <Wrapper>
          <div>
        <h1>Profile</h1>
        <div className= "navbarr">
            <Nav current='Profile'/>
        </div>
    </div>
    </Wrapper>

  )
}

export default Profile