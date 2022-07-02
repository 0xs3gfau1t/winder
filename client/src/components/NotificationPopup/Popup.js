import React from 'react'
import Wrapper from '../../assets/wrappers/PopupPage'
import {FaWindowClose} from 'react-icons/fa'


function Popup(props) {
  return(props.clicked)? (
    <Wrapper>
        <div className='popup'>
            <div className='popup-inner'>
                <h2>{props.type}</h2>
                <span>{props.content}</span>
                <button className='close-btn' onClick = {props.close}><FaWindowClose/></button>
            </div>
        </div>
    </Wrapper>
  ) : ""
}

export default Popup