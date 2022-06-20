import React from 'react'
import Wrapper from '../../assets/wrappers/ChatHeadPage'



function ChatHead() {
    const  image_url = "https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-1/285105035_1208455953270786_612199680980408158_n.jpg?stp=c0.33.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeH7mkq5ngNUrnwtMe2MvjX2EAPYTXSxGrEQA9hNdLEasZtfLFv7jfagjR32h4mtqh46zdug-tWIAZ4sMoUpVNlE&_nc_ohc=1guqhaUr12kAX_gRk9X&_nc_ht=scontent.fktm10-1.fna&oh=00_AT-Mh8_Il2f8kj9AEpFb6YKq_lw9S4AU_Ricwa2nJD7lzg&oe=62AF7E9C"


  return (
      <Wrapper>
            <div>
                <div className="chatSmthIForgetName">
                    <img src = {image_url}/>
                    <div className='chatPersonDetails'>
                        <p>AnuRadha Maiyaa</p>
                    </div>
                </div>
            </div>
      </Wrapper>

  )
}

export default ChatHead