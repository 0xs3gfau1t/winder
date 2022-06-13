import React, {useState} from 'react'
import Nav from '../Nav/Nav'

import  './Explore.css'


function Explore() {
  const [d_data, setData] = useState({
    image_url : "https://scontent.fktm10-1.fna.fbcdn.net/v/t1.6435-9/92812065_620379468512336_5237467155796066304_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGFuCKdCCc-Gxb-zbABlPdqoJ4gySf6ayGgniDJJ_prIWTuy518pJrPTL94dPToU6EPSx8LV9QqEU7n_PGlpEQH&_nc_ohc=31N-JcUUcS8AX_FbYpi&_nc_ht=scontent.fktm10-1.fna&oh=00_AT_JMonzIhHYxOg2LMUmKgaiyFJbuNyxH4Jtr5I4NCSXlQ&oe=62C47AAF",
    name: "Hari Parsad Baral",
    batch: "BCT062",
    age: 50,
    hobbies: ["Ghutka", "Jpt Padaune", "Framework"],
    university: "Pashchimanchal Campus"
  })


  return (
    
    <div>
        <h1>Explore</h1>
        <div className= "navbarr">
            <Nav current='Explore'/>
        </div>


        <div className = "Header">
        <div className='LogoContainer'>
          {/* <img  src = {logo} alt = "Logo" height = "100%"/> */}
        </div>
      </div>



      <div className = "Container">
        <div className = "Gallery">
          <img className = "user_img" src = {d_data.image_url} height = "50%" width = "20%"/>
        </div>
        <div className='Details_and_Controls'>
          <div className = "Details">
            <h2>{d_data.name}</h2>
            <h3>{d_data.batch}</h3>
            <h3>{d_data.age}</h3>
            <div className='hobbies'>
              {d_data.hobbies.map(hobby =>(
                  <h3 className='hobby'>{hobby}</h3>
              ))}
            </div>
            


    



            <h3>{d_data.university}</h3>
          </div>


          <div className = "Controls">
            <div className = "Previous">
              <button >Previous</button>
            </div>
            <div className='Heart'>
              <button>Like it</button>
            </div>
            <div className = "Next">
              <button>Next</button>
            </div>
        </div>
        
        </div>
      </div>

    </div>
  )
}

export default Explore