import React from 'react'
import Wrapper from '../../assets/wrappers/PopupPage'

function Popup(props) {
  return(props.clicked)? (
    <Wrapper>
        <div className='popup'>
            <div className='popup-inner'>
                <h2>{props.type}</h2>
                <span>{props.content}</span>
                <button className='close-btn' onClick = {props.close}>Close</button>
            </div>
        </div>
    </Wrapper>
  ) : ""
}

export default Popup