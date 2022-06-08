import React from "react";
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import landing from '../assets/images/landing-alt.svg'

const Landing = () =>{
    return(
        <Wrapper>
           <nav>
            <Logo/>
          </nav>
          <div className='container page'>
          <div className='info'>
          <h1>
            WINDER
          </h1>
          <p className='tagline' >
            Where you meet your <span>Soulmate</span></p>
          <p>
            Velit dolore sint aliqua officia ut voluptate ullamco velit eiusmod. Et cillum nulla sit sint ipsum. Pariatur officia sunt qui ullamco do pariatur laboris cillum commodo. Eiusmod ad Lorem sint consectetur in est do do qui voluptate nulla nostrud.
          </p>
          <Link  to='/login' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={landing} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
    )
}

export default Landing;